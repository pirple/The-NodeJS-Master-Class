/*
 * Title: Basic Node Example
 * Description: Simple file that declares a few functions and invokes them.
 * Author: Leslie Lewis
 * Date: 10/24/17
 *
 */


// Dependencies
var mathLib = require('./lib/math');
var jokesLib = require('./lib/jokes');


// App object
var app = {};


// Configuration
app.config = {
    'timeBetweenJokes' : 1000
};


// Function that prints a random joke
app.printAJoke = function(){

    // Get all the jokes
    var allJokes = jokesLib.allJokes();

    // Get the length of the jokes
    var numberOfJokes = allJokes.length;

    // Pick a random number between 1 and the number of jokes
    var randomNumber = mathLib.getRandomNumber(1,numberOfJokes);

    // Get the joke at that position in the array (minus one)
    var selectedJoke = allJokes[randomNumber - 1];

    // Send the joke to the console
    console.log(selectedJoke);
};


// Function that loops indefinitely, calling the printAJoke function as it goes
app.indefiniteLoop = function(){

    // Create the interval, using the config variable defined above
    setInterval(app.printAJoke,app.config.timeBetweenJokes);
};


// Invoke the loop
app.indefiniteLoop();
