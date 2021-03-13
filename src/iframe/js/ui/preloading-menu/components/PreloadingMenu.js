'use strict';


class PreloadingMenu extends React.Component {
    constructor(props) {
        super(props);

        this.loaders = props.loaders;
        this.loadersRemaining = props.loaders.length;
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
        this.listeners = this.loaders.map(loader => {
            return {
                id: loader.id,
                listener: (msg) => this.progressListener(msg)
            }
        });

        for (const listener of this.listeners) {
            const loader = this.loaders.find(loader => loader.id === listener.id);
            loader.loader.addEventListener("message", listener.listener)
        }

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
        return e("div", null, this.renderProgress());
    }

    componentDidMount() {
        this.loadingBar = new ldBar(
            "#preloadingBar"
        );
    }

    componentDidUpdate(){
        this.loadingBar.set(
            this.aggregateProgress
        );
    }

    renderProgress() {
        const aggregateStatus = this.state.status.reduce((acc, curr) => {
            return acc + curr.progress;
        }, 0) / this.state.status.length;
        this.aggregateProgress = aggregateStatus;
        return e("div", { id: "preloadingBar" });
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