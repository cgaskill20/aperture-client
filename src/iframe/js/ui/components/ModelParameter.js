'use strict';
class ModelParameter extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        // console.log("^ in constructor")
        this.state = {
            value: this.props.config.default
        }
        this.name = this.props.config.name;
        this.sliderQueue = [];
    }
    
    render() {
        if(this.state.value == null){
            console.error("Value not set after constructor!!!!")
            console.error(this.props.config)
            return null;
        }
        this.updateParent()
        return e("div", {className: "modelParameter"},
            e("label", {htmlFor: this.name}, `${Util.cleanUpString(this.name)}: ${Util.cleanUpString(this.state.value)}`),
            this.buildParameter()
        );
    }

    componentDidMount() {
        this.sliderQueue.forEach(slider => {
            document.getElementById(slider.id).appendChild(slider.e);
        });
        this.sliderQueue = [];
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
            default:
                console.error(`Did not recongnize ${this.getType()}!`);
                return null;
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
        // console.log(this.state.value + " <- " + this.name)
        // console.log(this.props.config)
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

        this.sliderQueue.push({id:this.name, e: slider}); //the slider will be injected after render() is called
        return e("div", {id:`${this.name}`});
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

    updateParent(){
        this.props.setParameter(this.name, this.state.value)
    }
}
