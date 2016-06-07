// @flow
const test = require('tape')
const { safe } = require('../lib/safe')

test('safe.safe (primitive type)', (t) => {
  t.plan(2)

  function add (a /* : number */, b /* : number */) /* : number */ {
    const err = safe([
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ], arguments)
    if (err) throw err

    return a + b
  }

  t.equal(add(1, 2), 3, 'adds numbers')
  // $flow_disable_line
  t.throws(add.bind(add, '', 2), TypeError('a must be a number'), 'throws TypeError')
})

test('safe.safe (instantiable type)', (t) => {
  t.plan(2)

  function add (a /* : Array<number> */, b /* : number */) /* : number */ {
    const err = safe([
      { name: 'a', type: 'array' },
      { name: 'b', type: 'number' }
    ], arguments)
    if (err) throw err

    return a[0] + b
  }

  t.equal(add([1], 2), 3, 'adds numbers')
  // $flow_disable_line
  t.throws(add.bind(add, '', 2), TypeError('a must be a array'), 'throws TypeError')
})

test('safe.safe (nonexisting type)', (t) => {
  t.plan(1)

  function add (a /* : number */, b /* : number */) /* : number */ {
    const err = safe([
      { name: 'a', type: 'zilch' },
      { name: 'b', type: 'number' }
    ], arguments)
    if (err) throw err

    return a + b
  }

  // $flow_disable_line
  t.throws(add.bind(add, '', 2), TypeError('a must be a zilch'), 'throws TypeError')
})
