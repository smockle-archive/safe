// @flow

/* :: type TArgument = {
  name: string;
  type: string;
} */

/**
 * Verifies argument types
 * @param {Array} types - Names and types of each argument
 * @param {Function} cb - Callback function
 * @param {Array} args - Arguments to callback function
 * @return {Function|any} Return partially-applied callback or result
 * @throws {TypeError} Argument has invalid type
 */
function _safe (types /* : Array<TArgument> */, cb /* : ?Function */)  /* : any */ {
  const args /* : any */ = Array.prototype.slice.call(arguments, 2)
  var i /* : number */ = 0
  for (var t of types) {
   if (typeof args[i] !== t.type) {
     throw new TypeError(`${t.name} must be a ${t.type}`)
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
