var assert = require('assert');
var ft = require('../')(['not-active']);

ft.on('activated', function(){
  console.log('activated')
});

ft.on('deactivated', function(){
  console.log('deactivated')
});

assert(ft.active('not-active') === true);
ft.deactivate('not-active');
assert(ft.active('not-active') === false);
ft.activate('not-active');
assert(ft.active('not-active') === true);