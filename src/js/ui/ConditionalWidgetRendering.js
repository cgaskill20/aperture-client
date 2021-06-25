import React from "react";
import { useGlobalState } from "./global/GlobalState"
import DefensiveOptimization from "./widgets/DefensiveOptimization"
import ClusterLegend from "./widgets/ClusterLegend"
import PreloadingMenu from "./widgets/PreloadingMenu"
import ChartingResizable from "./NewCharting/ChartingResizable"

const widgetEnum = {
    defensiveOptimization: 0,
    clusterLegend: 1,
    preloading: 2,
    chartingResizable: 3,
}

const ConditionalWidgetRendering = () => {
    const [globalState, setGlobalState] = useGlobalState();

    let toRender = [];
    switch (globalState.mode) {
        case "dataExploration":
            toRender.push(
                <div id="query-block-container" key={widgetEnum.defensiveOptimization}>
                    <DefensiveOptimization />
                </div>
            );
            break;
        case "modeling":
            if (globalState.clusterLegendOpen) {
                toRender.push(
                    <div id="clusterLegendContainer" key={widgetEnum.clusterLegend}>
                        <ClusterLegend />
                    </div>
                );
            }
    }

    if (globalState.preloading) {
        toRender.push(
            <div id="preloadBlocker" key={widgetEnum.preloading}>
                <div id="preloadStatus">
                    <PreloadingMenu loaders={globalThis.loaders} onFinish={() => {
                        setGlobalState({ preloading: false })
                    }} />
                </div>
            </div>
        );
    }

    if (globalState.chartingOpen) {

        toRender.push(
            <div id="charting-resizable-container" key={widgetEnum.chartingResizable}>
                <ChartingResizable />
            </div>
        );
    }

    return <div>
        {toRender}
    </div>
}

export default ConditionalWidgetRendering;
