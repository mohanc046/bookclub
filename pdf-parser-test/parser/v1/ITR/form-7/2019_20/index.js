const { checkElementExists, getCommonITRInfoObject, mergePDFTables, extractValueFromPattern } = require('../../../utils/index')

const conditionStatements = [
  { propertyName: 'totalRevenue', indexPosition: 0, pattern: '10Total10' },
  { propertyName: 'liabilityOfTrust', indexPosition: 1, pattern: 'Less: Total liability of trust/institution', resultIndex: 7 },
  { propertyName: 'liabilityOfAssets', indexPosition: 1, pattern: 'Liability in respect of assets at 4 above', resultIndex: 7 },
  { propertyName: 'totalSalaries', indexPosition: 0, pattern: '3Compensation to employees', resultIndex: 5 },
  { propertyName: 'totalCurrentAssets', indexPosition: 1, pattern: 'Net value of assets (1 - 2)', resultIndex: 7 },
  { propertyName: 'interestPayable', indexPosition: 0, pattern: '8Interest payable u/s 115TE8', resultIndex: 19 }, //Need To Discuss Page No 26
  { propertyName: 'additionIncomeTax', indexPosition: 0, pattern: '10Additional income-tax and interest payable10', resultIndex: 39 },
  { propertyName: 'taxAndInterest', indexPosition: 0, pattern: '11Tax and interest paid11', resultIndex: 19 },
  { propertyName: 'netProfit', indexPosition: 0, pattern: '56Profit after tax(53 - 54 - 55)56' }, // Doubt
  { propertyName: 'totalCapitalWorks', indexPosition: 0, pattern: '1Addition to Capital work in progress (for which exemption u/s 11(1A) has not been claimed)', resultIndex: 6 },
  { propertyName: 'totalAcquisition', indexPosition: 0, pattern: '2Acquisition of capital asset (not claimed as application of income and for which exemption u/s 11(1A) has not been\n' + 'claimed)', resultIndex: 6 },
  { propertyName: 'totalCostOfNewAsset', indexPosition: 0, pattern: '3Cost of new asset for claim of Exemption u/s 11(1A) (restricted to the net consideration)', resultIndex: 6 },
  { propertyName: 'totalExpenses', indexPosition: 0, pattern: 'Total expenses' }, //Done
  { propertyName: 'totalCapitalExpenses', indexPosition: 0, pattern: '5Total capital expenses (1 + 2 + 3 + 4)5' }, //Done
]

/**
 * @description Function returns final ITR - 7 object with all the extracted values...
 * @name pdfParser_ITR_7_2019_20
 * @param {Object} result 
 */

 const pdfParser_ITR_7_2019_20 = (finalResult) => {

   let ITR7 = getCommonITRInfoObject(); 

  conditionStatements.map(item => {
    for (let index = 0; index < finalResult.length; index++) {
      const element = finalResult[index];
      if (checkElementExists({ element, pattern: item.pattern, index: item.indexPosition })) {
        return ITR7[`${item.propertyName}`] = extractValueFromPattern({ element, pattern: item.pattern, index: item.indexPosition })
      }
    }
  })

  ITR7.currentLiabilities = Number(ITR7.liabilityOfTrust) + Number(ITR7.liabilityOfAssets) 

  ITR7.interestExpenses = Number(ITR7.interestPayable) + Number(ITR7.taxAndInterest) + Number(ITR7.additionIncomeTax); 

  ITR7.totalCurrentLiabilities = Number(ITR7.currentLiabilities)

  ITR7.borrowings = ITR7.currentLiabilities; 

  ITR7.totalDebt = ITR7.borrowings; 

  ITR7.totalEquity = Number(ITR7.totalCapitalWorks) + Number(ITR7.totalAcquisition) + Number(ITR7.totalCostOfNewAsset) + Number(ITR7.totalExpenses) + Number(ITR7.totalCapitalExpenses)

  ITR7.currentAssets = ITR7.totalCurrentAssets;

  return ITR7;

}

module.exports = { pdfParser_ITR_7_2019_20 }