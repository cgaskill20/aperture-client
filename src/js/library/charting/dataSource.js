
import Worker from "./queryWorker.js"

export default class CovidDataSource {
    static queryWorker = new Worker();
    static dataCollection = "covid_county_formatted";
    static gisjoinsAggregate

    // The leaflet map used to determine the viewport bounds.
    constructor(map) {
        this.map = map;
    }

    // Query and return a promise to COVID data for what's in the viewport.
    // All parameters are optional.
    async get(type, daysWindowSize) {
        if (!type || (type !== "cases" && type !== "deaths")) {
            cases = "cases";
        }

        if (!daysWindowSize) {
            daysWindowSize = 7;
        }

        // Honestly, fairly clever idea Daniel
        const sessionID = Math.random().toString(36).substring(2, 6);

        CovidDataSource.queryWorker.postMessage({
            type: "query",
            collection: this.collection,
            queryParams: gisjoinsAggregate,
            senderID: sessionID
        });

        const listener = msg => {
            const data = msg.data;
            if (data.senderID !== sessionID) {
                return;
            }
            if (data.type == "data") {
                const response = data.data;
                console.log(response);
            }
        }
    }
}
