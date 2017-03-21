
module.exports = function (vectors, cb) {
  const toSum = Object.keys(vectors);

  toSum.forEach(ts => {
    const learned = [];
    const results = vectors[ts];
    const resultsLength = results.length;
    const experimentLength = results[0].length;

    for (let j = 0; j < experimentLength; j++) {
      let sum = 0;
      for (let i = 0; i < resultsLength; i++) {
        sum += results[i][j];
      }
      learned.push(sum);
    }
    vectors[ts] = learned;
    console.log(`I have an idea what is ` + ts);
  });

  cb(null, vectors);
}
