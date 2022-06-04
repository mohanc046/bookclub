/**
 * 
 * Function`s
 * 
 * It should be independent.
 * 
 * 
 * As usage of utils function have been increased.
 * 
 * it must be named properly with what exactly it is been doing (if possible have better description to those functions)
 * 
 * how functions params should be organized.
 * 
 */


/*  Naming a method - Example 1  */

// what date exactly it returns? todays date, previous day or next day or any random date
function getDate() {
    return new Date();
}

/**
 * @description Function that returns today`s date
 * @name getTodaysDate
 * @returns {Date}
 */
function getTodaysDate() {
    return new Date();
}

// with two params
function sum(param1, param2) {
    return param1 + param2;
}

/**
 * @description Function that performs sum of two numbers
 * @name getSumOfTwoNumbers
 * @param {Number} param1 
 * @param {Number} param2 
 * @returns {Number}
 */
function getSumOfTwoNumbers(param1, param2) {
    return param1 + param2;
}


/*  Naming Params - Example 2  */

function getAreaOfSquare(param) {
    return param * param;
}

/**
 * @description Function that calculates area of square
 * @name getAreaOfSquare
 * @param {Number} side 
 * @returns {Number} 
 */
function getAreaOfSquare(side) {
    return side * side;
}


getTodaysDate(); /*?*/

getAreaOfSquare(1); /*?*/

sum(1, 2); /*?*/

getSumOfTwoNumbers(1)/*?*/
