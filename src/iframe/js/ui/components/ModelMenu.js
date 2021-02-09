'use strict';
const e = React.createElement;

class ModelMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modelCategory: Object.keys(this.props.config)[0],
            modelType: this.props.config[Object.keys(this.props.config)[0]][0]
        }

        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
    }
    

    render() {
        return e("div", null,
            e("label", {for: "categorySelector"}, "Select category: "),
            this.createCategorySelector(), 
            e("label", {for: "typeSelector"}, "Select type: "),
            this.createTypeSelector(),
            e("div", null, JSON.stringify(this.state))
        );
    }


    createCategorySelector(){
        const categories = Object.keys(this.props.config);
        const content = categories.map(category => {
            return e("option", null, category)
        });

        return e("select", {
            id: "categorySelector",
            className: "form-control",
            onChange: this.onCategoryChange,
            value: this.state.modelCategory
        }, ...content)
    }

    onCategoryChange(e){
        this.setState({
            modelCategory: e.target.value,
            modelType: this.props.config[e.target.value][0]
        });
    }

    createTypeSelector(){
        const types = this.props.config[this.state.modelCategory];
        const content = types.map(type => {
            return e("option", null, type)
        });

        return e("select", {
            id: "typeSelector",
            className: "form-control",
            onChange: this.onTypeChange,
            value: this.state.modelType
        }, ...content)
    }

    onTypeChange(e){
        this.setState({modelType: e.target.value});
    }
}
