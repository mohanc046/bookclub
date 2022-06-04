
const DEFAULT_VALUE = 0;

const EMPTY = "";

/**
 * 
 * Limit the Number of a Function’s Parameters
 * 
 * Fewer parameters we have in our code the better.
 * 
 * It’s easier to read and harder for us to make mistakes passing them in.
 * 
 */

// Example #1

const calcVolumeOfRectangle = (length, width, height) => {

    return length * width * height

}

const volumeOfRectangle = calcVolumeOfRectangle(5, 3, 2);

// output : 30

// Example #2

const getFormattedParserResult = (
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
) => {
    
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
 * Limit the Number of a Function’s Parameters
 * 
 * If we have a dozen parameters, then anyone would get confused with the order of the parameters
 * 
 */

let parsedResponse = getFormattedParserResult(
    1000,
    35000,
    4000,
    6000,
    74542,
    34555,
    3464,
    5645.66,
    3564,
    0,
    45345,
    43764,
    887964,
    '2021',
    'ITR 4',
    'DDKPM3570D'
)

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