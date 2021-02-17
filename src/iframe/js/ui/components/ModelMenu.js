'use strict';
class ModelMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modelCategory: Object.keys(this.props.config)[0],
            modelType: this.props.config[Object.keys(this.props.config)[0]][0]
        }

        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.setParameter = this.setParameter.bind(this)
        this.setCollection = this.setCollection.bind(this)

        this.collections = {};
        this.parameters = {};

        this.parametersTemp = [
            {
                "name": "aggregationDepth",
                "description": "Param for suggested depth for treeAggregate (>= 2).",
                "type": "integer",
                "min": 2,
                "max": 10,
                "default": 2
            },
            {
                "name": "elasticNetParam",
                "description": "Param for the ElasticNet mixing parameter, in range [0, 1]. For alpha = 0, the penalty is an L2 penalty. For alpha = 1, it is an L1 penalty.",
                "type": "double",
                "min": 0.0,
                "max": 1.0,
                "default": 0.5
            },
            {
                "name": "epsilon",
                "description": "The shape parameter to control the amount of robustness. Must be > 1.0. At larger values of epsilon, the huber criterion becomes more similar to least squares regression; for small values of epsilon, the criterion is more similar to L1 regression. Default is 1.35 to get as much robustness as possible while retaining 95% statistical efficiency for normally distributed data. It matches sklearn HuberRegressor and is \"M\" from A robust hybrid of lasso and ridge regression. Only valid when \"loss\" is \"huber\".",
                "type": "double",
                "min": 1.01,
                "max": 10.0,
                "default": 1.35
            },
            {
                "name": "fitIntercept",
                "description": "Param for whether to fit an intercept term.",
                "type": "boolean",
                "default": true
            },
            {
                "name": "loss",
                "description": "The loss function to be optimized.",
                "type": "string",
                "allowedValues": [
                    "squaredError"
                ],
                "default": "squaredError"
            },
            {
                "name": "maxIterations",
                "description": "Maximum number of iterations.",
                "type": "integer",
                "min": 1,
                "max": 10000,
                "default": 10
            },
            {
                "name": "regularizationParam",
                "description": "Param for regularization parameter (>= 0). Default is 0.0.",
                "type": "double",
                "min": 0.0,
                "max": 10.0,
                "default": 0.0
            },
            {
                "name": "solver",
                "description": "Set the solver algorithm used for optimization. In case of linear regression, this can be \"l-bfgs\", \"normal\" and \"auto\". - \"l-bfgs\" denotes Limited-memory BFGS which is a limited-memory quasi-Newton optimization method. - \"normal\" denotes using Normal Equation as an analytical solution to the linear regression problem. This solver is limited to LinearRegression.MAX_FEATURES_FOR_NORMAL_SOLVER. - \"auto\" (default) means that the solver algorithm is selected automatically. The Normal Equations solver will be used when possible, but this will automatically fall back to iterative optimization methods when needed.Note: Fitting with huber loss doesn't support normal solver, so throws exception if this param was set with \"normal\".",
                "type": "string",
                "allowedValues": [
                    "l-bfgs",
                    "normal",
                    "auto"
                ],
                "default": "auto"
            },
            {
                "name": "setStandardization",
                "description": "Whether to standardize the training features before fitting the model. The coefficients of models will be always returned on the original scale, so it will be transparent for users. Default is true.",
                "type": "boolean",
                "default": true
            },
            {
                "name": "convergenceTolerance",
                "description": "Set the convergence tolerance of iterations. Smaller value will lead to higher accuracy with the cost of more iterations. Default is 1E-6.",
                "type": "double",
                "min": 0.0,
                "max": 1.0,
                "default": 0.000001
            }
        ]

        this.collectionsTemp = [
            {
                "name": "future_heat",
                "features": [
                    "temp",
                    "year"
                ]
            }
        ]
    }


    render() {
        return e("div", null,
            this.createModelSelect(),
            ...this.createCollections(),
            ...this.createParameters(),
        );
    }

    createModelSelect() {
        return e("div", { className: "modelSelect" },
            e("label", { htmlFor: "categorySelector" }, "Select category: "),
            this.createCategorySelector(),
            e("label", { htmlFor: "typeSelector" }, "Select type: "),
            this.createTypeSelector(),
        );
    }

    createCategorySelector() {
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

    onCategoryChange(e) {
        this.setState({
            modelCategory: e.target.value,
            modelType: this.props.config[e.target.value][0]
        });
    }

    createTypeSelector() {
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

    onTypeChange(e) {
        this.setState({ modelType: e.target.value });
        this.clearParameters();
    }

    createParameters() {
        return this.parametersTemp.map(parameter => {
            return e(ModelParameter, {
                config: parameter,
                setParameter: this.setParameter
            });
        });
    }

    clearParameters() {
        this.parameters = {};
    }

    setParameter(name, value) {
        this.parameters[name] = value;
    }

    createCollections() {
        return this.collectionsTemp.map(collection => {
            return e(ModelCollection, {
                config: collection,
                setCollection: this.setCollection
            })
        });
    }

    clearCollections() {
        this.collections = {};
    }

    setCollection(name, feature, value) {
        if (!this.collections[name])
            this.collections[name] = {};
        this.collections[name][feature] = value;
    }
}
