'use strict';

const e = React.createElement;

class ModelMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        return e("div", null,"Hello")
    }
}

const domContainer = document.getElementById("model-container");
ReactDOM.render(e(ModelMenu), domContainer);