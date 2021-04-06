module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
          //options are defined in .babelrc
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\mapDataFilterWorker.js$/,
        loader: "worker-loader",
        options: {
          filename: "[name].[contenthash].worker.js",
          worker: {
            type: "Worker",
            options: {
              type: "classic",
              credentials: "omit",
              name: "Chart Filter Worker"
            },
          },
        },
      },
      {
        test: /\queryWorker.js$/,
        loader: "worker-loader",
        options: {
          filename: "[name].[contenthash].worker.js",
          worker: {
            type: "Worker",
            options: {
              type: "classic",
              credentials: "omit",
              name: "Query Worker"
            },
          },
        },
      },
      {
        test: /\geometryLoaderWorker.js$/,
        loader: "worker-loader",
        options: {
          filename: "[name].[contenthash].worker.js",
          worker: {
            type: "Worker",
            options: {
              type: "classic",
              credentials: "omit",
              name: "Shapefile Worker"
            },
          },
        },
      },
    ]
  },
  watchOptions: {
    ignored: "**/.*"
  },
  externals: {
    "jquery": "jQuery",
    "requirejs": "require"
  },
}

