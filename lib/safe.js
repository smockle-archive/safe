require = require('@std/esm')(module)
module.exports = {
  identifyTypeClass: require('./safe.mjs').identifyTypeClass,
  isSafe: require('./safe.mjs').isSafe,
  safe: require('./safe.mjs').safe
}
