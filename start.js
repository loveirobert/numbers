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
const BEST_NET = 'data/learned/network.json';

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

let bestNet;
if (fs.existsSync(BEST_NET)) {
  bestNet = jsonfile.readFileSync(BEST_NET);
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

      let net;

      net = new brain.NeuralNetwork();
      net.fromJSON(bestNet);

      if (!net) {
        net = new brain.NeuralNetwork({
          hiddenLayers: [100]
        });
        const toTrain = Object.keys(allNumbers);
        const trainObjects = [];
        toTrain.forEach(tt => {
          const vectors = _.shuffle(allNumbers[tt]);
          vectors.forEach((v, i) => {
            if (i > 2500) return;
            const output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            output[tt] = 1;
            trainObjects.push({
              input: v,
              output
            });
          });
        });

        console.log('Training starts ...', trainObjects.length);

        net.train(_.shuffle(trainObjects),{
          errorThresh: 0.0007,  // error threshold to reach
          iterations: 20000,   // maximum training iterations
          log: true,           // console.log() progress periodically
          logPeriod: 1,       // number of iterations between logging
          learningRate: 0.2,    // learning rate
          momentum: 0.4
        });
      }

      let errors = 0;

      _.shuffle(testMemory).forEach(rt => {
        const testKey = Object.keys(rt)[0];
        const testVector = rt[testKey];
        const probabilities = net.run(testVector);
        const estimation = probabilities.indexOf(Math.max(...probabilities));
        for(let i = 0; i < 783; i += 28) {
          console.log(testVector.slice(i, i + 28).join(''), i)
        }
        const reality = Number(testKey.split('_')[1]);
        if (reality !== Number(estimation)) errors ++;
        console.log('I say this is: ', estimation, ' The reality is: ', reality);
      });

      console.log('Test number: ' + testMemory.length + ' Error rate: ' + (errors / testMemory.length).toFixed(2));

      const netJson = net.toJSON();

      cb(null, null);
    }
  ],
  (err, res) => {
    console.log('ready');
  }
)
