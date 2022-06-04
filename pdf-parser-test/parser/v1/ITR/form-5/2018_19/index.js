const {
  checkElementExists, extractValueFromPattern,
  getCommonITRInfoObject, extractValueFromNestedArray,
  isElementExists, getLength, extractPanNumber,
  calculateDebtorDays, calculateCreditorDays
} = require('../../../utils/index');

  const { isValid } = require('../../../../../service/validator/index');

const { NUMBER } = require('../../../../../service/validator/validationLabel');

const { logger } = require('../../../../../service/config/logger');

const DEFAULT_VALUE = 0;

const conditionStatements = [
  { propertyName: 'totalRevenue', indexPosition: 0, pattern: 'DTotal Revenue from operations (Aiv + B + Cix)1D' },
  { propertyName: 'currentLiabilities', indexPosition: 2, pattern: 'iiiTotal (iG + iiD)diii' },
  {
    propertyName: 'totalWages', indexPosition: 1, pattern: "xiTotal compensation to employees (14i + 14ii + 14iii + 14iv + 14v + 14vi + 14vii + 14viii +14ix +\n" +
      "14x)\n" +
      "14xi"
  },
  { propertyName: 'grossTotalIncome', indexPosition: 0, pattern: '9Gross Total income (7 – 8) (also 5xiii of Schedule BFLA + 4b)9' },
  { propertyName: 'staffWelfareExpenses', indexPosition: 1, pattern: 'Workmen and staff welfare expenses16' },
  { propertyName: 'currentAssets', indexPosition: 2, pattern: 'Total(av + biv)3c' },
  { propertyName: 'totalCurrentLiabilities', indexPosition: 2, pattern: 'iiiTotal (iG + iiD)diii' },
  { propertyName: 'interestExpenses', indexPosition: 0, pattern: 'iii.Total (ia + ib + iia + iib)44iii' },
  { propertyName: 'borrowings', indexPosition: 0, pattern: 'c.Total Loan Funds(aiii + biii)2c' },
  { propertyName: 'totalEquity', indexPosition: 0, pattern: `c.Total partners' / members' fund (a + bvi)1c` },
  { propertyName: 'netProfit', indexPosition: 0, pattern: '49Profit after tax ( 46 - 47 - 48)49' },
  { propertyName: 'shortTermInvestments', indexPosition: 1, pattern: 'viiTotal Short-term investments (iC + ii + iii + iv + v + vi)bvii' },
  {
    propertyName: 'remunerationOfPartner', indexPosition: 1, pattern: `Salary/Remuneration to Partners of the firm (total of col. (8) of item E of Partner’s/Members information\nunder Part A-Gen)\n380`
  }, 
  { propertyName: 'sourceOfFunds', indexPosition: 0, pattern: '5Sources of funds(1c + 2c + 3 + 4iii)5' },
  { propertyName: 'currentLiabilitiesAndPrivisionsTotal', indexPosition: 2, pattern: 'iiiTotal (iG + iiD)diii' },
  { propertyName: 'fixedAssets', indexPosition: 0, pattern: 'eTotal(1c + 1d)1e' },
  { propertyName: 'totalLocalFunds', indexPosition: 0, pattern: 'c.Total Loan Funds(aiii + biii)2c' },
  { propertyName: 'assetsLoansAndAdvancesTotal', indexPosition: 2, pattern: 'Total(av + biv)3c' },
  { propertyName: 'depreciationAndAmortisation', indexPosition: 0, pattern: '45Depreciation and amortisation.45' },
  { propertyName: 'openingStock', indexPosition: 0, pattern: 'ivTotal (5i + 5ii + 5iii)5iv' },
  { propertyName: 'purchases', indexPosition: 0, pattern: '6Purchases (net of refunds and duty or tax, if any)6' },
  { propertyName: 'directExpenses', indexPosition: 0, pattern: 'vii.Central Goods & Service Tax (CGST)7vii' },
  { propertyName: 'closingStock', indexPosition: 0, pattern: 'Total (3i + 3ii + 3iii)3iv' },
  { propertyName: 'grossProfitMargin', indexPosition: 0, pattern: 'b.Gross profit54(i)b' },
  { propertyName: 'incentives', indexPosition: 1, pattern: 'Workmen and staff welfare expenses16' },
  { propertyName: 'totalExpense', indexPosition: 0, pattern: 'c.Expenses54(i)c' },

  //insurance 
  { propertyName: 'commercialPropertyInsurance', indexPosition: 1, pattern: 'iv.Other Insurance including factory, office, car, goods,etc.15iv' },
  { propertyName: 'keyManInsurance', indexPosition: 1, pattern: `iii.Keyman's Insurance15iii` },


  {
    propertyName: 'accountsReceivables', indexPosition: 1, pattern: 'C.Total Sundry DebtorsiiC',
    haveNestedArray: true
  },
  {
    propertyName: 'sundryCreditors', indexPosition: 2, pattern: '3. Total (1 + 2)A3',
    haveNestedArray: true
  },
  {
    propertyName: 'totalSecuredLoans', indexPosition: 0, pattern: 'iiiTotal secured loans (ai + iiC)aiii',
    haveNestedArray: true
  },
  {
    propertyName: 'totalUnSecuredLoans', indexPosition: 0, pattern: 'iiiTotal unsecured loans(bi + iiD)biii',
    haveNestedArray: true
  },
  {
    propertyName: 'inventory', indexPosition: 1, pattern: 'H. Total (iA + iB + iC + iD + iE + iF + iG)iH',
    haveNestedArray: true
  },
  {
    propertyName: 'immediateAndCashEquivalents', indexPosition: 1, pattern: 'D. Total Cash and cash equivalents (iiiA + iiiB + iiiC)iiiD',
    haveNestedArray: true
  }
];


