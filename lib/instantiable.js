// @flow

/** @module instantiable */

/**
 * Dictionary of instantiable names to instantiable types.
 * @alias instantiable.instantiables
 * @constant {Object.<string, Function|Object|number>}
 */
const instantiables /* : { [key:string]: Function | Object | number } */ = {
  'array': Array,
  'Array': Array,
  'arraybuffer': ArrayBuffer,
  'ArrayBuffer': ArrayBuffer,
  'Boolean': Boolean,
  'dataview': DataView,
  'DataView': DataView,
  'date': Date,
  'Date': Date,
  'error': Error,
  'Error': Error,
  'evalerror': EvalError,
  'EvalError': EvalError,
  'float32array': Float32Array,
  'Float32Array': Float32Array,
  'float64array': Float64Array,
  'Float64Array': Float64Array,
  'function': Function,
  'Function': Function,
  'infinity': Infinity,
  'Infinity': Infinity,
  'int16array': Int16Array,
  'Int16Array': Int16Array,
  'int32array': Int32Array,
  'Int32Array': Int32Array,
  'int8array': Int8Array,
  'Int8Array': Int8Array,
  'json': JSON,
  'JSON': JSON,
  'map': Map,
  'Map': Map,
  'math': Math,
  'Math': Math,
  'nan': NaN,
  'NaN': NaN,
  'Number': Number,
  'Object': Object,
  'promise': Promise,
  'Promise': Promise,
  'rangeerror': RangeError,
  'RangeError': RangeError,
  'referenceerror': ReferenceError,
  'ReferenceError': ReferenceError,
  'reflect': Reflect,
  'Reflect': Reflect,
  'regexp': RegExp,
  'RegExp': RegExp
}

/**
 * List of instantiable types.
 * @alias instantiable.instantiableKeys
 * @constant {Array.<string>}
 */
const instantiableKeys /* : Array<string> */ = Object.keys(instantiables)

/**
 * Whether parameter represents an instantiable type.
 * @alias instantiable.isInstantiable
 * @param  {string} type - String representation of an instantiable type.
 * @return {Boolean} Parameter represents an instantiable type.
 */
function isInstantiable (type /* : string */) /* : bool */ {
  return instantiableKeys.includes(type)
}

/**
 * Whether value is of provided instantiable type.
 * @alias instantiable.instanceOf
 * @param {string} type - String representation of a instantiable type.
 * @param {*} value - Value to check.
 * @return {Boolean} Value is of provided instantiable type.
 */
function instanceOf (type /* : string */, value /* : any */) /* : bool */ {
  return value instanceof instantiables[type]
}

module.exports = {
  instantiables,
  instantiableKeys,
  isInstantiable,
  instanceOf
}
