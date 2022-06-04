

/**
 * 
 *  Why 0.1 + 0.2 ≠ 0.3 in JavaScript
 * 
 *  You can open your browser’s console and enter 0.1 + 0.2 to check out the result.
 * 
 *  0.1 + 0.2 == 0.3 // false
 * 
 *  0.1 + 0.2 = 0.30000000000000004 // result we got
 * 
 *  No, it is not due to browser, it is working how it supposed to work according to ECMAScript standard
 * 
 * 
 *  IEEE Standard for Binary Floating-Point Arithmetic”
 * 
 *  Number.MAX_SAFE_INTEGER -> 9007199254740991
 * 
 *  Number.MIN_SAFE_INTEGER -> -9007199254740991
 * 
 *  JavaScript represents numeric values using the number primitive type,
 * 
 *  And all JavaScript numbers are actually floating point values — even integers
 * 
 * 
 *  Binary conversion - https://www.h-schmidt.net/FloatConverter/IEEE754.html
 * 
 *  computer :
 * 
 *  0.7 ->  0.699999988079071044921875
 * 
 *  0.5 -> 0.5
 * 
 * In straightforward sentences, the explanation behind this is:
 * 
 * The computer uses base-2 floating-point number whereas Human(We) use base-10 floating-point numbers.
 * 
 * In binary, decimal numbers cannot represent all decimals precisely and have infinite representations.
 * 
 * So computers can not accurately represent numbers like 0.1, 0.2 or 0.3 at all as it uses binary floating-point format.
 * 
 * (0.3).toString(2)
 * 
 * "0.010011001100110011001100110011001100110011001100110011"
 * 
 * 
 * Invalid 
 * 
 *  An invalid operation has been performed. 
 *  For example, computing the square root of a negative number. Returns NaN [2].
 *  NaN
 * 
 * Overflow
 * 
 *  The result is too large to be represented. 
 *  That means that the exponent is too high (p ≥ 1024).
 *  Depending on the sign, there is positive and negative overflow. 
 *  Returns plus or minus infinity.
 * 
 * Inexact 
 *  An operation has produced an inexact result – there are too many significant digits for the fraction to hold. 
 *  Returns a rounded result.
 *  > 0.1 + 0.2
 *  0.30000000000000004
 * 
 * 
 * 
 * The difference between Overflow and Inexact is very subtle
 * 
 * we are exceeding the upper limit of the fraction (which would be an overflow in integer computation). 
 * 
 * But only exceeding the upper limit of the exponent is called an overflow in IEEE 754.
 * 
 * 
 * More example :
 * 
 * 0.1 + 0.2 = 0.3 but computer says 0.30000000000000004
 * 
 * 6 * 0.1 = 0.6 but computer says 0.6000000000000001
 * 
 * 0.11 + 0.12 = 0.23 but again computer says 0.22999999999999998
 * 
 * 0.1 + 0.7 = 0.7999999999999999
 * 
 * 0.3 + 0.6 = 0.8999999999999999
 * 
 * 
 * Accounting - http://openexchangerates.github.io/accounting.js/
 * 
 * Currency - https://currency.js.org/
 * 
 * money - http://openexchangerates.github.io/money.js/
 * 
 * numeric - http://numeraljs.com/
 * 
 * 

 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
// source : https://modernweb.com/45-javascript-tips-tricks-practices/


// https://javascript.plainenglish.io/how-to-check-for-a-number-in-javascript-8d9024708153


// https://2ality.com/2012/04/number-encoding.html

// Number - https://javascript.plainenglish.io/how-to-check-for-a-number-in-javascript-8d9024708153

// Online binary converter - https://www.h-schmidt.net/FloatConverter/IEEE754.html


//  https://decimal-to-binary.com/decimal-to-binary-converter-online.html?id=944
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * In base 10 system (Used by human/us), 
 * 
 * fractions can be expressed precisely if it uses a prime factor of the base (10).
 * 
 * 2 and 5 are the prime factors of 10.
 * 
 * 1/2, 1/4, 1/5 (0.2), 1/8, and 1/10 (0.1) can be expressed precisely as a result of denominators use prime factors of 10.
 * 
 * Whereas, 1/3, 1/6, and 1/7 are repeating decimals as a result of denominators use a prime factor of 3 or 7.
 * 
 * 
 * When you write a program, you're using base 10 as an input but the numbers are stored in base 2:
 * 
 * what you write in your source code: 0.1+0.2
 * 
 * what the computer stores: 0.000110011... + 0.00110011...
 * 
 * Every computer has a special chip called an FPU or Floating Point Unit. 
 * 
 * Computer speed also can be measured in terms of FLOPS, or Floating Point Operations Per Second, 
 * 
 * the speed the computer can process floating point numbers.
 * 
 * 
 * 
 * 
 * 
 */



//  IEEE 754 exceptions
//  The IEEE 754 standard describes five exceptions, where one cannot compute a precise value:
//  Invalid: An invalid operation has been performed. For example, computing the square root of a negative number. Returns NaN [2].
//      > Math.sqrt(-1)
//      NaN
//  Division by zero: returns plus or minus infinity [2].
//      > 3 / 0
//      Infinity
//      > -5 / 0
//      -Infinity
//  Overflow: The result is too large to be represented. That means that the exponent is too high (p ≥ 1024). Depending on the sign, there is positive and negative overflow. Returns plus or minus infinity.
//      > Math.pow(2, 2048)
//      Infinity
//      > -Math.pow(2, 2048)
//      -Infinity
//  Underflow: The result is too close to zero to be represented. That means that the exponent is too low (p ≤ −1023). Returns a denormalized value or zero.
//      > Math.pow(2, -2048)
//      0
//  Inexact: An operation has produced an inexact result – there are too many significant digits for the fraction to hold. Returns a rounded result.
//      > 0.1 + 0.2
//      0.30000000000000004
     
//      > 9007199254740992 + 1
//      9007199254740992
//  #3 and #4 are about the exponent, #5 is about the fraction. The difference between #3 and #5 is very subtle: In the second example given for #5, we are exceeding the upper limit of the fraction (which would be an overflow in integer computation). But only exceeding the upper limit of the exponent is called an overflow in IEEE 754.



/**
 * const scientificNumber 
 */