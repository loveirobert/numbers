
module.exports = class NumberNeuron {
  constructor (weights) {
    this.weights = weights;
    this.trainSpeed = 0.01;
  }

  setInputs (inputs) {
    this.inputs = inputs;
  }

  getWeights() {
    return this.weights;
  }

  getOutput () {
    let output = 0;
    this.inputs.forEach((n, i) => {
      output += n * this.weights[i];
    });
    return output;
  }

  getSingleOutput() {
    let recognized = {number: -1, probability: -1};
    this.inputs.forEach((n, i) => {
      const output = n * this.weights[i];
      if (output > recognized.probability) { recognized.number = i; recognized.probability = output; };
    });
    this.recognized = recognized;
    console.log(recognized);
    return recognized.number;
  }

  train () {
    this.weights[this.recognized.number] -= this.trainSpeed;
  }
}
