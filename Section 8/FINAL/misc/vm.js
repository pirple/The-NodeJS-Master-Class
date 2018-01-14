/*
 * Example VM
 * Running some arbitrary commmands
 *
 */

// Dependencies
var vm = require('vm');

// Define a context for the script to run in
var context = {
  'foo' : 25
};

// Define the script
var script = new vm.Script(`
  foo = foo * 2;
  var bar = foo + 1;
  var fizz = 52;
`);

// Run the script
script.runInNewContext(context);
console.log(context);
