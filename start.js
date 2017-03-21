const receptorMiddleware = require('./src/middlewares/receptorMiddleware');
const normalizeMiddleware = require('./src/middlewares/normalizeMiddleware');
const vectorSumMiddleware = require('./src/middlewares/vectorSumMiddleware');
const generateNeuronsMiddleware = require('./src/middlewares/generateNeuronsMiddleware');

const async = require('async');
const jsonfile = require('jsonfile');

const fs = require('fs');
const NORMALIZED_LEARNED_MEMORY = 'data/learned/normalizedLearned.json';

let normalizedLearned;
if (fs.existsSync(NORMALIZED_LEARNED_MEMORY)) {
  normalizedLearned = jsonfile.readFileSync(NORMALIZED_LEARNED_MEMORY);
}

async.waterfall([
    cb => {
      if (normalizedLearned) return cb(null, null);
      /* learning the numbers */
      async.series({
        0: (next) => {
          receptorMiddleware('data/0',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        1: (next) => {
          receptorMiddleware('data/1',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        2: (next) => {
          receptorMiddleware('data/2',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        3: (next) => {
          receptorMiddleware('data/3',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        4: (next) => {
          receptorMiddleware('data/4',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        5: (next) => {
          receptorMiddleware('data/5',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        6: (next) => {
          receptorMiddleware('data/6',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        7: (next) => {
          receptorMiddleware('data/7',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        8: (next) => {
          receptorMiddleware('data/8',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        },
        9: (next) => {
          receptorMiddleware('data/9',
          (res) => {
            next(null, res)
          }, (err) => {
            console.error('Train file read error: ', err);
          });
        }
      }, (err, res) => {
        cb(null, res)
      });
    },
    (thingsIveSeen, cb) => {
      if (normalizedLearned) return cb(null, null);
      vectorSumMiddleware(thingsIveSeen, cb);
    },
    (learned, cb) => {
      if (normalizedLearned) return cb(null, null);
      normalizeMiddleware(learned, cb);
    },
    (generatedNormalizedLearned, cb) => {
      if (!normalizedLearned) jsonfile.writeFile('data/learned/normalizedLearned.json', generatedNormalizedLearned);
      generateNeuronsMiddleware(normalizedLearned || generatedNormalizedLearned, cb);
    },
    (neurons, cb) => {
      receptorMiddleware('data/test',
      (res) => {
        console.log(res[9000]);
        console.log('do something with neurons and test data');
      }, (err) => {
        console.error('Test file read error: ', err);
      }, true);
    }
  ],
  (err, res) => {
    console.log('ready');
  }
)
