function callByValue(varOne, varTwo) { 
    console.log("Inside Call by Value Method"); 
    varOne = 100; 
    varTwo = 200; 
    console.log("varOne =" + varOne +"varTwo =" +varTwo); 
  }
  
  

  let varOne = 10; 
  let varTwo = 20; 

  
  console.log("Before Call by Value Method"); 
  console.log("varOne =" + varOne +"varTwo =" +varTwo); 
  callByValue(varOne, varTwo) 
  console.log("After Call by Value Method"); 
  console.log("varOne =" + varOne +"varTwo =" +varTwo); 
  
 
//   Before Call by Value Method 
//   varOne =10 varTwo =20 
//   Inside Call by Value Method 
//   varOne =100 varTwo =200 
//   After Call by Value Method 
//   varOne =10 varTwo =20