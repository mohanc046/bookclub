const {
  extractValueFromPattern, checkElementExists,
  getCommonITRInfoObject, extractPanNumber,
  calculateDebtorDays, calculateCreditorDays,
  calculateGrossProfitMargin,
  checkForValidElement
} = require('../../../utils/index');

const { logger } = require('../../../../../service/config/logger')

const conditionStatements = [
  { propertyName: 'totalRevenue', indexPosition: 1, pattern: 'DTotal Revenue from operations (A(iv) + B +C(ix))D' },
  { propertyName: 'accountsReceivables', indexPosition: 0, pattern: 'iiSundry Debtorsaii' },
  { propertyName: 'currentLiabilities', indexPosition: 2, pattern: 'iiiTotal(iE + iiD)diii' },
  { propertyName: 'totalWages', indexPosition: 1, pattern: 'xiTotal compensation to employees (22i + 22ii + 22iii + 22iv + 22v + 22vi + 22vii + 22viii +22ix +\n' + '22x)\n' + '22xi' },
  { propertyName: 'grossTotalIncome', indexPosition: 1, pattern: 'Gross Total income (8 - 9) (5xvii of Schedule BFLA + 5b + 3iv )10' },
  { propertyName: 'currentAssets', indexPosition: 2, pattern: 'Total of current assets, loans and advances (av + biv)3c' },
  { propertyName: 'totalLiabilities', indexPosition: 2, pattern: 'iiiTotal(iE + iiD)diii' },
  { propertyName: 'immediateAndCashEquivalents', indexPosition: 2, pattern: 'C.Total(iiiA + iiiB)iiiC' },
  {
    propertyName: 'ebitda', indexPosition: 1, pattern: 'Profit before interest, depreciation and taxes [15 – (16 to 21 + 22xi + 23v + 24 to 29 + 30iii + 31iii + 32iii\n' +
      '+ 33 to 43 + 44x + 45 + 46 + 47iv + 48 + 49)]\n' + '50'
  },
  { propertyName: 'interestPayable', indexPosition: 1, pattern: 'iii.Total (i + ii)51iii' },
  { propertyName: 'borrowings', indexPosition: 0, pattern: 'c.Total Loan Funds(aiii + biii)2c' },
  { propertyName: 'netProfit', indexPosition: 0, pattern: '56Profit after tax(53 - 54 - 55)56' },
  { propertyName: 'totalIncome', indexPosition: 1, pattern: 'Total income (10 - 12 - 13c)14' },
  { propertyName: 'totalEquity', indexPosition: 0, pattern: 'c.Total proprietor’s fund (a + bv)1c' },
  { propertyName: 'fixedAssets', indexPosition: 0, pattern: 'eTotal(1c + 1d)1e' },
  { propertyName: 'inventoryAssets', indexPosition: 0, pattern: 'cTotal investments(aiii + biv)2c' },
  { propertyName: 'loansAndAdvances', indexPosition: 2, pattern: 'Total of current assets, loans and advances (av + biv)3c' },
  { propertyName: 'depreciationAndAmortisation', indexPosition: 0, pattern: '52Depreciation and amortisation.52' },
  { propertyName: 'totalInterestPaid', indexPosition: 1, pattern: 'iii.Total (i + ii)51iii' },
  { propertyName: 'sundryCreditors', indexPosition: 2, pattern: 'A.Sundry CreditorsiA' },
  { propertyName: 'totalSecuredLoans', indexPosition: 0, pattern: 'iii.Total(ai + iiC)aiii' },
  { propertyName: 'totalUnSecuredLoans', indexPosition: 0, pattern: 'iii.Total(bi + bii)biii' },

  { propertyName: 'closingStock', indexPosition: 1, pattern: 'Closing Stock of Finished Stocks5' },//5
  { propertyName: 'openingStock', indexPosition: 1, pattern: 'Opening Stock of Finished Goods7' },//7
  { propertyName: 'purchases', indexPosition: 1, pattern: 'Purchases (net of refunds and duty or tax, if any)8' },//8
  { propertyName: 'directExpenses', indexPosition: 1, pattern: 'Direct Expenses9' },//9


  {
    propertyName: 'grossProfit', indexPosition: 1, pattern: 'Gross Profit/Loss from Business/Profession - transferred to Profit and Loss account\n' +
      '(6-7-8-9-10xii-11)\n' +
      '12'
  },

  { propertyName: 'incentives', indexPosition: 1, pattern: 'Workmen and staff welfare expenses24' },
  // { propertyName: 'totalExpense', indexPosition: 1, pattern: 'cExpensesic' }, // having duplicate pattern but taking default as 1 match

  // insurance parameters
  { propertyName: 'commercialPropertyInsurance', indexPosition: 1, pattern: 'iv.Other Insurance including factory, office, car, goods,etc.23iv' },
  { propertyName: 'keyManInsurance', indexPosition: 1, pattern: `iii.Keyman's Insurance23iii` },
  { propertyName: 'inventory', indexPosition: 0, pattern: `E.Total(iA + iB + iC + iD)iE` },

];

