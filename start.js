const receptorMiddleware = require('./src/middlewares/receptorMiddleware');
const normalizeMiddleware = require('./src/middlewares/normalizeMiddleware');

const async = require('async');

async.waterfall([
    cb => {
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
    (learned, cb) => {
      normalizeMiddleware(learned, cb);
    },
    (normalizedLearned, cb) => {
      console.log(normalizedLearned.length);
      cb(null, 'yo')
    }
  ],
  (err, res) => {
    console.log('ready');
  }
)
