/*
 * Test runner
 *
 */

// Application logic for the test runner
_app = {};

// Holder of all tests
_app.tests = {};

// Dependencies
_app.tests.unit = require('./unit');


/*
 * PR for final Exam
 * getFunctionParams Helper
 * Allows to improve the way test are defined
 * by making the done() callback only necessary for async tests.
 */

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

_app.getFunctionParams = function (func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
};

// Count all the tests
_app.countTests = function(){
  var counter = 0;
  for(var key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       var subTests = _app.tests[key];
       for(var testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            counter++;
          }
       }
     }
  }
  return counter;
};

// Run all the tests, collecting the errors and successes
_app.runTests = function(){
  var errors = [];
  var successes = 0;
  var limit = _app.countTests();
  var counter = 0;
  for(var key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       var subTests = _app.tests[key];
       for(var testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            (function(){
              var tmpTestName = testName;
              var testValue = subTests[testName];

              /*
               * PR for final Exam
               * Callback function "done" extracted because it can be called in 2 ways
               * As a callback for async test and as a direct call for sync tests
               */
              function done() {
                // If it calls back without throwing, then it succeeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                counter++;
                successes++;
                if(counter == limit){
                  _app.produceTestReport(limit,successes,errors);
                }
              }
              // Call the test
              try{

                /*
                 * PR for final Exam
                 * 2 ways to call the testValue function
                 */
                const doesTestNeedCallback = _app.getFunctionParams(testValue);
                if (doesTestNeedCallback) {
                  testValue(done);
                } else {
                  testValue();
                  done();
                }
              } catch(e){
                // If it throws, then it failed, so capture the error thrown and log it in red
                errors.push({
                  'name' : testName,
                  'error' : e
                });
                console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                counter++;
                if(counter == limit){
                  _app.produceTestReport(limit,successes,errors);
                }
              }
            })();
          }
       }
     }
  }
};

// Product a test outcome report
_app.produceTestReport = function(limit,successes,errors){
  console.log("");
  console.log("--------BEGIN TEST REPORT--------");
  console.log("");
  console.log("Total Tests: ",limit);
  console.log("Pass: ",successes);
  console.log("Fail: ",errors.length);
  console.log("");

  // If there are errors, print them in detail
  if(errors.length > 0){
    console.log("--------BEGIN ERROR DETAILS--------");
    console.log("");
    errors.forEach(function(testError){
      console.log('\x1b[31m%s\x1b[0m',testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("");
    console.log("--------END ERROR DETAILS--------");
  }
  console.log("");
  console.log("--------END TEST REPORT--------");

};

// Run the tests
_app.runTests();
