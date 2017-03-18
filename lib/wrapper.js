// @flow

/* :: type TType = {
  name: string;
  type: string;
} */

/** @module safe */

const isSafe = require('./safe').isSafe

/**
 * Verifies argument types
 * @alias module:safe.wrapper
 * @param {Array} types - Names and types of each argument
 * @param {Function} cb - Callback function
 * @param {Array} args - Arguments to callback function
 * @return {Function|*} Return partially-applied callback or result
 * @throws {TypeError} Argument has invalid type
 */
function _safe (types /* : Array<TType> */, cb /* : Function */) /* : any */ {
  const args /* : Array<any> */ = Array.prototype.slice.call(arguments, 2)
  var i /* : number */ = 0
  for (var type /* : TType */ of types) {
    if (!isSafe(type.type, args[i])) {
      throw new TypeError(`${type.name} must be a ${type.type}`)
    }
    i++
  }
  return cb.apply(cb, args)
}

function safe () {
  switch (arguments.length) {
    case 0:
      return safe
    case 1:
      return safe.bind(_safe, arguments[0])
    case 2:
      return safe.bind(_safe, arguments[0], arguments[1])
    default:
      return _safe.apply(_safe, arguments)
  }
}

module.exports = safe
