const moment = require('moment')

const { gstrErrorMessages } = require('../../../controller/enums')

const { getLatest12Months, getValidFilingInfo } = require('../../../utils/index');

/**
 * @function mergePdfPages
 * @description This function is used to merge the PDF pages
 * @param {Array} pageTables The pages of the PDF
 * @returns {Array} Final merged PDF
 */
const mergePdfPages = (pageTables) => {
  let finalResult = []
  if (pageTables && pageTables.length) {
    for (let index = 0; index < pageTables.length; index++) {
      const element = pageTables[index]
      finalResult = finalResult.concat(element && element.tables)
    }
  }
  return finalResult
}

/**
 * @function removeEmptyString
 * @description This function is used to remove Empty String
 * @param {Array} array The Input
 * @returns {Array} Array without empty Fields
 */
const removeEmptyString = (array) => array.map((element) => element.filter(Boolean))

/**
 * @function removeEmptyObjects
 * @description This function is used to remove Empty Objects
 * @param {Array} array The Input
 * @returns {Array} Array without empty Objects
 */
const removeEmptyObjects = (array) => array.filter((element) => element.length !== 0)

/**
 * @function formatPdfOutput
 * @description This function is used to format Pdf Output
 * @param {Object} output The output from the Pdf parser
 * @returns {Array} Formatted Pdf
 */
const formatPdfOutput = (output) => {
  const { pageTables = [] } = output
  const mergedPdfPages = mergePdfPages(pageTables)
  const modifiedOutput = removeEmptyObjects(removeEmptyString(mergedPdfPages))
  return modifiedOutput
}

/**
 * @function getQuarterlyTotalTaxableValue
 * @description This function is used to get Quarterly TotalTaxableValue
 * @param {String} month The month of Calculation
 * @param {Number} totalTaxableValue The total Taxable Value
 * @param {Object} financialStanding financialStanding having quarterly values
 * @returns {Object} Quarterly Total Taxable Value
 */
const getQuarterlyTotalTaxableValue = (month, totalTaxableValue, financialStanding) => {
  let { q1, q2, q3, q4 } = financialStanding
  const quarterIndex = +[
    'April May June',
    'July August September',
    'October November December',
    'January February March'
  ].findIndex((string) => string.includes(month))
  if (quarterIndex >= 0 && quarterIndex <= 3) {
    switch (+quarterIndex) {
      case 0: {
        q1 += +totalTaxableValue
        break
      }
      case 1: {
        q2 += +totalTaxableValue
        break
      }
      case 2: {
        q3 += +totalTaxableValue
        break
      }
      case 3: {
        q4 += +totalTaxableValue
        break
      }
    }
  }
  return { q1, q2, q3, q4 }
}
/**
 * @function getNumberFixedToTwoDecimalDigits
 * @description This function is used to get number Fixed To Two Decimal Digits
 * @param {Number} value
 * @returns {Object} Number Fixed To Two Decimal Digits Value
 */
const getNumberFixedToTwoDecimalDigits = (value) => +Number(value).toFixed(2)

/**
 * @function calculateNetTaxPayable
 * @description this is used to calculate NetTaxPayable
 * @param {Object} response The Response Object from Parser
 * @returns {Number} NetTaxPayable
 */
const calculateNetTaxPayable = (response) => {
  const { eligibleItc, taxOnOutwardAndReverseChargeInwardSupplies } = response
  const { integratedTax, centralTax, stateOrUTTax } = eligibleItc
  return +(
    +integratedTax +
    (+taxOnOutwardAndReverseChargeInwardSupplies.centralTax - +centralTax) +
    (+taxOnOutwardAndReverseChargeInwardSupplies.stateOrUTTax - +stateOrUTTax)
  )
}

/**
 * @function calculateAnnualGstrData
 * @description This function is used to calculate Annual Gstr Data
 * @param {Array} monthlyReports The monthly reports Array
 * @param {String} year the Year for calculation
 * @returns {Object} Annual GSTR Report
 * @todo Name Default value as Zero
 */
