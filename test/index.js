var assert = require('assert');
var ft = require('../')(['a', 'b', 'c']);

var calls = {
  activated: 0,
  deactivated: 0
};

ft.on('activated', function(){
  calls.activated += 1;
});

ft.on('deactivated', function(){
  calls.deactivated += 1;
});

assert(ft.active('a') === true);
assert(ft.active('b') === true);
assert(ft.active('c') === true);

ft.deactivate('a');
assert(ft.active('a') === false);
assert(ft.active('b') === true);
assert(ft.active('c') === true);

ft.activate('a');
assert(ft.active('a') === true);
assert(ft.active('b') === true);
assert(ft.active('c') === true);

ft.deactivate(['b', 'a']);
assert(ft.active('a') === false);
assert(ft.active('b') === false);
assert(ft.active('c') === true);

ft.activate(['b', 'a']);
assert(ft.active('a') === true);
assert(ft.active('b') === true);
assert(ft.active('c') === true);

ft.deactivate(['b', 'c']);
assert(ft.active(['a', 'b']) === false);
assert(ft.active('a') === true);
assert(ft.active(['b', 'c']) === false);
assert(ft.active(['a', 'c']) === false);

ft.activate(['b', 'c']);
assert(ft.active('a') === true);
assert(ft.active('b') === true);
assert(ft.active('c') === true);


ft.deactivate(['a', 'b', 'c']);
assert(ft.active('a') === false);
assert(ft.active('b') === false);
assert(ft.active('c') === false);

ft.activate(['a', 'b']);
assert(ft.active(['a', 'b']) === true);
assert(ft.active(['b', 'c']) === false);
assert(ft.active(['b', 'c', 'a']) === false);
assert(ft.active('a') === true);
assert(ft.active('b') === true);

assert(calls.deactivated === 4);
assert(calls.deactivated === 4);