const specificPatternCheckConditions = [
  {
    tableIndex: 363, propertyName: 'ebitda', pattern: `Profit before interest, depreciation and taxes [4 – (5iv + 6 + 7viii + 8 to 13 + 14xi + 15v + 16 to 21 + 22iii\n" +
  "+ 23iii + 24iii + 25 to 35 + 36vi + 37 + 38 + 39iii + 40vi + 41 + 42)]\n" +
  "43`
  },
  {
    tableIndex: 4, indexPosition: 0, propertyName: 'pan', pattern: 'Date of formation (DDMMYYYY)', splitStrings: ['Date of formation (DDMMYYYY)', 'PAN']
  }
]

const pdfParser_ITR_5_2018_19 = (finalResult) => {

  const ITR5 = getCommonITRInfoObject();

  try {

    conditionStatements.map(item => {
      for (let index = 0; index < finalResult.length; index++) {
        const element = finalResult[index];
        if (checkElementExists({ element, pattern: item.pattern, index: item.indexPosition })) {
          var { haveNestedArray = false } = item;
          if (haveNestedArray)
            return ITR5[`${item.propertyName}`] = extractValueFromNestedArray({ element, pattern: item.pattern, index: item.indexPosition })
          return ITR5[`${item.propertyName}`] = extractValueFromPattern({ element, pattern: item.pattern, index: item.indexPosition })
        }
      }
    })

    /**
     * @description We are seperataing this function because the value is present in the separate index position.
     * [
     *  'pattern',
     *  '',
     *  '',
     *  '',
     *  0
     * ]
     */
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
    });

    const {
      fixedAssets,
      ebitda,
      depreciationAndAmortisation,
      openingStock,
      purchases,
      directExpenses,
      closingStock,
      accountsReceivables,
      totalRevenue,
      sundryCreditors,
      sourceOfFunds,
      currentLiabilitiesAndPrivisionsTotal,
      borrowings,
      currentAssets
    } = ITR5;

    ITR5.totalAssets = Number(fixedAssets) + Number(borrowings) + Number(currentAssets);

    ITR5.interestPayable = ITR5[`interestExpenses`];

    ITR5.totalDebt = ITR5[`borrowings`];

    ITR5.totalIncome = ITR5[`grossTotalIncome`];

    ITR5.totalLiabilities = Number(sourceOfFunds) + Number(currentLiabilitiesAndPrivisionsTotal);

    ITR5.pbit = Number(ebitda) - Number(depreciationAndAmortisation);

    ITR5.goodsSoldPrice = Number(openingStock) + Number(purchases) + Number(directExpenses) - Number(closingStock);

    ITR5.debtorDays = calculateDebtorDays({ sundryDebtors: accountsReceivables, totalRevenue })

    ITR5.creditorDays = calculateCreditorDays({ sundryCreditors, netSales: totalRevenue })

    ITR5.revenueGrowth = totalRevenue; // Net sales

    ITR5.turnOver = totalRevenue; // Net sales

    // insurance parameters...
    ITR5[`fireAndBurglaryInsurance`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`plantAndMachineryInsurance`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`commercialAutoOrVehicle`] = ITR5[`commercialPropertyInsurance`];
    ITR5[`propertyInTransit`] = ITR5[`commercialPropertyInsurance`];

    return { ITR_INFO: ITR5, isValidITRInfo: true };
  }
  catch (err) {
    logger.error(`Issue with parsing ITR - 5 2018_19 with error : ${err}`);
    return { message: 'Issue with parsing ITR - 5 2018_19', isValidITRInfo: false };
  }
};


module.exports = { pdfParser_ITR_5_2018_19 }

