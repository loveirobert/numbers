const arrayNormalize = require('array-normalize');

module.exports = function (arrays, next) {
  const toNormalize = Object.keys(arrays);
  const normalizeds = toNormalize.map(tn => arrayNormalize(arrays[tn]));
  next(null, normalizeds);
}
