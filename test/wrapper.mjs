// @flow
import safe from '../lib/wrapper';
import test from 'tape';

test('safe.wrapper', t => {
  t.plan(6);

  // Case 0
  const check = safe();
  // $flow_disable_line
  const divide = check()([
    { name: 'a', type: 'number' },
    { name: 'b', type: 'number' }
    // $flow_disable_line
  ])(function(a /* : number */, b /* : number */) /* : number */ {
    return a / b;
  });
  // $flow_disable_line
  t.equal(divide(6, 2), 3, 'noop');

  // Case 1
  // $flow_disable_line
  const types = safe([
    { name: 'a', type: 'number' },
    { name: 'b', type: 'number' }
  ]);
  // $flow_disable_line
  const add = types(function(
    a /* : number */,
    b /* : number */
  ) /* : number */ {
    return a + b;
  });
  // $flow_disable_line
  const subtract = types(function(
    a /* : number */,
    b /* : number */
  ) /* : number */ {
    return a - b;
  });
  // $flow_disable_line
  t.throws(add.bind(add, '3', 1), TypeError, 'throws typeerror');
  // $flow_disable_line
  t.equal(add(3, 1), 4, 'partially apply types');
  // $flow_disable_line
  t.equal(subtract(4, 2), 2, 're-use partially-applied types');

  // Case 2
  const multiply = safe(
    // $flow_disable_line
    [{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }],
    // $flow_disable_line
    function(a /* : number */, b /* : number */) /* : number */ {
      return a * b;
    }
  );
  // $flow_disable_line
  t.equal(multiply(2, 3), 6, 'partially apply types and function');

  // Case 3
  const sum = safe(
    // $flow_disable_line
    [{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }],
    // $flow_disable_line
    function(a /* : number */, b /* : number */) /* : number */ {
      return a + b;
    },
    // $flow_disable_line
    3,
    // $flow_disable_line
    4
  );
  t.equal(sum, 7, 'fully apply types and function and values');
});
