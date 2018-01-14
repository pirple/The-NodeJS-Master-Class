/*
 * Title: Jokes Library
 * Description: Utility library for getting a list of Jokes
 * Author: Leslie Lewis
 * Date: 10/24/17
 *
 */


// Dependencies
var fs = require('fs');

// App object
var jokes = {};

// Get all the jokes and return them to the user
jokes.allJokes = function(){

    // Read the text file containing the jokes
    var fileContents = fs.readFileSync(__dirname+'/jokes.txt', 'utf8');

    // Turn the string into an array 
    var arrayOfJokes = fileContents.split(/\r?\n/);

    // Return the array
    return arrayOfJokes;

};

// Export the library
module.exports = jokes;