var assert = require('assert');
var featureset = require('../')(['a', 'b', 'c']);

var calls = {
  activated: 0,
  deactivated: 0
};

featureset.on('activated', function(){
  calls.activated += 1;
});

featureset.on('deactivated', function(){
  calls.deactivated += 1;
});

assert(featureset.active('a') === true);
assert(featureset.active('b') === true);
assert(featureset.active('c') === true);

featureset.deactivate('a');
assert(featureset.active('a') === false);
assert(featureset.active('b') === true);
assert(featureset.active('c') === true);

featureset.activate('a');
assert(featureset.active('a') === true);
assert(featureset.active('b') === true);
assert(featureset.active('c') === true);

featureset.deactivate(['b', 'a']);
assert(featureset.active('a') === false);
assert(featureset.active('b') === false);
assert(featureset.active('c') === true);

featureset.activate(['b', 'a']);
assert(featureset.active('a') === true);
assert(featureset.active('b') === true);
assert(featureset.active('c') === true);

featureset.deactivate(['b', 'c']);
assert(featureset.active(['a', 'b']) === false);
assert(featureset.active('a') === true);
assert(featureset.active(['b', 'c']) === false);
assert(featureset.active(['a', 'c']) === false);

featureset.activate(['b', 'c']);
assert(featureset.active('a') === true);
assert(featureset.active('b') === true);
assert(featureset.active('c') === true);


featureset.deactivate(['a', 'b', 'c']);
assert(featureset.active('a') === false);
assert(featureset.active('b') === false);
assert(featureset.active('c') === false);

featureset.activate(['a', 'b']);
assert(featureset.active(['a', 'b']) === true);
assert(featureset.active(['b', 'c']) === false);
assert(featureset.active(['b', 'c', 'a']) === false);
assert(featureset.active('a') === true);
assert(featureset.active('b') === true);

assert(calls.deactivated === 4);
assert(calls.deactivated === 4);