const jsonfile = require('jsonfile');
const fs = require('fs');
const NumberNeuron = require('../network/NumberNeuron.js');
const TRAIN_MEMORY = 'data/learned/trained.json';

let trainMemory;
if (fs.existsSync(TRAIN_MEMORY)) {
  // trainMemory = jsonfile.readFileSync(TRAIN_MEMORY);
}

module.exports = function (neurons, tests, cb) {
  const max = tests.length - 1;
  const min = 0;
  let testCount = 0;

  let success = 0;
  let failure = 0;

  let successTrained = 0;
  let failureTrained = 0;

  const failureMap = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  }
  const trainedFailureMap = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  }


  const hiddenNeurons = [];
  for (let i = 0; i <= 9; i++) {
    let initialWeights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    if (trainMemory && trainMemory[i]) initialWeights = trainMemory[i];
    let newHiddenNeuron = new NumberNeuron(initialWeights);
    hiddenNeurons.push(newHiddenNeuron);
  }

  while(testCount < 200) {
    const toTest = Math.floor(Math.random() * (max - min) + min);
    const testKey = Object.keys(tests[toTest])[0];
    const out = tests[toTest][testKey];
    const recognized = {number: -1, probability: -1};
    const outputArray = [];

    neurons.forEach((n, i) => {
      n.setInputs(out);
      const output = n.getOutput();
      if (output > recognized.probability) { recognized.number = i; recognized.probability = output; };
      outputArray.push(output);
    });

    const number = Number(testKey.split('_')[1]);

    hiddenNeurons.forEach((hn, i) => {
      hn.setInputs(outputArray);
      const singleOutPut = hn.getSingleOutput();
      console.log('SINGLE OUTPUT', i, singleOutPut);
      if (i == singleOutPut && i !== number) {
        console.log(singleOutPut + ' is not a ' + number);
        hn.train();
      }
    });

    /* 1st hidden layer training */
    /*
    hiddenNeurons[number].setInputs(outputArray);
    const hiddenOutput = hiddenNeurons[number].getSingleOutput();
    if (hiddenOutput !== number) {
      hiddenNeurons[number].train();
      trainedFailureMap[number]++;
      failureTrained++;
    } else {
      successTrained++;
    }
    */
    /* 1st hidden layer training */

    recognized.number === number ? success++ : failure++;
    if (recognized.number !== number) {
      failureMap[number]++;
    }


    for(let i = 0; i < 783; i += 28) {
      console.log(out.slice(i, i + 28).join(''), i)
    }


    testCount++;
  }

  console.log('Success (non-trained): ', success, ' Failure (non-trained): ', failure);
  console.log('Success (trained): ', successTrained, ' Failure (trained): ', failureTrained);

  console.log(failureMap);
  console.log(trainedFailureMap);


  if (!trainMemory) {
    const trainMap = {};
    hiddenNeurons.forEach((hn, i) => {
      trainMap[i] = hn.getWeights();
    });
    jsonfile.writeFile(TRAIN_MEMORY, trainMap);
  }

  //console.log('testKey: ', testKey);
  //console.log('Number: ', number);
}
