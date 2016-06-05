// @flow
const test = require('tape')
const safe = require('../lib/wrapper')

test('safe.wrapper', (t) => {
  t.plan(6)

  // Case 0
  const check = safe()
  const divide = check()(
    [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ])(
      function (a /* : number */, b /* : number */) /* : number */ {
        return a / b
      }
    )
  t.equal(divide(6, 2), 3, 'noop')

  // Case 1
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
  t.throws(add.bind(add, '3', 1), TypeError, 'throws typeerror')
  t.equal(add(3, 1), 4, 'partially apply types')
  t.equal(subtract(4, 2), 2, 're-use partially-applied types')

  // Case 2
  const multiply = safe(
    [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ],
    function (a /* : number */, b /* : number */) /* : number */ {
      return a * b
    }
  )
  t.equal(multiply(2, 3), 6, 'partially apply types and function')

  // Case 3
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
  t.equal(sum, 7, 'fully apply types and function and values')
})
