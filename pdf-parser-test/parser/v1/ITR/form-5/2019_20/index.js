const _ = require('lodash');

const { logger } = require('../../../../../service/config/logger')

const {
  checkElementExists, getCommonITRInfoObject,
  extractValueFromNestedArray, extractValueFromPattern, isElementExists,
  getLength, extractPanNumber, calculateDebtorDays,
  calculateCreditorDays
} = require('../../../utils/index');

const { isValid } = require('../../../../../service/validator/index');

const { NUMBER } = require('../../../../../service/validator/validationLabel');

const DEFAULT_VALUE = 0;

const conditionStatements = [
  { propertyName: 'totalRevenue', indexPosition: 0, pattern: 'DTotal Revenue from operations (A(iv) + B +C(ix))D' },
  { propertyName: 'accountsReceivables', indexPosition: 2, pattern: 'C.Total Sundry DebtorsiiC' },
  { propertyName: 'netProfit', indexPosition: 0, pattern: 'iiiTotal Profit (65(i)d + 65(ii)d)65iii' },
  { propertyName: 'totalWages', indexPosition: 1, pattern: 'xiTotal compensation to employees(total of 22i to 22x)xi' },
  { propertyName: 'grossTotalIncome', indexPosition: 1, pattern: 'Gross Total income (7 – 8)9' },
  { propertyName: 'currentAssets', indexPosition: 2, pattern: 'Total(av + biv)3c' },
  { propertyName: 'immediateAndCashEquivalents', indexPosition: 2, pattern: 'Total Cash and cash equivalents (iiiA + iiiB + iiiC)iiiD' },
  { propertyName: 'totalDebt', indexPosition: 1, pattern: 'c.Total Loan Funds(aiii + biii)2c' },
  { propertyName: 'totalEquity', indexPosition: 1, pattern: 'c.Total partners\' / members\' fund (a + bvi)1c' },
  { propertyName: 'totalSecuredLoan', indexPosition: 1, pattern: 'iiiTotal secured loans (ai + iiC)aiii' },
  { propertyName: 'totalUnsecuredLoan', indexPosition: 1, pattern: 'iiiTotal unsecured loans(bi + iiD)biii' },
  { propertyName: 'inventory', indexPosition: 2, pattern: 'H. Total (iA + iB + iC + iD + iE + iF + iG)iH' },
  { propertyName: 'producedGoodsCost', indexPosition: 0, pattern: '3Cost of goods produced- transferred to trading account(1F-2)' },
  { propertyName: 'remunerationOfPartner', indexPosition: 1, pattern: 'Salary/Remuneration to Partners of the firm46' },
  { propertyName: 'grossProfitMargin', indexPosition: 0, pattern: 'bGross profitib' }, // having duplicate pattern but taking default as 1 match
  { propertyName: 'incentives', indexPosition: 1, pattern: 'Workmen and staff welfare expenses24' },
  { propertyName: 'totalExpense', indexPosition: 0, pattern: 'cExpensesic' }, // having duplicate pattern but taking default as 1 match

  // for calculating goods sold price
  { propertyName: 'openingStock', indexPosition: 0, pattern: '7Opening Stock of Finished Goods7' },
  { propertyName: 'purchases', indexPosition: 0, pattern: '8Purchases (net of refunds and duty or tax, if any)8' },
  { propertyName: 'directExpenses', indexPosition: 0, pattern: '9Direct Expenses (9i + 9ii + 9iii)9' },
  { propertyName: 'closingStock', indexPosition: 0, pattern: '5Closing Stock of Finished Stocks5' },

  { propertyName: 'fixedAssets', indexPosition: 1, pattern: 'eTotal(1c + 1d)1e' },
  { propertyName: 'totalInvestments', indexPosition: 1, pattern: 'CTotal investments(aviii + bvii)2c' },
  { propertyName: 'assetsLoansAndAdvancesTotal', indexPosition: 2, pattern: 'Total(av + biv)3c' },

  // have nested array object...
  { propertyName: 'sundryCreditors', indexPosition: 2, pattern: 'Total (1 + 2)A3', haveNestedArray: true },
  { propertyName: 'currentLiabilities', indexPosition: 0, pattern: 'iiiTotal (iG + iiD)diii', haveNestedArray: true }, // totalLiabilities both are same

  //insurance
  { propertyName: 'commercialPropertyInsurance', indexPosition: 1, pattern: 'iv.Other Insurance including factory, office, car, goods,etc.iv' },
  { propertyName: 'keyManInsurance', indexPosition: 1, pattern: `iii.Keyman's Insuranceiii` },

]


