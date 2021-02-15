'use strict';
class ModelCollection extends React.Component {
    constructor(props) {
        super(props);

        this.name = this.props.config.name;
    }
    
    render() {
        return e("div", {className: "modelCollection"},
            e("label", {htmlFor: this.name}, `${this.name}: `),
            this.buildCollection()
        );
    }

    componentDidMount() {
        
    }

    buildCollection(){
        let key = 0;
        return this.props.config.features.map(feature => {
            const checked = true;
            if(checked)
                this.props.setCollection(this.name,feature,true);
            return e("div",{className: "modelCollectionFeatures", key: key++},
                e("label", {htmlFor: `${feature}_feature`}, `${feature}: `),
                e("input", {
                    type: "checkbox", 
                    id:`${feature}_feature`, 
                    defaultChecked: checked,
                    onChange: (e) => {this.props.setCollection(this.name,feature,e.target.checked)}
                })
            );
        });
    }
}
