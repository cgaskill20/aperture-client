import geojsonvt from 'geojson-vt';
import Util from './apertureUtil';
import { sab2str, str2sab } from './bufferUtils';
//console.log = () => {}

const sabSize = 50000000;
const sab = new SharedArrayBuffer(sabSize);

let featureArr = [];
let shouldUpdate = false;

let tileIndex;
const update = () => {
    console.log("here")
    tileIndex = geojsonvt(Util.createGeoJsonObj(featureArr), {
        indexMaxZoom: 19,
        maxZoom: 19
    });
    shouldUpdate = false;
}
update();

const tryUpdate = () => {
    shouldUpdate && update();
}

setInterval(() => {
    tryUpdate();
}, 500)

const addOne = (newFeature) => {
    if (!new Set(featureArr.map(feature => feature.id)).has(newFeature.id)) {
        featureArr.push(newFeature);
        shouldUpdate = true;
    }
}

const addMultiple = (newFeatures) => {
    for (const newFeature of newFeatures) {
        addOne(newFeature);
    }
}

const removeOne = (idToRemove) => {
    removeMultiple([idToRemove]);
}

const removeMultiple = (idsToRemove) => {
    featureArr.filter(feature => !idsToRemove.includes(feature.id));
}

onmessage = async function (msg) {
    const { type, coords, coordsList, toAdd, toRemove, senderID } = msg.data;
    if (type === "add") {
        if (Array.isArray(toAdd)) {
            addMultiple(toAdd);
        }
        else {
            addOne(toAdd);
        }
    }
    else if (type === "remove") {
        if (Array.isArray(toRemove)) {
            removeMultiple(toRemove);
        }
        else {
            removeOne(toRemove);
        }
    }
    else if (type === "getManySAB") {
        console.time("Processing")
        tryUpdate();
        //console.log(coordsList)
        let data = coordsList.map(({ x, y, z }) => tileIndex.getTile(z, x, y))
            .filter(d => d != null)
            .map(d => JSON.stringify(d))
            //.sort((a,b) => b - a);

        while (data.length > 0) {
            let bytesLeft = sabSize - 4;
            let arr = [];
            data = data.filter((d) => {
                const byteTake = d.length * 2 + 2;
                if (bytesLeft - byteTake > 0) {
                    bytesLeft -= byteTake;
                    arr.push(d);
                    return false;
                }
                return true;
            });
            await new Promise(resolve => {
                const arrStr = JSON.stringify(arr);
                str2sab(JSON.stringify(arr), sab)
                postMessage({
                    type: "getManySABResponse",
                    senderID,
                    sab,
                    length: arrStr,
                    timeStart: Date.now()
                });
            });
        }
        console.timeEnd("Processing")
        postMessage({
            type: "getManySABResponse",
            senderID,
            final: true,
            timeStart: Date.now()
        });
    }
    else if (type === "getMany") {
        console.time("Processing")
        tryUpdate();
        const data = coordsList.map(({ x, y, z }) => tileIndex.getTile(z, x, y)).filter(t => t != null);
        console.timeEnd("Processing")
        postMessage({
            type: "getManyResponse",
            senderID,
            data,
            timeStart: Date.now()
        });
    }
}