const specificPatternCheckConditions = [
  // personal information
  { tableIndex: 4, propertyName: 'pan', indexPosition: 0, pattern: `Last Name`, splitStrings: ['PAN', 'Last Name'] },
]


/**
 * @description Function returns final ITR - 3 object with all the extracted values...
 * @name pdfParser_ITR_3_2019_20 
 * @param {Object} result 
 */
const pdfParser_ITR_3_2019_20 = (finalResult) => {


  try {
    let ITR3 = getCommonITRInfoObject();
    conditionStatements.map(item => {
      for (let index = 0; index < finalResult.length; index++) {
        const element = finalResult[index];
        if (checkForValidElement({ element, pattern: item.pattern, index: item.indexPosition })) {
          const patternIndex = element.map((e) => e && e.includes(item.pattern)).indexOf(true);
          return ITR3[`${item.propertyName}`] = extractValueFromPattern({ element, pattern: item.pattern, index: patternIndex })
        }
      }
    })

    // specific check for some cases for extracting the exact value due to pattern duplication
    // pattern present more number of time in teh same PDF file...
    specificPatternCheckConditions.map(item => {
      const element = finalResult[`${item.tableIndex}`];
      if (checkElementExists({ element, pattern: item.pattern, index: item.indexPosition })) {
        return ITR3[`${item.propertyName}`] = extractPanNumber({ stringValue: element[item.indexPosition], array: item.splitStrings })
      }
    });

    const {
      fixedAssets,
      inventoryAssets,
      ebitda,
      depreciationAndAmortisation,
      openingStock,
      purchases,
      directExpenses,
      closingStock,
      accountsReceivables,
      totalRevenue,
      sundryCreditors,
      borrowings,
      currentAssets,
      totalEquity,
      currentLiabilities,
      grossProfit,
      netProfit
    } = ITR3;

    ITR3.totalDebt = borrowings;
    
    ITR3.totalAssets = Number(fixedAssets) + Number(inventoryAssets) + Number(currentAssets);

    ITR3.totalLiabilities = Number(totalEquity) + Number(ITR3.totalDebt) + Number(currentLiabilities);

    ITR3.pbit = Number(ebitda) - Number(depreciationAndAmortisation);

    ITR3.goodsSoldPrice = Number(openingStock) + Number(purchases) + Number(directExpenses) - Number(closingStock);

    ITR3.debtorDays = calculateDebtorDays({ sundryDebtors: accountsReceivables, totalRevenue })

    ITR3.creditorDays = calculateCreditorDays({ sundryCreditors, netSales: totalRevenue })

    ITR3.revenueGrowth = totalRevenue; // Net sales

    ITR3.turnOver = totalRevenue; // Net sales

    ITR3.grossProfitMargin = calculateGrossProfitMargin({ grossProfit, netSales: totalRevenue });

    ITR3.totalExpense = Number(grossProfit) - Number(netProfit);

    // insurance parameters...
    ITR3[`fireAndBurglaryInsurance`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`plantAndMachineryInsurance`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`commercialAutoOrVehicle`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`propertyInTransit`] = ITR3[`commercialPropertyInsurance`];

    return { ITR_INFO: ITR3, isValidITRInfo: true };
  }
  catch (err) {
    logger.error(`Issue with parsing ITR - 3 2019_20 with error : ${err}`);
    return { message: 'Issue with parsing ITR - 3 2019_20', isValidITRInfo: false };
  }
}

module.exports = { pdfParser_ITR_3_2019_20 }

