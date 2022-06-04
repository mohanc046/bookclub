const {
  extractValueFromPattern, checkElementExists,
  getCommonITRInfoObject, extractPanNumber,
  checkForValidElement
} = require('../../../utils/index');

const { logger } = require('../../../../../service/config/logger')

const DEFAULT_INDEX_POSITION_ONE = 1;

const conditionStatements = [
  {
    propertyName: 'revenueCheque', indexPosition: 0, pattern: 'E1a.Through a/c payee cheque or a/c payee bank draft or bank electronic clearing system received\n' +
      'before specified date\n'
  },
  { propertyName: 'revenueOtherModes', indexPosition: 0, pattern: 'E1b.Any other mode' },
  { propertyName: 'grossReceipts', indexPosition: 0, pattern: 'E3.Gross Receipts' },
  { propertyName: 'accountsReceivables', indexPosition: 2, pattern: 'Sundry debtors' },
  { propertyName: 'advances', indexPosition: 1, pattern: 'Advances' },
  { propertyName: 'sundryCreditors', indexPosition: 1, pattern: 'Sundry creditors' },
  { propertyName: 'otherLiabilities', indexPosition: 1, pattern: 'Other liabilities' },
  { propertyName: 'grossTotalIncome', indexPosition: 5, pattern: 'Gross Total Income (B1 + B2 + B3 + B4)' },
  { propertyName: 'totalCurrentAssetsValue', indexPosition: 1, pattern: 'E25.Total assets (E18+E19+E20+E21+E22+E23+E24)' },
  { propertyName: 'fixedAssets', indexPosition: 1, pattern: 'E18.Fixed assets' },
  { propertyName: 'balanceWithBank', indexPosition: 1, pattern: 'E21.Balance with banks' },
  { propertyName: 'cashInHand', indexPosition: 1, pattern: 'E22.Cash-in-hand' },
  { propertyName: 'totalSecuredLoans', indexPosition: 0, pattern: 'Secured loans' },
  { propertyName: 'totalUnsecuredLoans', indexPosition: 1, pattern: 'Unsecured loans' },
  { propertyName: 'totalIncome', indexPosition: 0, pattern: 'C19. Taxable Total Income (B5 - C18)' },
  { propertyName: 'totalEquity', indexPosition: 1, pattern: 'Partners/Members own capital' },
  { propertyName: 'totalLiabilities', indexPosition: 1, pattern: 'E17.Total capital and liabilities (E11+E12+E13+E14+E15+E16)' },
  { propertyName: 'totalProfitValue', indexPosition: 1, pattern: 'c.Total (a + b)' },
  {
    propertyName: 'totalProfit50Percent', indexPosition: 1, pattern: 'E4.Presumptive Income under section 44ADA (>=50% of E3)or the amount claimed to have been earned,\n' +
      'whichever is higher\n' +
      'NOTE-If Income is less than 50% of Gross Receipts, it is mandatory to have a tax audit under 44AB &\n' +
      'regular ITR 3 or 5 has to be filled not this form\n'//check
  },
  { propertyName: 'balanceTax', indexPosition: 1, pattern: 'D7.Balance Tax after Relief (D5-D6)' }, //check
  { propertyName: 'inventoryAssets', indexPosition: 1, pattern: 'E19.Inventories' },

]

const specificPatternCheckConditions = [
  // personal information
  { tableIndex: 4, propertyName: 'pan', indexPosition: 0, pattern: `Permanent Account Number`, splitStrings: [] },
]
/**
 * @description Function returns final ITR - 3 object with all the extracted values...
 * @name pdfParser_ITR_4_2019_20 
 * @param {Object} result 
 */
const pdfParser_ITR_4_2019_20 = (finalResult) => {

  try {
    let ITR4 = getCommonITRInfoObject();
    conditionStatements.map(item => {
      for (let index = 0; index < finalResult.length; index++) {
        const element = finalResult[index];
        if (checkForValidElement({ element, pattern: item.pattern, index: item.indexPosition })) {
          const patternIndex = element.map((e) => e && e.includes(item.pattern)).indexOf(true);
          return ITR4[`${item.propertyName}`] = extractValueFromPattern({ element, pattern: item.pattern, index: patternIndex })
        }
      }
    })

    // specific check for some cases for extracting the exact value due to pattern duplication
    // pattern present more number of time in teh same PDF file...
    specificPatternCheckConditions.map(item => {
      const element = finalResult[`${item.tableIndex}`];
      if (checkElementExists({ element, pattern: item.pattern, index: item.indexPosition })) {
        return ITR4[`${item.propertyName}`] = extractPanNumber({ stringValue: element[DEFAULT_INDEX_POSITION_ONE], array: item.splitStrings })
      }
    });

    const {
      currentAssets,
      advances,
      otherLiabilities,
      totalCurrentAssets,
      balanceWithBank,
      cashInHand,
      totalSecuredLoans,
      totalUnsecuredLoans,
      revenueCheque,
      revenueOtherModes,
      grossReceipts,
      sundryCreditors,
      totalProfitValue,
      totalProfit50Percent,
      balanceTax,
      totalCurrentAssetsValue,
      fixedAssets
    } = ITR4;

    ITR4.totalCurrentAssets = Number(totalCurrentAssetsValue) - Number(fixedAssets)

    ITR4.currentAssets = Number(totalCurrentAssets)

    ITR4.totalCurrentLiabilities = Number(advances) + Number(otherLiabilities) + Number(sundryCreditors);

    ITR4.currentLiabilities = ITR4.totalCurrentLiabilities

    ITR4.immediateAndCashEquivalents = Number(balanceWithBank) + Number(cashInHand)

    ITR4.borrowings = Number(totalSecuredLoans) + Number(totalUnsecuredLoans)

    ITR4.totalRevenue = Number(revenueCheque) + Number(revenueOtherModes) + Number(grossReceipts)

    ITR4.totalDebt = ITR4.borrowings

    ITR4.netProfit = Number(totalProfitValue) + Number(totalProfit50Percent) - Number(balanceTax)

    return { ITR_INFO: ITR4, isValidITRInfo: true };
  }
  catch (err) {
    logger.error(`Issue with parsing ITR - 4 2019_20 with error : ${err}`);
    return { message: 'Issue with parsing ITR - 4 2019_20', isValidITRInfo: false };
  }
}

module.exports = { pdfParser_ITR_4_2019_20 }