const specificPatternCheckConditions = [
  {
    propertyName: 'ebitda', tableIndex: 404,
    pattern: `Profit before interest, depreciation and taxes [15 – (16 to 21 + 22xi + 23v + 24 to 29 + 30iii + 31iii + 32iii\n' +
    '+ 33 to 43 + 44x + 45 + 46 + 47iii + 48iv + 49 + 50)]`
  },
  { propertyName: 'interestPayable', tableIndex: 412, pattern: 'Total (ia + ib + iia + iib)' }, /// same as totalInterestPaid
  { propertyName: 'depreciationAndAmortisation', tableIndex: 413, pattern: 'Depreciation and amortisation.' },
  {
    tableIndex: 5, indexPosition: 0, propertyName: 'pan', pattern: 'Date of formation (DDMMYYYY)', splitStrings: ['Date of formation (DDMMYYYY)', 'PAN']
  }
]


const pdfParser_ITR_5_2019_20 = (finalResult) => {

  var ITR5 = getCommonITRInfoObject();

  try {

    conditionStatements.map(item => {
      for (let index = 0; index < finalResult.length; index++) {
        const element = finalResult[index];
        if (checkElementExists({ element, pattern: item.pattern, index: item.indexPosition })) {
          var { haveNestedArray = false } = item;
          if (haveNestedArray) {
            return ITR5[`${item.propertyName}`] = extractValueFromNestedArray({ element, pattern: item.pattern, index: item.indexPosition })
          }
          return ITR5[`${item.propertyName}`] = extractValueFromPattern({ element, pattern: item.pattern, index: item.indexPosition })
        }
      }
    })

    specificPatternCheckConditions.map(item => {
      const element = finalResult[`${item.tableIndex}`];
      const indexPosition = getLength(element);
      if (item.propertyName === 'pan' && isElementExists(element, item.indexPosition)) {
        return ITR5[`${item.propertyName}`] = extractPanNumber({ stringValue: element, array: item.splitStrings })
      }
      if (isElementExists(element, indexPosition) && isValid(NUMBER, element[indexPosition])) {
        return ITR5[`${item.propertyName}`] = element[indexPosition]
      }
      return DEFAULT_VALUE
    })

    const {
      accountsReceivables,
      totalRevenue,
      sundryCreditors,
      depreciationAndAmortisation,
      openingStock,
      purchases,
      closingStock,
      directExpenses,
      ebitda,
      fixedAssets,
      totalInvestments,
      assetsLoansAndAdvancesTotal
    } = ITR5;

    ITR5.totalAssets = Number(fixedAssets) + Number(totalInvestments) + Number(assetsLoansAndAdvancesTotal)

    ITR5.goodsSoldPrice = Number(openingStock) + Number(purchases) + Number(directExpenses) - Number(closingStock);

    ITR5.pbit = Number(ebitda) - Number(depreciationAndAmortisation)

    ITR5.debtorDays = calculateDebtorDays({ sundryDebtors: accountsReceivables, totalRevenue })

    ITR5.creditorDays = calculateCreditorDays({ sundryCreditors, netSales: totalRevenue })

    ITR5.revenueGrowth = totalRevenue; // Net sales

    ITR5.turnOver = totalRevenue; // Net sales

    ITR5[`totalLiabilities`] = ITR5[`currentLiabilities`];

    ITR5[`totalInterestPaid`] = ITR5[`interestPayable`];

    // insurance parameters...
    ITR5[`fireAndBurglaryInsurance`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`plantAndMachineryInsurance`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`commercialAutoOrVehicle`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`propertyInTransit`] = ITR5[`commercialPropertyInsurance`];

    return { ITR_INFO: ITR5, isValidITRInfo: true };
  }
  catch (err) {
    logger.error(`Issue with parsing ITR - 5 2019_20 with error : ${err}`);
    return { message: 'Issue with parsing ITR - 5 2019_20', isValidITRInfo: false };
  }
}

module.exports = { pdfParser_ITR_5_2019_20 }



