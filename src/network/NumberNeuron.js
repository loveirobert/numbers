
module.exports = class NumberNeuron {
  constructor (weights) {
    this.weights = weights;
  }

  setInputs (inputs) {
    this.inputs = inputs;
  }

  getOutput () {
    let output = 0;
    this.inputs.forEach((n, i) => {
      output += n * this.weights[i];
    });
    return output;
  }
}
