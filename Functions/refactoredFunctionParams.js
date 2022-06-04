
// Example #1

const getFormattedParserResult = (payload = {}) => {

    const {
        totalRevenue = DEFAULT_VALUE,
        accountsReceivables = DEFAULT_VALUE,
        currentLiabilities = DEFAULT_VALUE,
        currentAssets = DEFAULT_VALUE,
        totalAssets = DEFAULT_VALUE,
        totalLiabilities = DEFAULT_VALUE,
        totalWages = DEFAULT_VALUE,
        grossProfitMargin = DEFAULT_VALUE,
        incentives = DEFAULT_VALUE,
        immediateAndCashEquivalents = DEFAULT_VALUE,
        interestPayable = DEFAULT_VALUE,
        debtorDays = DEFAULT_VALUE,
        creditorDays = DEFAULT_VALUE,
        documentAssessmentYear = DEFAULT_VALUE,
        itrType = EMPTY,
        panNumber = EMPTY
    } = payload;
    
    return {
        financialManagement:
        {
            totalRevenue: Number(totalRevenue),
            accountsReceivables: Number(accountsReceivables),
            currentLiabilities: Number(currentLiabilities),
            currentAssets: Number(currentAssets),
            totalAssets: Number(totalAssets),
            totalLiabilities: Number(totalLiabilities),
            totalWages: Number(totalWages),
            grossProfitMargin: Number(grossProfitMargin),
            incentives: Number(incentives),
            immediateAndCashEquivalents: Number(immediateAndCashEquivalents),
            interestPayable: Number(interestPayable),
            debtorDays: Number(debtorDays),
            creditorDays: Number(creditorDays),
        },
        metaData: {
            itrType,
            panNumber,
            documentAssessmentYear
        }
    }
}

/**
 * 
 * We have mimic named parameters by using objects as parameters and the destructuring syntax.
 * 
 * Then we don’t have to worry about the order & can easily identify each property is holder proper values.
 * 
 * It’s easier to read & take control over entire method
 * 
 */

let parsedResponse = getFormattedParserResult({
    totalRevenue: 1000,
    accountsReceivables: 35000,
    currentLiabilities: 4000,
    currentAssets: 6000,
    totalAssets: 74542,
    totalLiabilities: 34555,
    totalWages: 3464,
    grossProfitMargin: 5645.66,
    incentives: 3564,
    immediateAndCashEquivalents: 0,
    interestPayable: 45345,
    debtorDays: 43764,
    creditorDays: 887964,
    documentAssessmentYear: '2021',
    itrType: 'ITR 4',
    panNumber: 'DDKPM3570D'
})

// Output :
// {
//     financialManagement: {
//       totalRevenue: 1000,
//       accountsReceivables: 35000,
//       currentLiabilities: 4000,
//       currentAssets: 6000,
//       totalAssets: 74542,
//       totalLiabilities: 34555,
//       totalWages: 3464,
//       grossProfitMargin: 5645.66,
//       incentives: 3564,
//       immediateAndCashEquivalents: 0,
//       interestPayable: 45345,
//       debtorDays: 43764,
//       creditorDays: 887964
//     },
//     metaData: {
//       itrType: 'ITR 4',
//       panNumber: 'DDKPM3570D',
//       documentAssessmentYear: '2021'
//     }
//   }