const calculateAnnualGstrData = (monthlyReports, year) => {
  let lateTaxPayment = 0
  let financialStanding = { q1: 0, q2: 0, q3: 0, q4: 0 }
  let gstExpectedCumulative = 0
  let netTaxPayable = 0
  const numberOfMonths = 12
  const defaultValue = 0
  const givenYearMonthlyReports = monthlyReports.filter((object) => object.submittedYear === year)
  givenYearMonthlyReports.forEach((response) => {
    lateTaxPayment += +response.lateTaxPayment + +response.lateTaxPaymentStateTax
    financialStanding = getQuarterlyTotalTaxableValue(
      response.submittedMonth,
      response.taxOnOutwardAndReverseChargeInwardSupplies.totalTaxableValue,
      financialStanding
    )
    gstExpectedCumulative += +response.taxOnOutwardAndReverseChargeInwardSupplies.totalTaxableValue
    netTaxPayable += calculateNetTaxPayable(response)
  })
  return {
    financialManagement: {
      totalDownwardTrend: defaultValue,
      timePeriod: givenYearMonthlyReports.length,
      lateTaxPayment:
        getNumberFixedToTwoDecimalDigits(+lateTaxPayment / givenYearMonthlyReports.length) || defaultValue,
      gstExpectedCumulative:
        getNumberFixedToTwoDecimalDigits((+gstExpectedCumulative / givenYearMonthlyReports.length) * numberOfMonths) ||
        defaultValue,
      netTaxPayable: getNumberFixedToTwoDecimalDigits(netTaxPayable)
    },
    financialStanding: {
      q1: getNumberFixedToTwoDecimalDigits(financialStanding.q1),
      q2: getNumberFixedToTwoDecimalDigits(financialStanding.q2),
      q3: getNumberFixedToTwoDecimalDigits(financialStanding.q3),
      q4: getNumberFixedToTwoDecimalDigits(financialStanding.q4)
    },
    revenuePotential: {
      totalUpwardTrend: defaultValue,
      timePeriod: givenYearMonthlyReports.length,
      customerChurn: defaultValue,
      customerStateCount: defaultValue,
      totalTimePeriod: defaultValue,
      industryGrowth: defaultValue
    },
    metaData: {
      assessmentYear: year
    }
  }
}

/**
 * @function calculateAnnualGstrData
 * @description This function is used to calculate Annual Gstr Data
 * @param {Array} monthlyReports The monthly reports Array
 * @param {String} year the Year for calculation
 * @returns {Object} Annual GSTR Report
 */
const checkIfAlreadyExists = (result, entryLog) =>
  entryLog.find((entryName) => entryName === `${result.submittedMonth} ${result.submittedYear}`)

/**
 * @function getCurrentAndPreviousYearStrings
 * @description This function is used to get Current And Previous Years as Strings
 * @returns {Object} CurrentAndPreviousYear
 */
const getCurrentAndPreviousYearStrings = () => {
  const YEAR = 'year'
  const numberOfYearsToBeModified = 1
  const modifiedLast2Year = 2
  const longYearFormat = 'YYYY'
  const shortYearFormat = 'YY'

  return {
    previousYear: `${moment().subtract(modifiedLast2Year, YEAR).format(longYearFormat)}-${moment().subtract(numberOfYearsToBeModified, YEAR).format(
      shortYearFormat
    )}`,
    currentYear: `${moment().subtract(numberOfYearsToBeModified, YEAR).format(longYearFormat)}-${moment().format(
      shortYearFormat
    )}`
  }
}

/**
 * @constant
 * @name checkGstFiledMonth
 * @param {*} filedMonthYear 
 * @param {*} previous12MonthsBooleanObject 
 * @description -- checks if the GST filed month is valid by checking against previous 12 Months strings.
 * @returns {Boolean}
 */
const checkGstFiledMonth = (filedMonthYear, previous12MonthsBooleanObject) => {
  return previous12MonthsBooleanObject.includes(filedMonthYear);
}

/**
 * @function gstMainParser
 * @description This function is used Parse and calculate the annual GSTR reports
 * @param {Array} gstrScannedDocuments The gstr Scanned Documents Array
 * @returns {Object} Annual GSTR Report for 2 years
 */
