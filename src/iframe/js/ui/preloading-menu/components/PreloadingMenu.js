'use strict';


class PreloadingMenu extends React.Component {
    constructor(props) {
        super(props);

        this.loaders = props.loaders;
        this.loadersRemaining = this.loaders.length;
        this.state = {
            status: this.loaders.map(loader => {
                return {
                    id: loader.id,
                    progress: 0
                }
            })
        }
        this.aggregateProgress = 0;
        this.loadingBar = null;
        this.startListeners();
    }

    startListeners() {
        // map listener with id's
        this.listeners = this.loaders.map(loader => {
            return {
                id: loader.id,
                listener: (msg) => this.progressListener(msg)
            }
        });

        // add event listeners
        for (const listener of this.listeners) {
            const loader = this.loaders.find(loader => loader.id === listener.id);
            loader.loader.addEventListener("message", listener.listener)
        }

        // send messages to worker config
        for (const loader of this.loaders) {
            loader.loader.postMessage({
                senderID: loader.id,
                type: "config",
                collection: loader.collection,
                id: loader.id
            });
        }
    }

    render() {
        return e("div", null, ...this.renderProgress());
    }

    componentDidMount() {
        // create loading bar
        this.loadingBar = new ProgressBar.Circle("#preloadBar", {
            strokeWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            color: '#0000FF',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: null
          });
    }

    componentDidUpdate() {
        // update loadingbar after render() is called
        this.loadingBar.animate(this.aggregateProgress / 100);  // Number from 0.0 to 1.0
    }

    renderProgress() {
        const aggregateStatus = this.state.status.reduce((acc, curr) => {
            return acc + curr.progress;
        }, 0) / this.state.status.length;
        this.aggregateProgress = Math.round(aggregateStatus);
        return [
            e("div", { id: "preloadBar" }),
            e("br"),
            e("div", {id: "preloadText"}, `${this.progressToText(this.aggregateProgress)}`)
        ];
    }

    progressToText(progress){
        if(progress === 0)
            return "Initializing."
        if(progress === 100)
            return "Finalizing."
        return "Optimizing for your system."
    }       

    progressListener(msg) {
        const data = msg.data;
        const loaderIDs = this.loaders.map(loader => {
            return loader.id;
        });
        //check that the data is sent from this querier
        if (!loaderIDs.includes(data.senderID)) {
            return;
        }
        this.processMessage(data);
    }

    processMessage(data) {
        if (data.type === "configStatus") {
            this.setState({
                status: this.state.status.map(loaderStatus => {
                    if (loaderStatus.id === data.senderID) {
                        return {
                            ...loaderStatus,
                            progress: data.status.pctDone
                        }
                    }
                    return loaderStatus;
                })
            });
        }
        else if (data.type === "end") {
            const listener = this.listeners.find(listener => listener.id === data.senderID)
            const loader = this.loaders.find(loader => loader.id === data.senderID);
            loader.loader.removeEventListener("message", listener.listener)

            this.loadersRemaining--;
            if (!this.loadersRemaining) {
                document.getElementById("preloadBlocker").style.display = "none";
            }
        }
    }
}