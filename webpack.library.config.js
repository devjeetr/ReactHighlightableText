const config = require('./webpack.config');

config.entry = './src/js/lib.js';
config.output = {
  library: 'text-heatmap',
  filename: 'text-heatmap.js',
  libraryTarget: 'commonjs2',
};

module.exports = config;
