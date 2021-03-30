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
          loader: 'babel-loader',
          options: {
              plugins: ["@babel/plugin-proposal-class-properties"]
          }
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
        test: /\.png$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  watchOptions: {
    ignored: "**/.*"
  },
  externals: {
    "jquery": "jQuery",
    "requirejs":"require"
  },
  mode: "development",
}

