// @flow
const test = require('tape')
const { safe } = require('../lib/safe')

test('safe.safe', (t) => {
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
