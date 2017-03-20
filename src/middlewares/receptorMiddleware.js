const fs = require('fs');
const getPixels = require('get-pixels');
const async = require('async');

module.exports = function (dirname, next, onError) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }

    async.mapLimit(filenames, 50, (filename, cb) => {
      getPixels(dirname + '/' + filename, (err, pixels) => {
        if (err) return onError(err);
        const out = [];
        for(let y = 0; y < 28; y++) {
          for(let x = 0; x < 28; x++) {
            const pixel = [];
            const pointer = pixels.offset + (pixels.stride[0] * x) + (pixels.stride[1] * y);
            for(let i = 0; i < 4; i++) {
              pixel.push(pixels.data[pointer + (pixels.stride[2] * i)]);
            }
            out.push(pixel[0] > 130 ? 1 : 0);
          }
        }
        /*
        * Painting the numbers to console
        for(let i = 0; i < 783; i += 28) {
          console.log(out.slice(i, i + 28).join(''), i)
        }
        */
        cb(null, out);
      });
    }, (err, results) => {
      if (err) return onError(err);
      const learned = [];
      const resultsLength = results.length;
      const experimentLength = results[0].length;

      for (let j = 0; j < experimentLength; j++) {
        let sum = 0;
        for (let i = 0; i < resultsLength; i++) {
          sum += results[i][j];
        }
        learned.push(sum);
      }
      next(learned);
    });
  });
}
