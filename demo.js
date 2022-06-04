const GetFiscalYear = require("get-fiscal-year")

const gfy = new GetFiscalYear();

let currentFinancialYearInfo = gfy.getFiscalYear(`IN`)

let nextFinancialYear = gfy.getFiscalYear(`IN`, 'next')

let previousFinancialYear = gfy.getFiscalYear(`IN`, 'last')

// console.log(previousFinancialYear, "-----------previousFinancialYear");

// console.log(currentFinancialYearInfo, "-----------currentFinancialYearInfo");

// console.log(nextFinancialYear, "-----------nextFinancialYear");


let demo = gfy.


console.log(custom, "----------custom");