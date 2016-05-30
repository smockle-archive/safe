// @flow
const test = require('tape')
const safe = require('../lib/safe')

test('safe', (t) => {
  t.plan(5)

  const types = safe(
    [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ]
  )
  const add = types(
    function (a /* : number */, b /* : number */) /* : number */ {
      return a + b
    }
  )
  const subtract = types(
    function (a /* : number */, b /* : number */) /* : number */ {
      return a - b
    }
  )
  const multiply = safe(
    [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ],
    function (a /* : number */, b /* : number */) /* : number */ {
      return a * b
    }
  )
  const sum = safe(
    [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ],
    function (a /* : number */, b /* : number */) /* : number */ {
      return a + b
    },
    3,
    4
  )

  t.throws(add.bind(add, '3', 1), TypeError, 'throws typeerror')
  t.equal(add(3, 1), 4, 'partially apply types')
  t.equal(subtract(4, 2), 2, 're-use partially-applied types')
  t.equal(multiply(2, 3), 6, 'partially apply types and function')
  t.equal(sum, 7, 'fully apply types and function and values')
})
