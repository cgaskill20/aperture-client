/**
 * @class GeometryLoaderJob
 * @file Basically just a data wrapper for GeometryLoader jobs from gemometryLoaderWorker.js
 * @author Daniel Reynolds
 * WORK IN PROGRESS
 */

class GeometryLoaderJob {
    //keep track of jobs and geohashes currently running through
    static allJobs = [];

    constructor(senderID,geohashes){
        //this should already have been done before, but you cant be too careful
        const filteredGeohashes = this.filterGeohashList(geohashes);
        this.senderID = senderID;
        this.geohashes = filteredGeohashes;
        this.dependents = [];
        GeometryLoaderJob.allJobs.push(this);
    }

    //we dont want geohashes being re-queried, so filter out the ones currently querying
    filterGeohashList(geohashList){
        //this part lets another job know that it's needs to return for another job
        for(const job of GeometryLoaderJob.allJobs){
            let nonUniqueGeohashes = [];
            for(const geohash of geohashList){
                if(job.geohashes.includes(geohash)){
                    nonUniqueGeohashes.push(geohash);
                    job.addDependent(this.senderID,geohash)
                }
            }
            geohashList = geohashList.filter(geohash => !this.nonUniqueGeohashes.includes(geohash))
        }
        return geohashList;
    }

    addDependent(senderID, geohash){
        this.dependents.push({
            senderID: senderID,
            geohash: geohash
        });
    }

    done(){
        GeometryLoaderJob.allJobs = GeometryLoaderJob.allJobs.filter(job => {
            return job !== this;
        });
    }
}
