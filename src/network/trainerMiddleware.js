
module.exports = function (neurons, tests, cb) {
  const max = tests.length - 1;
  const min = 0;
  let testCount = 0;

  let success = 0;
  let failure = 0;

  while(testCount < 10000) {
    const toTest = Math.floor(Math.random() * (max - min) + min);
    const testKey = Object.keys(tests[toTest])[0];
    const out = tests[toTest][testKey];

    const recognized = {number: -1, probability: -1};

    neurons.forEach((n, i) => {
      n.setInputs(out);
      const output = n.getOutput();

      if (output > recognized.probability) { recognized.number = i; recognized.probability = output; };

      console.log(i, output);
    });

    const number = Number(testKey.split('_')[1]);

    console.log(recognized, number);

    recognized.number === number ? success++ : failure++;

    for(let i = 0; i < 783; i += 28) {
      console.log(out.slice(i, i + 28).join(''), i)
    }

    testCount++;
  }

  console.log('Success: ', success, ' Failure: ', failure);

  //console.log('testKey: ', testKey);
  //console.log('Number: ', number);
}