module.exports.gstMainParser = (gstrScannedDocuments, passedGstinNumber) => {
  const entryLog = []
  const { currentYear, previousYear } = getCurrentAndPreviousYearStrings()
  const finalResult = []
  // Can be used for each Month Verification
  const previous12MonthsBooleanObject = getPrevious12MonthsFilingInfo()
  const getErrorPayload = (message) => ({
    isError: true,
    errorMessage: message
  })

  for (const singleGstrFile of gstrScannedDocuments) {
    const refinedGstrFile = formatPdfOutput(singleGstrFile)
    const parsedResult = gstParser(refinedGstrFile)
    parsedResult.submittedMonth = parsedResult.submittedMonth || parsedResult.submittedPeriod
    const { submittedYear, submittedMonth, gstinNumber } = parsedResult

    const filedMonthYear = submittedMonth + ` ${submittedYear}`;

    // Return error if Submitted Year or Month is Missing
    if (!submittedYear || !submittedMonth) {
      return getErrorPayload(gstrErrorMessages.ASSESSMENT_YEAR_NOT_FOUND)
    }

    // Return error if GSTR document is not of valid month
    if (!checkGstFiledMonth(filedMonthYear, previous12MonthsBooleanObject)) {
      return getErrorPayload(gstrErrorMessages.INVALID_DOCUMENT_UPLOADED)
    }

    // Return Error if Document already passed
    if (checkIfAlreadyExists(parsedResult, entryLog)) {
      return getErrorPayload(gstrErrorMessages.REPEATED_DOCUMENT_UPLOADED)
    }

    // Return Error if Document is not of same person
    if (gstinNumber !== passedGstinNumber) {
      return getErrorPayload(gstrErrorMessages.GSTIN_MISMATCH)
    }

    entryLog.push(`${submittedMonth} ${submittedYear}`)
    finalResult.push(parsedResult)
  }

  return {
    isError: false,
    gstData: [calculateAnnualGstrData(finalResult, previousYear), calculateAnnualGstrData(finalResult, currentYear)]
  }
}

/**
 * @constant fieldValues This is the Parsing conditions used to get a Value from the PDF
 */
const fieldValues = [
  {
    fieldName: 'submittedYear',
    valueToCheckForKey: 'Year',
    indexToCheckForKey: 0,
    indexToCheckForValue: 1
  },
  {
    fieldName: 'submittedMonth',
    valueToCheckForKey: 'Month',
    indexToCheckForKey: 0,
    indexToCheckForValue: 1
  },
  {
    fieldName: 'submittedPeriod',
    valueToCheckForKey: 'Period',
    indexToCheckForKey: 0,
    indexToCheckForValue: 1
  },
  {
    fieldName: 'legalName',
    valueToCheckForKey: '2. Legal name of the registered person',
    indexToCheckForKey: 0,
    indexToCheckForValue: 1
  },
  {
    fieldName: 'lateTaxPayment',
    valueToCheckForKey: 'Late fee',
    indexToCheckForKey: 0,
    indexToCheckForValue: 2
  },
  {
    fieldName: 'lateTaxPaymentStateTax',
    valueToCheckForKey: 'Late fee',
    indexToCheckForKey: 0,
    indexToCheckForValue: 3
  }
]

/**
 * @function retrieveFieldValue
 * @description This function is used retrieve Field Value from array
 * @param {Array} array The array from which to retrieve
 * @param {Number} index The index value from where to retrieve
 * @returns {String} The retrieving Value
 */
const retrieveFieldValue = (array, index) => {
  if (array && array[index]) {
    if (array[index] === '-') return 0
    return array[index]
  }
  return ''
}

/**
 * @function isFieldExists
 * @description This function is used to check if Field Exists
 * @param {Object} element The Object to check
 * @param {String} text The text for to check
 * @param {Number} index The index to check at
 * @returns {Boolean} The result
 */
const isFieldExists = (element, text, index) => {
  return element && element[index] && element[index] === text
}
/**
 * @function isTextIncludesInGivenString
 * @param {String} givenText To be searched in Text
 * @param {String} searchText To be searched Text
 * @returns {String}
 */
const isTextIncludesInGivenString = (givenText, searchText) => String(givenText).includes(searchText)

/**
 * @function digitFinderUsingRegex
 * @param {String} digitsToFindString To be searched in Text
 * @returns {String}
 */
const digitFinderUsingRegex = (digitsToFindString) => {
  const digitFinderRegex = /[0-9]+.[0-9]{2}|-{1}/gim
  return String(digitsToFindString).match(digitFinderRegex)
}

