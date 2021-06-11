import SingleChartManager from "../../library/charting/singleChartManager";
import SingleChartArea from "../../library/charting/singleChartArea";
import LineGraph from "../../library/charting/lineGraph";
import Histogram from "../../library/charting/histogram";
import Scatterplot from "../../library/charting/scatterplot";
import ScatterplotManager from "../../library/charting/scatterplotManager";
import ScatterplotArea from "../../library/charting/scatterplotArea";
import LineChartManager from "../../library/charting/lineChartManager";
import LineChartArea from "../../library/charting/lineChartArea";
import ValidFeatureManager from "../../library/charting/validFeatureManager";
import Feature from "../../library/charting/feature";
import resizable from "../../library/resizable";
import ChartFrame from "../../library/charting/chartFrame";
import CovidDataSource from "../../library/charting/covidDataSource"
import MapDataSource from "../../library/charting/mapDataSource"
import HistogramChart from '../../library/charting/HistogramChart';

// An enumeration of each type of data source recognized by the ChartSystem.
// See DataSource for more information about what a "data source" is.
// DataSources are singleton with respect to each ChartSystem - only one
// exists at a time, and it's stored within these objects.
export const DataSourceType = {
    MAP_FEATURES: {
        name: "map_features",
        sourceType: MapDataSource,
        sourceInstance: undefined,
        supplementObjectType: ValidFeatureManager,
        supplementObjectInstance: undefined,
    },
    COUNTY_COVID: {
        name: "county_covid",
        sourceType: CovidDataSource,
        sourceInstance: undefined,
        supplementObjectType: undefined,
        supplementObjectInstance: undefined,
    }
};

// An enumeration of the each type of chart recognzied by the ChartSystem.
// Each type has a type of manager, area, and chart, as well as a list of each
// kind of DataSource it can use.  (At the moment, charts only support one data
// source at a time.) These objects are passed into ChartSystem's getFrame
// function to create new charts.
export const ChartingType = {
    LINE: {
        name: "line",
        managerType: LineChartManager,
        areaType: SingleChartArea,
        chartType: LineGraph,
        wantsSources: [ DataSourceType.COUNTY_COVID ],
    },
    HISTOGRAM: {
        name: "histogram",
        managerType: SingleChartManager,
        areaType: SingleChartArea,
        chartType: Histogram,
        componentType: HistogramChart,
        wantsSources: [ DataSourceType.MAP_FEATURES ],
    },
    SCATTERPLOT: {
        name: "scatterplot",
        managerType: ScatterplotManager,
        areaType: ScatterplotArea,
        chartType: Scatterplot,
        wantsSources: [ DataSourceType.MAP_FEATURES ],
    },
};

// Chart message types that any chart can accept.
export const CommonChartMessageType = {
    // Notify the chart that a query has started/ended.
    // Has:
    //  started: true if a query began, false if a query ended
    NOTIFY_QUERY_STATE: 1 << 10,
};

/**
 * The brains that holds the entire charting operation together.
 * Every chart lives underneath this class. All ChartFrames originate from
 * this class. All data flows from this class to underlying charts. This class 
 * is your only god. 
 *
 * A single instance of this is instantiated in index.js, which is used for all
 * charting in Aperture. Creating another ChartSystem instance will create an 
 * entirely new, isolated charting ecosystem, and may cause horrible issues as
 * such a thing has not been properly tested.
 *
 * Construction of a ChartSystem automatically also creates a resizable. You
 * do not need to manually create and attach any resizables.
 *
 * This class contains a few useful properties:
 * - this.catalog: The charting catalog, in raw object form
 * - this.graphable: A list of every graphable feature, as reported from the
 *   charting catalog
 * - this.resizable: The resizable that this ChartSystem lives in
 *
 * @author Pierce Smith and Matt Young
 * @file An orchestrator for all charting operations
 */
export default class ChartSystem {
    // In pixels.
    static MAX_CHART_HEIGHT = 350;

    // Do not call this directly.
    constructor(map, chartCatalogFilename) {
        this.map = map;

        this.dataConsumers = [];

        $.getJSON(chartCatalogFilename, (catalog) => {
            this.initializeUpdateHooks();
            this.catalog = catalog;
            this.graphable = catalog.map(e => {
                return Object.entries(e.constraints).map(kv => {
                    return Feature.compose(e.collection, kv[0], kv[1].label);
                })
            }).flat();

            this.createDataSources();
        });

        this.doNotUpdate = false;
    }

    /** 
     * Initialize every needed data source for the ChartSytem's charts.
     * This is only to be called once, and is done so in the constructor.
     * Do not call this manually.
     * @memberof ChartSystem
     * @method createDataSource
     */
    createDataSources() {
        Object.values(DataSourceType).forEach(source => {
            source.sourceInstance = new source.sourceType(this.map, this.graphable);
            if (source.supplementObjectType) {
                source.supplementObjectInstance = new source.supplementObjectType();
            }
        });
    }

    initializeUpdateHooks() {
        this.map.on('move', e => { 
            this.update(); 
        });

        this.map.on('zoomstart', e => { 
            this.doNotUpdate = true;
        });

        this.map.on('zoomend', e => { 
            this.doNotUpdate = false; 
            this.update(); 
        });
    }

    /**
     * Refreshes every data source and re-renders every chart.
     * If something related to data sources changes, this function should be
     * called. It is also called naturally every 2 seconds, and whenever the
     * map moves.
     * It is safe to call this function from inside chart code.
     * @memberof ChartSystem
     * @method update
     * @param {object=} parameters An optional object with extra information
     * for this update event
     */
    async update(parameters = {}) {
        if (this.doNotUpdate && !parameters.force) {
            return;
        }

        this.dataConsumers.forEach(async consumer => {
            let data = {};
            for (const source of Object.values(DataSourceType)) {
                data[source.name] = await source.sourceInstance.get();
            }
            consumer.dataCallback(data);
        })
        
        this.doNotUpdate = true;
        window.setTimeout(() => { this.doNotUpdate = false; }, 200);
    }

    registerDataConsumer(id, setData) {
        this.dataConsumers.push({ id: id, dataCallback: setData });
    }

    unregisterDataConsumer(id) {
        this.dataConsumers = this.dataConsumers.filter(c => c.id !== id);
    }
}
