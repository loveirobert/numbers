const receptorMiddleware = require('./src/middlewares/receptorMiddleware');
const normalizeMiddleware = require('./src/middlewares/normalizeMiddleware');
const vectorSumMiddleware = require('./src/middlewares/vectorSumMiddleware');
const generateNeuronsMiddleware = require('./src/middlewares/generateNeuronsMiddleware');
const trainerMiddleware = require('./src/network/trainerMiddleware');

const brain = require('brain');
const async = require('async');
const jsonfile = require('jsonfile');
const _ = require('lodash');

const fs = require('fs');
const NORMALIZED_LEARNED_MEMORY = 'data/learned/normalizedLearned.json';
const TEST_MEMORY = 'data/learned/test.json';
const ALL_NUMBERS = 'data/learned/numbers.json';

let normalizedLearned;
if (fs.existsSync(NORMALIZED_LEARNED_MEMORY)) {
  normalizedLearned = jsonfile.readFileSync(NORMALIZED_LEARNED_MEMORY);
}

let testMemory;
if (fs.existsSync(TEST_MEMORY)) {
  testMemory = jsonfile.readFileSync(TEST_MEMORY);
}

let allNumbers;
if (fs.existsSync(ALL_NUMBERS)) {
  allNumbers = jsonfile.readFileSync(ALL_NUMBERS);
}

async.waterfall([
    cb => {
      if (allNumbers) return cb(null, null);
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
        if (!allNumbers) jsonfile.writeFile(ALL_NUMBERS, res);
        cb(null, res)
      });
    },

    (numbers, cb) => {
      if (!allNumbers) allNumbers = numbers;
      var net = new brain.NeuralNetwork({
        hiddenLayers: [40, 20]
      });
      const toTrain = Object.keys(allNumbers);
      const trainObjects = [];
      toTrain.forEach(tt => {
        const vectors = allNumbers[tt];
        vectors.forEach(v => {
          const output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          output[tt] = 1;
          trainObjects.push({
            input: v,
            output
          });
        });
      });
      console.log('Training starts ...');
      net.train(_.shuffle(trainObjects).slice(0, 2000),{
        errorThresh: 0.001,  // error threshold to reach
        iterations: 20000,   // maximum training iterations
        log: true,           // console.log() progress periodically
        logPeriod: 1,       // number of iterations between logging
        learningRate: 0.1    // learning rate
      });
      console.log(0, net.run(allNumbers[0][0]))
      console.log(1, net.run(allNumbers[1][0]))
      console.log(2, net.run(allNumbers[2][0]))
      console.log(3, net.run(allNumbers[3][0]))
      console.log(4, net.run(allNumbers[4][0]))
      console.log(5, net.run(allNumbers[5][0]))
      console.log(6, net.run(allNumbers[6][0]))
      console.log(7, net.run(allNumbers[7][0]))
      console.log(8, net.run(allNumbers[8][0]))
      console.log(9, net.run(allNumbers[9][0]))
      cb(null, null);
    }

    /*
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

    */

    /*
    (neurons, cb) => {
      receptorMiddleware('data/realTest',
      (res) => {
        testMemory = res;
        trainerMiddleware(neurons, testMemory, cb);
        console.log('do something with neurons and test data');
      }, (err) => {
        console.error('Test file read error: ', err);
      }, true);
    }
    */

    /*
    (neurons, cb) => {
      if (!testMemory) {
        receptorMiddleware('data/test',
        (res) => {
          if (!testMemory) {
            jsonfile.writeFile('data/learned/test.json', res);
            testMemory = res;
          }
          trainerMiddleware(neurons, testMemory, cb);
          console.log('do something with neurons and test data');
        }, (err) => {
          console.error('Test file read error: ', err);
        }, true);
      } else {
        trainerMiddleware(neurons, testMemory, cb);
      }
    }
    */

  ],
  (err, res) => {
    console.log('ready');
  }
)
