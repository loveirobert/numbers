const NumberNeuron = require('../network/NumberNeuron.js');

module.exports = function(weights, cb) {
  const neurons = weights.map(w => new NumberNeuron(w));
  cb(null, neurons);
}
