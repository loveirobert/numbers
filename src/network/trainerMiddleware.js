
module.exports = function (neurons, tests, cb) {
  const max = tests.length - 1;
  const min = 0;
  const toTest = Math.floor(Math.random() * (max - min) + min);
  const testKey = Object.keys(tests[toTest])[0];
  const out = tests[toTest][testKey];

  neurons.forEach((n, i) => {
    n.setInputs(out);
    console.log(i, n.getOutput());
  });

  for(let i = 0; i < 783; i += 28) {
    console.log(out.slice(i, i + 28).join(''), i)
  }
  
  console.log('testKey: ', testKey);
  console.log('Number: ', Number(testKey.split('_')[1]))
}
