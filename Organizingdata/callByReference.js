/**
 * Deep copy
 * shallow copy
 * closure
 * symbol
 * encapsulation
 */

function callByReference(varObj) { 
    console.log("Inside Call by Reference Method"); 
    varObj.a = 100; 
    console.log(varObj); 
  } 
  let varObj = {a:1}; // 2205
  console.log("Before Call by Reference Method"); 
  console.log(varObj);
  callByReference(varObj) 
  console.log("After Call by Reference Method"); 
  console.log(varObj);
  
//   output will be : 
//   --------------- 
//   Before Call by Reference Method 
//   {a: 1} 
//   Inside Call by Reference Method 
//   {a: 100} 
//   After Call by Reference Method 
//   {a: 100}