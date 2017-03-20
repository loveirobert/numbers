const receptorMiddleware = require('./src/middlewares/receptorMiddleware');
const normalizeMiddleware = require('./src/middlewares/normalizeMiddleware');

const async = require('async');

async.waterfall([
    cb => {
      /* learning 0 */
      receptorMiddleware('data/0',
      (res) => {
        cb(null, res);
      }, (err) => {
        console.error('Train file read error: ', err);
      });
    },
    (learned, cb) => {
      normalizeMiddleware(learned, cb);
    },
    (normalizedLearned, cb) => {
      for(let i = 0; i < normalizedLearned.length; i += 28) {
        console.log(normalizedLearned.slice(i, i + 28).join(''), i)
      }
      cb(null, 'yo')
    }
  ],
  (err, res) => {
    console.log('ready');
  }
)
