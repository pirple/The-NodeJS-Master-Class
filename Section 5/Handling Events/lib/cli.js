/*
 * CLI-related tasks
 *
 */

 // Dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();

// Instantiate the cli module object
var cli = {};

// Input handlers
e.on('man',function(str){
  cli.responders.help();
});

e.on('help',function(str){
  cli.responders.help();
});

e.on('exit',function(str){
  cli.responders.exit();
});

e.on('stats',function(str){
  cli.responders.stats();
});

e.on('list users',function(str){
  cli.responders.listUsers();
});

e.on('more user info',function(str){
  cli.responders.moreUserInfo(str);
});

e.on('list checks',function(str){
  cli.responders.listChecks(str);
});

e.on('more check info',function(str){
  cli.responders.moreCheckInfo(str);
});

e.on('list logs',function(){
  cli.responders.listLogs();
});

e.on('more log info',function(str){
  cli.responders.moreLogInfo(str);
});


// Responders object
cli.responders = {};

// Help / Man
cli.responders.help = function(){
  console.log("You asked for help");
};

// Exit
cli.responders.exit = function(){
  console.log("You asked to exit");
};

// Stats
cli.responders.stats = function(){
  console.log("You asked for stats");
};

// List Users
cli.responders.listUsers = function(){
  console.log("You asked to list users");
};

// More user info
cli.responders.moreUserInfo = function(str){
  console.log("You asked for more user info",str);
};

// List Checks
cli.responders.listChecks = function(){
  console.log("You asked to list checks");
};

// More check info
cli.responders.moreCheckInfo = function(str){
  console.log("You asked for more check info",str);
};

// List Logs
cli.responders.listLogs = function(){
  console.log("You asked to list logs");
};

// More logs info
cli.responders.moreLogInfo = function(str){
  console.log("You asked for more log info",str);
};

// Input processor
cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something, otherwise ignore it
  if(str){
    // Codify the unique strings that identify the different unique questions allowed be the asked
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    // Go through the possible inputs, emit event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input,str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if(!matchFound){
      console.log("Sorry, try again");
    }

  }
};

// Init script
cli.init = function(){

  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function(str){

    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function(){
    process.exit(0);
  });

};

 // Export the module
 module.exports = cli;
