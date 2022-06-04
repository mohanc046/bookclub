var fromBinaryStringf = require( '@stdlib/number-float32-base-from-binary-string' );
var toBinaryStringf = require( '@stdlib/number-float32-base-to-binary-string' );


const one = toBinaryStringf(0.1);

const two = toBinaryStringf(0.2);

const seven = toBinaryStringf(0.7);

console.log(one,"--------------one");

console.log(two,"--------------two");

console.log(seven,"--------------seven");

const one1 = fromBinaryStringf(one);

console.log(one1,"--------------one1");

const two2 = fromBinaryStringf(two);

console.log(two2,"--------------two2");

const seven7 = fromBinaryStringf(seven);

console.log(seven7,"--------------seven7");