module.exports.xmlParserItr3For201920 = (jsonResponse) => {
  const {
    PARTA_PL,
    PARTA_BS,
    'PartB-TI': PartBTI,
    TradingAccount,
    ManufacturingAccount,
    Form_ITR3: FormITR3,
    PartA_GEN1: PartAGen1
  } = jsonResponse.ITR.ITR3 || {}

  const itrType = FormITR3.FormName
  const assessmentYear = FormITR3.AssessmentYear
  const pan = PartAGen1.PersonalInfo.PAN

  const totalRevenue = TradingAccount.TotRevenueFrmOperations
  const accountsReceivables = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrAsset.SndryDebtors
  const currentLiabilities = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrLiabilitiesProv.TotCurrLiabilitiesProvision
  const currentAssets = PARTA_BS.FundApply.CurrAssetLoanAdv.TotCurrAssetLoanAdv
  const totalWages = PARTA_PL.DebitsToPL.EmployeeComp.TotEmployeeComp
  const incentives = PARTA_PL.DebitsToPL.StaffWelfareExp
  const netProfit = PARTA_PL.TaxProvAppr.ProfitAfterTax
  const immediateAndCashEquivalents = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrAsset.CashOrBankBal.TotCashOrBankBal
  const ebitda = PARTA_PL.DebitsToPL.PBIDTA
  const interestPayable = PARTA_PL.DebitsToPL.InterestExpdrtDtls.InterestExpdr
  const totalDebt = PARTA_BS.FundSrc.LoanFunds.TotLoanFund
  const totalEquity = PARTA_BS.FundSrc.PropFund.TotPropFund
  const fixedAssets = PARTA_BS.FundApply.FixedAsset.TotFixedAsset
  const investments = PARTA_BS.FundApply.Investments.TotInvestments
  const sundryCreditors = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrLiabilitiesProv.CurrLiabilities.SundryCred
  const depreciationAndTaxes = PARTA_PL.DebitsToPL.DepreciationAmort
  const openingStock = TradingAccount.OpngStckOfFinishedStcks
  const purchases = TradingAccount.Purchases
  const directExpenses = TradingAccount.DirectExpenses
  const closingStock = TradingAccount.ClsngStckOfFinishedStcks
  const insurance = PARTA_PL.DebitsToPL.Insurances.OthInsur
  const keyManInsurance = PARTA_PL.DebitsToPL.Insurances.KeyManInsur

  // Unused Mapping values for Future Reference
  const grossTotalIncome = PartBTI.GrossTotalIncome
  const cashFlowFromOperations = 0 // Given
  const borrowings = PARTA_BS.FundSrc.LoanFunds.TotLoanFund
  const totalIncome = PartBTI.TotalIncome
  const totalSecuredLoans = PARTA_BS.FundSrc.LoanFunds.SecrLoan.TotSecrLoan
  const totalUnSecuredLoans = PARTA_BS.FundSrc.LoanFunds.UnsecrLoan.TotUnSecrLoan
  const shortTermInvestment = PARTA_BS.FundApply.Investments.TradeInv.TotTradeInv
  const nonCurrentLiabilities = 0 // Given
  const costOfGoodsProduced = ManufacturingAccount.CostOfGoodsPrdcd

  return {
    financialManagement: {
      totalRevenue,
      accountsReceivables,
      currentLiabilities,
      currentAssets,
      totalAssets: +fixedAssets + +investments + +currentAssets,
      totalLiabilties: +totalEquity + +totalDebt + +currentLiabilities,
      totalWages,
      grossProfitMargin: 0,
      incentives,
      immediateAndCashEquivalents,
      ebitda,
      interestPayable,
      netProfit,
      debtorDays: 0,
      creditorDays: 0
    },
    financialStanding: {
      totalDebt,
      totalEquity,
      totalAssets: +fixedAssets + +investments + +currentAssets,
      ebitda,
      pbit: +ebitda - +depreciationAndTaxes,
      totalInterestPaid: +interestPayable,
      goodsSoldPrice: +openingStock + +purchases + +directExpenses - +closingStock,
      sundryCreditors,
      itrFilingGap: 0
    },
    stabilitySurvival: {
      revenueGrowth: 0
    },
    revenuePotential: {
      totalRevenue,
      totalExpense: 0,
      turnOver: 0
    },
    metaData: {
      itrType,
      assessmentYear,
      pan
    },
    insurance: {
      commercialPropertyInsurance: insurance,
      fireAndBurglaryInsurance: insurance,
      plantAndMachineryInsurance: insurance,
      commercialAutoOrVehicle: insurance,
      propertyInTransit: insurance,
      keyManInsurance: keyManInsurance
    }
  }
}
