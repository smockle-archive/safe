// @flow

/* :: type TType = {
  name: string;
  type: string;
} */

/** @module safe */

import { isType, typeOf } from './type'
import { isInstantiable, instanceOf } from './instantiable'

/**
 * Dictionary of type classes.
 * @alias module:safe.IDENTITY
 * @constant {Object.<string, string>}
 */
const IDENTITY /* : { TYPE: string; INSTANTIABLE: string; } */ = {
  TYPE: 'TYPE',
  INSTANTIABLE: 'INSTANTIABLE'
}

/**
 * Select type class matching the provided parameter.
 * @alias module:safe.identifyTypeClass
 * @param  {string} type - String representation of a primitive or instantiable type.
 * @return {string|null} Type class.
 */
export function identifyTypeClass (type /* : string */) {
  if (isType(type)) return IDENTITY.TYPE
  if (isInstantiable(type)) return IDENTITY.INSTANTIABLE
  return null
}

/**
 * Whether value is of provided type.
 * @alias module:safe.isSafe
 * @param {string} type - String representation of a primitive or instantiable type.
 * @param {*} value - Value to check.
 * @return {Boolean} Value is of provided type.
 */
export function isSafe (type /* : string */, value /* : any */) {
  switch (identifyTypeClass(type)) {
    case IDENTITY.TYPE:
      return typeOf(type, value)
    case IDENTITY.INSTANTIABLE:
      return instanceOf(type, value)
    default:
      return false
  }
}

/**
 * Create TypeError when an argument doesn’t match provided type.
 * @alias module:safe.safe
 * @param {Array<Object.<string, string>>} types - List of parameter names and types.
 * @param {*} value - List of values to check.
 * @return {TypeError} Argument doesn’t match provided type.
 */
export function safe (
  types /* : Array<TType> */,
  args /* : Array<any> | Object */
) {
  if (args && !(args instanceof Array)) {
    args = Array.prototype.slice.call(args)
  }
  var i /* : number */ = 0
  for (var type /* : TType */ of types) {
    if (!isSafe(type.type, args[i])) {
      return new TypeError(`${type.name} must be a ${type.type}`)
    }
    i++
  }
  return null
}
