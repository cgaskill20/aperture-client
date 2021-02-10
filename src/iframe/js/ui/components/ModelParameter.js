'use strict';
//const e = React.createElement; defined in another file

class ModelParameter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.config.default
        }

        this.sliderQueue = [];
    }
    
    render() {
        return e("div", {className: "modelParameter"},
            e("label", {htmlFor: this.props.config.name}, `${this.props.config.name}: ${this.state.value}`),
            this.buildParameter()
        );
    }

    componentDidMount() {
        this.sliderQueue.forEach(slider => {
            document.getElementById(slider.id).appendChild(slider.e);
        });
    }

    getType(){
        return this.props.config.type;
    }

    buildParameter() {
        switch(this.getType()){
            case "integer":
                return this.buildSlider();
            case "double":
                return this.buildSlider();
            case "boolean":
                return this.buildCheckbox();
            case "string":
                return this.buildSelect();
        }
    }

    buildSelect(){
        return e("select",{
            id: "categorySelector",
            className: "form-control",
            onChange: (e) => {
                this.setState({value: e.target.value})
            },
            value: this.state.value
        }, ...this.getSelections());
    }

    getSelections(){
        return this.props.config.allowedValues.map(o => {
            return e("option", null, o);
        });
    }

    buildSlider(){
        const slider = document.createElement("div");
        noUiSlider.create(slider, {
            start: this.state.value,
            step: this.getType() === "integer" ? 1 : this.props.config.default < 0.01 ? this.props.config.default : 0.01, 
            range: {
                'min': this.props.config.min,
                'max': this.props.config.max
            }
        });

        slider.noUiSlider.on('slide', function (values) {
            const newValue = Number(values[0]);
            if(newValue !== this.state.value){
                this.setState({value: newValue});}
        }.bind(this));

        this.sliderQueue.push({id:this.props.config.name, e: slider});
        return e("div", {id:`${this.props.config.name}`});
    }

    buildCheckbox(){
        return e("input", {
            type: "checkbox",
            checked: this.state.value,
            onChange: (e) => {
                this.setState({value: e.target.checked})
            }
        })
    }
}
