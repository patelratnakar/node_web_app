const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = function override(config, env) {
  config.plugins.push(
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    })
  );
  config.plugins.push(
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|json)$/,
      threshold: 0,
      minRatio:1
    })
  );

  return config;
};
