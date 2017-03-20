const arrayNormalize = require('array-normalize');

module.exports = function (array, next) {
  next(null, arrayNormalize(array));
}
