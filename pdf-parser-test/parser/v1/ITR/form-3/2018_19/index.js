const {
  extractValueFromPattern,
  checkElementExists,
  getCommonITRInfoObject,
  extractPanNumber,
  calculateDebtorDays,
  calculateCreditorDays,
  calculateGrossProfitMargin,
  checkForValidElement
} = require('../../../utils/index');

const { logger } = require('../../../../../service/config/logger')

const conditionStatements = [
  { propertyName: 'totalRevenue', indexPosition: 0, pattern: 'DTotal Revenue from operations (Aiv + B+Cix)1D' },
  { propertyName: 'accountsReceivables', indexPosition: 1, pattern: 'iiSundry Debtorsaii' },
  { propertyName: 'currentLiabilities', indexPosition: 1, pattern: 'iiiTotal(iE + iiD)diii' },
  { propertyName: 'totalWages', indexPosition: 1, pattern: 'xiTotal compensation to employees (14i + 14ii + 14iii + 14iv + 14v + 14vi + 14vii + 14viii +14ix +\n' + '14x)\n' + '14xi' },
  { propertyName: 'grossTotalIncome', indexPosition: 1, pattern: 'Gross Total income (8 - 9) (5xiv of Schedule BFLA + 5b)10' },
  { propertyName: 'currentAssets', indexPosition: 1, pattern: 'cTotal of current assets, loans and advances (av + biv)3c' },
  // { propertyName: 'totalLiabilities', indexPosition: 1, pattern: 'iiiTotal(iE + iiD)diii' },
  { propertyName: 'immediateAndCashEquivalents', indexPosition: 1, pattern: 'C.Total(iiiA + iiiB)iiiC' },
  {
    propertyName: 'ebitda', indexPosition: 0, pattern: '42.Profit before interest, depreciation and taxes [4 – (5iv + 6 + 7xii + 8 to 13 + 14xi + 15v + 16 to 21 + 22iii +\n' +
      '23iii + 24iii + 25 to 35 + 36x + 37 + 38iii + 39vi + 40 + 41)]\n' + '42'
  },
  { propertyName: 'interestPayable', indexPosition: 0, pattern: 'iii.Total (i + ii)43iii' },
  { propertyName: 'investments', indexPosition: 1, pattern: 'cTotal investments(aiii + biv)2c' },

  { propertyName: 'totalDebt', indexPosition: 0, pattern: 'c.Total Loan Funds(aiii + biii)2c' },
  { propertyName: 'totalEquity', indexPosition: 0, pattern: `c.Total proprietor’s fund (a + bv)1c` },

  { propertyName: 'netProfit', indexPosition: 0, pattern: '48Profit after tax ( 45 - 46 - 47).48' },

  { propertyName: 'fixedAssets', indexPosition: 0, pattern: 'eTotal(1c + 1d)1e' },
  { propertyName: 'loansAndAdvances', indexPosition: 1, pattern: 'iiDeposits,loans and advances to corporates and othersbii' },
  { propertyName: 'inventoryAssets', indexPosition: 1, pattern: 'E.Total(iA + iB + iC + iD)iE' },
  { propertyName: 'depreciationAndAmortisation', indexPosition: 0, pattern: '44Depreciation and amortisation.44' },

  { propertyName: 'totalInterestPaid', indexPosition: 0, pattern: 'iii.Total (i + ii)43iii' },

  { propertyName: 'openingStock', indexPosition: 0, pattern: 'ivTotal (5i + 5ii + 5iii)5iv' },
  { propertyName: 'purchases', indexPosition: 0, pattern: '6Purchases (net of refunds and duty or tax, if any)6' },
  { propertyName: 'directExpenses', indexPosition: 0, pattern: 'xiiTotal (7i + 7ii + 7iii + 7iv + 7v + 7vi + 7vii+ 7viii + 7ix + 7x + 7xi)  7xii' },
  { propertyName: 'closingStock', indexPosition: 0, pattern: 'Total (3i + 3ii + 3iii)3iv' },

  { propertyName: 'sundryCreditors', indexPosition: 1, pattern: 'A.Sundry CreditorsiA' },
  { propertyName: 'totalSecuredLoans', indexPosition: 0, pattern: 'iii.Total(ai + iiC)aiii' },
  { propertyName: 'totalUnSecuredLoans', indexPosition: 0, pattern: 'iii.Total(bi + bii)biii' },
  // { propertyName: 'grossProfitMargin', indexPosition: 0, pattern: 'b.Gross profit53(i)b' },
  { propertyName: 'incentives', indexPosition: 1, pattern: 'Workmen and staff welfare expenses16' },
  // { propertyName: 'totalExpense', indexPosition: 0, pattern: 'c.Expenses53(i)c' },

  // insurance parameters
  { propertyName: 'commercialPropertyInsurance', indexPosition: 1, pattern: 'iv.Other Insurance including factory, office, car, goods,etc.15iv' },
  { propertyName: 'keyManInsurance', indexPosition: 1, pattern: `iii.Keyman's Insurance15iii` },

  { propertyName: 'totalIncome', indexPosition: 0, pattern: `14Total income (10 - 12 - 13c)14` }

]


const specificPatternCheckConditions = [
  // personal information
  { tableIndex: 4, propertyName: 'pan', indexPosition: 0, pattern: `Last Name`, splitStrings: ['PAN', 'Last Name'] }
]


/**
 * @description Function returns final ITR - 3 object with all the extracted values...
 * @name pdfParser_ITR_3_2018_19
 * @param {Object} result 
 */
