[![Build Status](https://travis-ci.org/smockle/safe.svg?branch=master)](https://travis-ci.org/smockle/safe)
[![Build status](https://ci.appveyor.com/api/projects/status/x1sjhd5q1jv1eupd?svg=true)](https://ci.appveyor.com/project/smockle/safe)
[![Code Climate](https://codeclimate.com/github/smockle/safe/badges/gpa.svg)](https://codeclimate.com/github/smockle/safe)
[![Test Coverage](https://codeclimate.com/github/smockle/safe/badges/coverage.svg)](https://codeclimate.com/github/smockle/safe/coverage)
[![Coverage Status](https://coveralls.io/repos/github/smockle/safe/badge.svg?branch=master)](https://coveralls.io/github/smockle/safe?branch=master)

# safe

Verifies argument types.

## Installation

Run `npm install --save smockle/safe` to add `safe` to your project.

## Usage

```
const safe = require('./lib/safe')

const toUpperAndNotEmpty = safe([
  { name: 'xs', type: 'object' },
  { name: 'x', type: 'string' }
])(
  function (xs, x) {
    return xs.concat(x ? x.toUpperCase() : [])
  }
)

const a = [ 'aaa', 222, '', 'ccc', '' ]
a.reduce(toUpperAndNotEmpty, [])
// Throws TypeError('x must be a string')

const b = [ 'aaa', 'bbb', '', 'ccc', '' ]
b.reduce(toUpperAndNotEmpty, [])
// [ 'AAA', 'BBB', 'CCC' ]
```

## API Reference
<a name="module_safe.._safe"></a>

### safe~_safe(types, cb, args) ⇒ <code>function</code> &#124; <code>any</code>
Verifies argument types

**Kind**: inner method of <code>[safe](#module_safe)</code>  
**Returns**: <code>function</code> &#124; <code>any</code> - Return partially-applied callback or result  
**Throws**:

- <code>TypeError</code> Argument has invalid type


| Param | Type | Description |
| --- | --- | --- |
| types | <code>Array</code> | Names and types of each argument |
| cb | <code>function</code> | Callback function |
| args | <code>Array</code> | Arguments to callback function |


## Testing

`safe` includes several unit tests. After cloning the `safe` repo locally, run `npm install` in the project folder to install dependencies. Run `npm test` to execute the tests.
