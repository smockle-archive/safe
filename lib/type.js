// @flow

/** @module type */

/**
 * Dictionary of type names to primitive types.
 * @alias module:type.types
 * @constant {Object.<string, string>}
 */
const types /* : { [key:string]: string } */ = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  object: 'object'
}

/**
 * List of primitive types.
 * @alias module:type.typeKeys
 * @constant {Array.<string>}
 */
const typeKeys /* : Array<string> */ = Object.keys(types)

/**
 * Whether parameter represents a primitive type.
 * @alias module:type.isType
 * @param  {string} type - String representation of a primitive type.
 * @return {Boolean} Parameter represents a primitive type.
 */
function isType (type /* : string */) /* : bool */ {
  return typeKeys.some((x /* : string */) => x === type)
}

/**
 * Whether value is of provided primitive type.
 * @alias module:type.typeOf
 * @param {string} type - String representation of a primitive type.
 * @param {*} value - Value to check.
 * @return {Boolean} Value is of provided primitive type.
 */
function typeOf (type /* : string */, value /* : any */) /* : bool */ {
  /* eslint valid-typeof: "off" */
  return typeof value === types[type]
}

module.exports = {
  types,
  typeKeys,
  isType,
  typeOf
}