const pdfParser_ITR_3_2018_19 = (finalResult) => {

  let ITR3 = getCommonITRInfoObject();

  try { 
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
      ebitda,
      depreciationAndAmortisation,
      openingStock,
      purchases,
      directExpenses,
      closingStock,
      accountsReceivables,
      totalRevenue,
      sundryCreditors,
      investments,
      currentAssets,
      totalEquity,
      totalDebt,
      currentLiabilities,
      netProfit
    } = ITR3;

    ITR3.totalAssets = Number(fixedAssets) + Number(investments) + Number(currentAssets);

    ITR3.totalLiabilities = Number(totalEquity) + Number(totalDebt) + Number(currentLiabilities);

    ITR3.pbit = Number(ebitda) - Number(depreciationAndAmortisation);

    ITR3.goodsSoldPrice = Number(openingStock) + Number(purchases) + Number(directExpenses) - Number(closingStock);

    ITR3.debtorDays = calculateDebtorDays({ sundryDebtors: accountsReceivables, totalRevenue })

    ITR3.creditorDays = calculateCreditorDays({ sundryCreditors, netSales: totalRevenue })

    ITR3.revenueGrowth = totalRevenue; // Net sales

    ITR3.turnOver = totalRevenue; // Net sales

    const grossProfit = Number(totalRevenue) - Number(ITR3.goodsSoldPrice);

    ITR3.totalExpense = Number(grossProfit) - Number(netProfit);

    ITR3.grossProfitMargin = calculateGrossProfitMargin({ grossProfit, netSales: totalRevenue })

    // insurance parameters...
    ITR3[`fireAndBurglaryInsurance`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`plantAndMachineryInsurance`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`commercialAutoOrVehicle`] = ITR3[`commercialPropertyInsurance`];
    ITR3[`propertyInTransit`] = ITR3[`commercialPropertyInsurance`];

    return { ITR_INFO: ITR3, isValidITRInfo: true };
  }
  catch (err) {
    logger.error(`Issue with parsing ITR - 3 2018_19 with error : ${err}`);
    return { message: 'Issue with parsing ITR - 3 2018_19', isValidITRInfo: false };
  }

}

module.exports = { pdfParser_ITR_3_2018_19 }

module.exports.xmlParserItr3For201819 = (jsonResponse) => {
  const { PARTA_PL, PARTA_BS, 'PartB-TI': PartBTI, Form_ITR3: FormITR3, PartA_GEN1: PartAGen1 } =
    jsonResponse.ITR.ITR3 || {}

  const itrType = FormITR3.FormName
  const assessmentYear = FormITR3.AssessmentYear
  const pan = PartAGen1.PersonalInfo.PAN

  const incentives = PARTA_PL.DebitsToPL.StaffWelfareExp
  const totalRevenue = PARTA_PL.CreditsToPL.TotRevenueFrmOperations
  const accountsReceivables = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrAsset.SndryDebtors
  const currentLiabilities = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrLiabilitiesProv.TotCurrLiabilitiesProvision
  const totalWages = PARTA_PL.DebitsToPL.EmployeeComp.TotEmployeeComp
  const ebitda = PARTA_PL.DebitsToPL.PBIDTA
  const immediateAndCashEquivalents = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrAsset.CashOrBankBal.TotCashOrBankBal
  const interestPayable = PARTA_PL.DebitsToPL.InterestExpdrtDtls.InterestExpdr
  const netProfit = PARTA_PL.TaxProvAppr.ProfitAfterTax
  const fixedAssets = PARTA_BS.FundApply.FixedAsset.TotFixedAsset
  const investments = PARTA_BS.FundApply.Investments.TotInvestments
  const currentAssets = PARTA_BS.FundApply.CurrAssetLoanAdv.TotCurrAssetLoanAdv
  const totalEquity = PARTA_BS.FundSrc.PropFund.TotPropFund
  const depreciationAndTaxes = PARTA_PL.DebitsToPL.DepreciationAmort
  const openingStock = PARTA_PL.DebitsToPL.OpeningStockDtls.OpeningStock
  const purchases = PARTA_PL.DebitsToPL.Purchases
  const directExpenses = PARTA_PL.DebitsToPL.DutyTaxPay.ExciseCustomsVAT.IntegratedGoodServiceTax
  const closingStock = PARTA_PL.CreditsToPL.ClosingStockDtls.ClosingStock
  const sundryCreditors = PARTA_BS.FundApply.CurrAssetLoanAdv.CurrLiabilitiesProv.CurrLiabilities.SundryCred
  const totalDebt = PARTA_BS.FundSrc.LoanFunds.TotLoanFund
  const insurance = PARTA_PL.DebitsToPL.Insurances.OthInsur
  const keyManInsurance = PARTA_PL.DebitsToPL.Insurances.KeyManInsur

  // Unused Mapping values for Future Reference
  const grossTotalIncome = PartBTI.GrossTotalIncome
  const borrowings = PARTA_BS.FundSrc.LoanFunds.TotLoanFund
  const totalIncome = PartBTI.TotalIncome
  const totalSecuredLoans = PARTA_BS.FundSrc.LoanFunds.SecrLoan.TotSecrLoan
  const totalUnSecuredLoans = PARTA_BS.FundSrc.LoanFunds.UnsecrLoan.TotUnSecrLoan
  const shortTermInvestment = PARTA_BS.FundApply.Investments.TradeInv.TotTradeInv

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
