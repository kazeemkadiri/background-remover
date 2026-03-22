module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
    externals: ['@imgly/background-removal-node']
  },
  externals: ['@imgly/background-removal-node'],
};