/**
 * @function gstinFinderUsingRegex
 * @param {String} digitsToFindString To be searched in Text
 * @returns {String}
 */
const gstinFinderUsingRegex = (digitsToFindString) => {
  const digitFinderRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/gim
  return String(digitsToFindString).match(digitFinderRegex)
}

/**
 * @function getGstinNumber
 * @param {String} joinedArray To be searched in Text
 * @returns {Number} GstinNumber
 */
const getGstinNumber = (joinedArray) => {
  const valueToCheckForKey = '1. GSTIN'
  let gstinNumber = null
  if (isTextIncludesInGivenString(joinedArray, valueToCheckForKey)) [gstinNumber] = gstinFinderUsingRegex(joinedArray)
  return gstinNumber
}

/**
 * @function gstParser
 * @description This function is used to parse gst and get required fields out
 * @param {Array} toBeParsedArray
 * @returns {Object} The result
 */
const gstParser = (toBeParsedArray) => {
  const result = {}
  toBeParsedArray.forEach((row) => {
    fieldValues.forEach((field) => {
      if (isFieldExists(row, field.valueToCheckForKey, field.indexToCheckForKey)) {
        result[field.fieldName] = retrieveFieldValue(row, field.indexToCheckForValue)
      }
    })

    const joinedArrayAsString = Array(row).join('')

    const gstinNumber = getGstinNumber(joinedArrayAsString)
    if (gstinNumber) result.gstinNumber = gstinNumber

    const eligibleItc = getEligibleItc(joinedArrayAsString)
    if (eligibleItc) result.eligibleItc = eligibleItc

    const taxOnOutwardAndReverseChargeInwardSupplies = getTaxOnOutwardAndReverseChargeInwardSupplies(joinedArrayAsString)
    if (taxOnOutwardAndReverseChargeInwardSupplies) {
      result.taxOnOutwardAndReverseChargeInwardSupplies = taxOnOutwardAndReverseChargeInwardSupplies
    }
  })
  return result
}

/**
 * @function getEligibleItc
 * @description This function is used to calculate Eligible ITC
 * @param {String} joinedArrayAsString The Current Row to be parsed
 * @returns {Number} EligibleItc
 */
const getEligibleItc = (joinedArrayAsString) => {
  const valueToCheckForKey = '(A) ITC Available'
  if (isTextIncludesInGivenString(joinedArrayAsString, valueToCheckForKey)) {
    const [integratedTax, centralTax, stateOrUTTax] = digitFinderUsingRegex(joinedArrayAsString)
    return { integratedTax, centralTax, stateOrUTTax }
  }
  return null
}

/**
 * @function getTaxOnOutwardAndReverseChargeInwardSupplies
 * @description This function is used to calculate TaxOnOutwardAndReverseChargeInwardSupplies
 * @param {String} joinedArrayAsString The Current Row to be parsed
 * @returns {Number} TaxOnOutwardAndReverseChargeInwardSupplies
 */
const getTaxOnOutwardAndReverseChargeInwardSupplies = (joinedArrayAsString) => {
  const valueToCheckForKey = '(a) Outward taxable supplies (other than zero rated, nil rated and \nexempted)'
  if (isTextIncludesInGivenString(joinedArrayAsString, valueToCheckForKey)) {
    const [totalTaxableValue, integratedTax, centralTax, stateOrUTTax] = digitFinderUsingRegex(joinedArrayAsString)
    return { totalTaxableValue, centralTax, stateOrUTTax }
  }
  return null
}

/**
 * @description Function returns latest 12 month with current & previous year for GSTR file validation
 * @name getPrevious12MonthsFilingInfo
 * @returns {Array}
 */
const getPrevious12MonthsFilingInfo = () => {

  let currentDate = moment(); // taking current date

  let date = moment(currentDate).date();// extracting date from current date

  let updatedInfo = getValidFilingInfo(date, currentDate); // based on last date for GSTR filing, we eliminate current months.

  let { updatedMonthsCount, startDate } = updatedInfo;

  const endDate = moment(startDate).subtract(updatedMonthsCount, 'month') //ending date

  const latestMonths = getLatest12Months(startDate, endDate) // getting latest 12 month with current & previous year

  return latestMonths
}