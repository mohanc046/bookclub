const _ = require('lodash');

const { StatusCodes } = require('http-status-codes')

const { isValid } = require('../../../service/validator/index')

const { NUMBER, IS_NOT_EMPTY, PAN_NUMBER, NUMBER_WITH_SIGN } = require('../../../service/validator/validationLabel');

const { defaultValues: { ITR_FORM_TYPES, LAST_12_MONTH } } = require('../../../service/enums/index');

const moment = require('moment');

const extract_number = require('extract-numbers')

const DEFAULT_VALUE = 0;

const DEFAULT_PATTERN = '$#87@#:;'

const DEFAULT_PAN = '$#87@#:;'

const DEFAULT_EMPTY_STRING = ''

const DEFAULT_EMPTY_OBJECT = {}

const DEFAULT_INDEX_POSITION_ZERO = 0;

const DEFAULT_INDEX_POSITION_ONE = 1;

const TRUE = true;

const FALSE = false;

const NEWLINE_CHARACTER = '\n';

const TOTAL_NUMBER_OF_DAYS_IN_YEAR = 365;

const MARCH_END = '-03-31';

const APRIL_START = '-04-01';

const GSTR_FILING_DEAD_LINE = 20; // last date for filing GSTR in a month


/**
 * @description Function for converting base64 to Uint8Array format
 * because Uint8Array format will only be accepted by the pdf_json_parser
 * @param {String} base64 
 * @returns {Array}
 */

const base64ToUint8Array = (base64) => {
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = DEFAULT_INDEX_POSITION_ZERO; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}

/**
 * @description Function for concatinating the entire PDF tables into single table for processing
 * @name mergePDFTables
 * @param {Array} result 
 * @returns {Array} concated tables will be returned...
 */
const mergePDFTables = (result = {}) => {
    let finalResult = [];
    let { pageTables = [] } = result;
    if (pageTables && pageTables.length) {
        for (let index = DEFAULT_INDEX_POSITION_ZERO; index < pageTables.length; index++) {
            const element = pageTables[index];
            finalResult = finalResult.concat(element && element.tables);
        }
    }
    return finalResult;
}

/**
 * @description Function for checing whether the element exists...
 * @name isElementExists
 * @param {Array} element 
 * @param {Number} index 
 * @returns {Boolean}
 */
const isElementExists = (element = DEFAULT_EMPTY_STRING, index = DEFAULT_INDEX_POSITION_ZERO) => {
    // returning true or false because sometime empty value may present in element[index] and that will be returned...
    return (element && isValid(IS_NOT_EMPTY, element[index])) ? TRUE : FALSE
}

/**
 * @description Functon for the checking the pattern existis in string value for processing
 * @name getStringMatchResult
 * @param {*} stringValue
 * @param {*} pattern
 * @returns {Boolean}
 */
const getStringMatchResult = (stringValue = DEFAULT_EMPTY_STRING, pattern = DEFAULT_PATTERN) => {
    return (`${stringValue}`).includes((`${pattern}`))
}

/**
 * @description Function for splitting string with separator and returns array of values.
 * @name splitValue
 * @param {*} value 
 * @param {*} separator 
 * @returns {Array}
 */
const splitValue = (value = DEFAULT_EMPTY_STRING, separator = DEFAULT_PATTERN) => {
    return _.split(value, separator);
}

/**
 * @description Function for getting the array or object length
 * @name getLength
 * @param {*} object 
 * @returns {Number}
 */
const getLength = (object) => {
    let length = _.size(object);
    return length > DEFAULT_VALUE ? length - 1 : DEFAULT_VALUE;
}

/**
 * @description Function for checking whether the pattern is present in the element
 * @name checkElementExists
 * @param {Array} element 
 * @param {String} pattern 
 * @param {Number} index 
 * @returns {Boolean} - if element is present `0` will be returned , otherwise retuns `1`
 */
const checkElementExists = ({
    element = DEFAULT_EMPTY_STRING,
    pattern = DEFAULT_PATTERN,
    index = DEFAULT_INDEX_POSITION_ZERO
}) => {
    if (isElementExists(element, index)) {
        return getStringMatchResult(element[index], pattern)
    }
    return FALSE;
}

const checkForValidElement = ({
    element = DEFAULT_EMPTY_STRING,
    pattern = DEFAULT_PATTERN,
    index = DEFAULT_INDEX_POSITION_ZERO
}) => {
    if (element && element.length) {
        const patternIndex = element.map((e) => e && e.includes(pattern)).indexOf(true);
        if (patternIndex >= 0 && pattern) {
            return TRUE
        }
        return FALSE;
    }
    return FALSE;
}

/**
 * @description Function for returning valid result based on the some conditional checks.
 * @name sendValidResult
 * @param {String} value
 * @returns {Number} 
 */
const sendValidResult = ({ value = DEFAULT_EMPTY_STRING, validationLabel = NUMBER } = {}) => {
    return isValid(validationLabel, value) ? _.trim(value) : DEFAULT_VALUE
}

/**
 * @description Function for evaluating the result.
 * @name evaluateResult
 * @param {Object} param0
 * @returns {Number} 
 */
const evaluateResult = ({
    element = DEFAULT_EMPTY_STRING,
    index = DEFAULT_INDEX_POSITION_ONE,
    validationLabel = NUMBER
}) => {
    if (isElementExists(element, index)) {
        return sendValidResult({ value: element[index], validationLabel })
    }
    return DEFAULT_VALUE
}

/**
 * @description Function for searching for the pattern and returning its index position
 * @name getPositionInArray
 * @param {*} array 
 * @param {*} searchLabel 
 * @returns {Number} // if negative match not found in the array.
 */
const getPositionInArray = (array = [], searchLabel = DEFAULT_PATTERN) => {
    let isValidArray = _.isArray(array);
    return isValidArray ? array.findIndex((value) => getStringMatchResult(value, searchLabel)) : DEFAULT_VALUE;
}

/**
 * @description Function which returns extracted values from the patterns it gots matched.
 * @name extractValueFromPattern
 * @param {Array} element 
 * @param {String} pattern 
 * @param {Number} index 
 * @param {String} validationLabel 
 * @returns {Number}
 */
const extractValueFromPattern = ({
    element = DEFAULT_EMPTY_STRING,
    pattern = DEFAULT_PATTERN,
    index = DEFAULT_INDEX_POSITION_ZERO,
    validationLabel = NUMBER
}) => {
    if (checkElementExists({ element, pattern, index })) {
        // splitting original string with pattern 
        const result = splitValue(element.join(''), pattern)
        // sample result : ['','10']  
        return evaluateResult({ element: result, index: DEFAULT_INDEX_POSITION_ONE, validationLabel })
    }
    return DEFAULT_VALUE;
}

/**
 * @description Function for matching patterns and sending the result
 * @name extractValueFromNestedArray
 * @param {Array} element 
 * @param {String} pattern 
 * @param {Number} index 
 * @returns {Number} 
 */
const extractValueFromNestedArray = ({
    element = DEFAULT_EMPTY_STRING,
    pattern = DEFAULT_PATTERN,
    index = DEFAULT_INDEX_POSITION_ZERO
} = {}) => {
    let result = "";
    // checking if the pattern one is present in the array element...
    if (checkElementExists({ element, pattern, index })) {
        result = splitValue(element[index], NEWLINE_CHARACTER);
    }
    let secondIndexPosition = getPositionInArray(result, pattern);
    // checking whether the secondIndexPosition is valid then extracting value from matched index
    if (secondIndexPosition && checkElementExists({ element: result, pattern, index: secondIndexPosition })) {
        result = splitValue(result[secondIndexPosition], pattern)
    }
    return evaluateResult({ element: result, index: DEFAULT_INDEX_POSITION_ONE })
}

/**
 * @description Function for checking whether the pattern present in the PDF uploaded...
 * @name fetchITRFormType
 * @param {Array} parsedData 
 * @param {String} itrType 
 * @returns {Boolean}
 */
const fetchITRFormType = (parsedData = {}, itrType = DEFAULT_EMPTY_STRING) => {
    let { pageTables = [] } = parsedData;
    let { tables = [] } = pageTables[DEFAULT_INDEX_POSITION_ZERO] ? pageTables[DEFAULT_INDEX_POSITION_ZERO] : {};
    let tableFirstRowElement = tables[DEFAULT_INDEX_POSITION_ZERO] ? tables[DEFAULT_INDEX_POSITION_ZERO] : [];
    // fetching only first row of the table 
    return checkElementExists({ element: tableFirstRowElement, pattern: itrType, index: DEFAULT_INDEX_POSITION_ZERO })
}

/**
 * @description Function to extract year of assessment from the pdf
 * @name extractAssessmentYear
 * @param {Array} element 
 * @param {text} pattern 
 * @param {Number} index 
 * @returns {Object}
 */
const extractAssessmentYear = ({
    element = DEFAULT_EMPTY_STRING,
    pattern = DEFAULT_PATTERN,
    index = DEFAULT_INDEX_POSITION_ZERO
}) => {
    const isPatternExists = checkElementExists({ element, pattern, index: index });
    // if the pattern not exists returning result...
    if (isPatternExists === FALSE) return isPatternExists;
    // if pattern exists, then fetching the assessment year
    const assessmentYear = splitValue(element[index], pattern);
    // processing assessment year, checking if the year exists, and it should not be empty otherwise returns false...
    // assessmentYear : ['','2018-19']
    if (isElementExists(assessmentYear, DEFAULT_INDEX_POSITION_ONE)
        &&
        isValid(IS_NOT_EMPTY, assessmentYear[DEFAULT_INDEX_POSITION_ONE])) {
        let assessmentValue = splitValue(assessmentYear[DEFAULT_INDEX_POSITION_ONE], '-')
        return {
            isValidAssessmentYear: TRUE,
            assessmentYear: assessmentYear[DEFAULT_INDEX_POSITION_ONE],
            year: [Number(`${assessmentValue[0]}`), Number(`20${assessmentValue[1]}`)]
        }
    }
    return { isValidAssessmentYear: FALSE }
}

/**
 * @description Function for replacing All occurance in the value with replace value and returning it.
 * @name replaceAllOccurances
 * @param {*} value 
 * @param {*} search 
 * @param {*} replace 
 * @returns {String}
 */
const replaceAllOccurances = (value, search, replace) => {
    return (`${value}`).split((`${search}`)).join((`${replace}`));
}

/**
 * @description Function that return ITR document type by concating type and assessment year...
 * @name fetchDocumentType
 * @param {String} itrType 
 * @param {String} assessmentYear 
 * @returns {String}
 */
const fetchDocumentType = ({ itrType = '', assessmentYear = '' }) => {
    let documentType = `${itrType}_${assessmentYear}`;
    documentType = replaceAllOccurances(documentType, '-', "_");
    documentType = replaceAllOccurances(documentType, ' ', "_");
    return documentType;
}

/**
 * @description Function for concatinating entire array to string
 * @name concatElement
 * @param {Array} array
 * @returns {String}
 */
const concatElement = (array = []) => {
    let result = "";
    array.map(item => result = `${result}${item}`)
    return result
}

/**
 * @description Function for extracting pan number from the string by removing the unnecessary substrings present...
 * @name extractPanNumber
 * @param {Object} param0 
 * @returns {String}
 */
const extractPanNumber = ({ stringValue = '', array = [] } = {}) => {
    let updatedString;
    let panNumber = DEFAULT_EMPTY_STRING;
    let panIndex = 0;
    if (_.isArray(stringValue)) updatedString = concatElement(stringValue)
    else updatedString = stringValue
    if (_.isArray(array)) {
        array.map(item => {
            updatedString = replaceAllOccurances(updatedString, item, '__')
        })
        let extractedValue = splitValue(updatedString, '__');
        if (_.isArray(extractedValue)) {
            panIndex = extractedValue.findIndex(item => isValid(PAN_NUMBER, item))
            panNumber = (panIndex >= DEFAULT_VALUE) ? extractedValue[panIndex] : DEFAULT_EMPTY_STRING
        }
    }
    return panNumber
}

const isValidInsurance = (value) => {
    return isValid(NUMBER, value) && value > DEFAULT_VALUE ? TRUE : FALSE
}

/**
 * @description Function for initializing custom object and returning it.
 * @name getCommonITRInfoObject
 */
const getCommonITRInfoObject = () => {
    return {
        totalRevenue: DEFAULT_VALUE,
        accountsReceivables: DEFAULT_VALUE,
        currentLiabilities: DEFAULT_VALUE,
        currentAssets: DEFAULT_VALUE,
        totalLiabilities: DEFAULT_VALUE,
        totalWages: DEFAULT_VALUE,
        grossProfitMargin: DEFAULT_VALUE,
        incentives: DEFAULT_VALUE,
        immediateAndCashEquivalents: DEFAULT_VALUE,
        ebitda: DEFAULT_VALUE,
        interestPayable: DEFAULT_VALUE,
        netProfit: DEFAULT_VALUE,
        debtorDays: DEFAULT_VALUE,
        creditorDays: DEFAULT_VALUE,
        totalDebt: DEFAULT_VALUE,
        totalEquity: DEFAULT_VALUE,
        pbit: DEFAULT_VALUE,
        totalInterestPaid: DEFAULT_VALUE,
        goodsSoldPrice: DEFAULT_VALUE,
        sundryCreditors: DEFAULT_VALUE,
        itrFilingGap: DEFAULT_VALUE,
        revenueGrowth: DEFAULT_VALUE,
        totalExpense: DEFAULT_VALUE,
        turnOver: DEFAULT_VALUE,
        totalAssets: DEFAULT_VALUE,
        loansAndAdvances: DEFAULT_VALUE,
        inventoryAssets: DEFAULT_VALUE,
        investments: DEFAULT_VALUE,
        inventory: DEFAULT_VALUE,

        openingStock: DEFAULT_VALUE,
        purchases: DEFAULT_VALUE,
        directExpenses: DEFAULT_VALUE,
        closingStock: DEFAULT_VALUE,
        fixedAssets: DEFAULT_VALUE,
        totalInvestments: DEFAULT_VALUE,
        assetsLoansAndAdvancesTotal: DEFAULT_VALUE,
        grossProfit: DEFAULT_VALUE,

        depreciationAndAmortisation: DEFAULT_VALUE,

        // insurance 
        commercialPropertyInsurance: DEFAULT_VALUE,
        fireAndBurglaryInsurance: DEFAULT_VALUE,
        plantAndMachineryInsurance: DEFAULT_VALUE,
        commercialAutoOrVehicle: DEFAULT_VALUE,
        propertyInTransit: DEFAULT_VALUE,
        keyManInsurance: DEFAULT_VALUE,

        totalSalaries: DEFAULT_VALUE,
        grossTotalIncome: DEFAULT_VALUE,
        totalCurrentAssets: DEFAULT_VALUE,
        borrowings: DEFAULT_VALUE,
        totalSecuredLoans: DEFAULT_VALUE,
        totalUnSecuredLoans: DEFAULT_VALUE,
        itrType: DEFAULT_EMPTY_STRING,
        assessmentYear: DEFAULT_EMPTY_STRING,
        pan: DEFAULT_EMPTY_STRING,
        totalIncome: DEFAULT_VALUE,
        currentLiabilitiesAndPrivisionsTotal: DEFAULT_VALUE,
        totalProfitValue: DEFAULT_VALUE,
        totalProfit50Percent: DEFAULT_VALUE,
        balanceTax: DEFAULT_VALUE,
        balanceWithBank: DEFAULT_VALUE,
        cashInHand: DEFAULT_VALUE,
    }
}

/**
 * @description Function for formatting ITR object and returning a custom response.
 * @name fetchFormattedITRObject
 * @param {Object} props 
 * @returns {Object}
 */
const fetchFormattedITRObject = (props) => {
    let {
        totalRevenue = DEFAULT_VALUE,
        accountsReceivables = DEFAULT_VALUE,
        currentLiabilities = DEFAULT_VALUE,
        currentAssets = DEFAULT_VALUE,
        totalLiabilities = DEFAULT_VALUE,
        totalWages = DEFAULT_VALUE,
        grossProfitMargin = DEFAULT_VALUE,
        incentives = DEFAULT_VALUE,
        immediateAndCashEquivalents = DEFAULT_VALUE,
        ebitda = DEFAULT_VALUE,
        interestPayable = DEFAULT_VALUE,
        netProfit = DEFAULT_VALUE,
        debtorDays = DEFAULT_VALUE,
        creditorDays = DEFAULT_VALUE,
        totalDebt = DEFAULT_VALUE,
        totalEquity = DEFAULT_VALUE,
        pbit = DEFAULT_VALUE,
        totalInterestPaid = DEFAULT_VALUE,
        goodsSoldPrice = DEFAULT_VALUE,
        sundryCreditors = DEFAULT_VALUE,
        itrFilingGap = DEFAULT_VALUE,
        revenueGrowth = DEFAULT_VALUE,
        totalExpense = DEFAULT_VALUE,
        turnOver = DEFAULT_VALUE,
        totalAssets = DEFAULT_VALUE,

        // insurance
        commercialPropertyInsurance = DEFAULT_VALUE,
        fireAndBurglaryInsurance = DEFAULT_VALUE,
        plantAndMachineryInsurance = DEFAULT_VALUE,
        commercialAutoOrVehicle = DEFAULT_VALUE,
        propertyInTransit = DEFAULT_VALUE,
        keyManInsurance = DEFAULT_VALUE,

        totalSalaries = DEFAULT_VALUE,
        grossTotalIncome = DEFAULT_VALUE,
        totalCurrentAssets = DEFAULT_VALUE,
        borrowings = DEFAULT_VALUE,
        totalSecuredLoans = DEFAULT_VALUE,
        totalUnSecuredLoans = DEFAULT_VALUE,
        depreciationAndAmortisation = DEFAULT_VALUE,
        totalIncome = DEFAULT_VALUE,

        itrType = DEFAULT_EMPTY_STRING,
        assessmentYear = DEFAULT_EMPTY_STRING,
        pan = DEFAULT_EMPTY_STRING,
        message = DEFAULT_EMPTY_STRING,
        documentAssessmentYear = 0

    } = props;
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
            ebitda: Number(ebitda),
            interestPayable: Number(interestPayable),
            netProfit: Number(netProfit),
            debtorDays: Number(debtorDays),
            creditorDays: Number(creditorDays),
        },
        financialStanding:
        {
            totalDebt: Number(totalDebt),
            totalEquity: Number(totalEquity),
            totalAssets: Number(totalAssets),
            ebitda: Number(ebitda),
            pbit: Number(pbit),
            totalInterestPaid: Number(totalInterestPaid),
            goodsSoldPrice: Number(goodsSoldPrice),
            sundryCreditors: Number(sundryCreditors),
            itrFilingGap: Number(itrFilingGap)
        },
        stabilitySurvival: {
            revenueGrowth: Number(revenueGrowth)
        },
        revenuePotential: {
            totalRevenue: Number(totalRevenue),
            totalExpense: Number(totalExpense),
            turnOver: Number(turnOver)
        },
        insuranceData: {
            commercialPropertyInsurance: isValidInsurance(commercialPropertyInsurance),
            fireAndBurglaryInsurance: isValidInsurance(fireAndBurglaryInsurance),
            plantAndMachineryInsurance: isValidInsurance(plantAndMachineryInsurance),
            commercialAutoOrVehicle: isValidInsurance(commercialAutoOrVehicle),
            propertyInTransit: isValidInsurance(propertyInTransit),
            keyManInsurance: isValidInsurance(keyManInsurance)
        },
        others: {
            totalSecuredLoans: Number(totalSecuredLoans),
            totalUnsecuredLoans: Number(totalUnSecuredLoans),
            netProfit: Number(netProfit),
            depreciation: Number(depreciationAndAmortisation),
            interestPayable: Number(interestPayable),
            totalRevenue: Number(totalRevenue),
            totalIncome: Number(totalIncome)
        },
        metaData: {
            itrType,
            assessmentYear,
            pan,
            message
        },
        documentAssessmentYear
    }
}

/**
 * @description Function for returning same object format when getting and returning the error messages...
 * @name getITRErrorInfo
 * @param {*} param0 
 * @returns {Object}
 */
const getITRErrorInfo = ({ message = '' }) => {
    return {
        isValidITRInfo: false,
        message,
        result: ''
    }
}


/**
 * @description Function for getting whether the upload PDF document is one of ITR_FORM_TYPE
 * @name checkITRFormType
 * @param {Array} parsedInfo 
 * @returns {Object}
 */
const checkITRFormType = (parsedInfo) => {
    //looping the ITR form types and checking if it match one of them...
    for (let itrType of ITR_FORM_TYPES) {
        // if pattern matched returning response
        let isPatternMatched = fetchITRFormType(parsedInfo, itrType);
        if (isPatternMatched) {
            return {
                isValidITRType: true,
                itrType,
                itrFormNumber: extractITRFormNumber(itrType)
            }
        }
    }
    // returning false response if none ITR type matches...
    return { isValidITRType: false }
}

const extractITRFormNumber = (formTye = '') => {
    let formattedFormType = replaceAllOccurances(`${formTye}`, '-', '');
    let result = extract_number(formattedFormType);
    let isValidElement = isElementExists(result, DEFAULT_INDEX_POSITION_ZERO);
    let isValidType = isValidElement ? isValid(NUMBER_WITH_SIGN, result[DEFAULT_INDEX_POSITION_ZERO]) : DEFAULT_VALUE;
    return isValidType ? result[DEFAULT_INDEX_POSITION_ZERO] : DEFAULT_VALUE
}

/**
 * @description Function for calculating debtor days...
 * @name calculateDebtorDays
 * @param {Object} param0 
 * @returns {Number}
 */
const calculateDebtorDays = (
    {
        sundryDebtors = DEFAULT_VALUE,
        totalRevenue = DEFAULT_VALUE
    } = {}) => {
    let result = DEFAULT_VALUE;
    if (isValid(NUMBER, sundryDebtors) && isValid(NUMBER, totalRevenue)) {
        result = (sundryDebtors * TOTAL_NUMBER_OF_DAYS_IN_YEAR) / totalRevenue
        if (_.isNumber(result) && _.isFinite(result))
            result = _.round(result, 4) ? _.round(result, 4) : DEFAULT_VALUE
        else
            result = DEFAULT_VALUE;
    }
    return result
}

/**
 * @description Function for calculating creditor days...
 * @name calculateCreditorDays
 * @param {Object} param0 
 * @returns {Number}
 */
const calculateCreditorDays = (
    {
        sundryCreditors = DEFAULT_VALUE,
        netSales = DEFAULT_VALUE
    } = {}) => {
    let result = DEFAULT_VALUE;
    if (isValid(NUMBER, sundryCreditors) && isValid(NUMBER, netSales)) {
        result = (sundryCreditors * TOTAL_NUMBER_OF_DAYS_IN_YEAR) / netSales
        if (_.isNumber(result) && _.isFinite(result))
            result = _.round(result, 4) ? _.round(result, 4) : DEFAULT_VALUE
        else
            result = DEFAULT_VALUE;
    }
    return result
}

/**
 * @description Function for evaluating the value is true or not
 * @name isTrue
 * @param {Boolean} status 
 * @returns {Boolean}
 */
const isTrue = (status = false) => status === TRUE;

/**
 * @description Function for evaluating values in the array
 * @name isArrayValid
 * @param {Array} arrayValues 
 * @param {Function} conditionEvaluation 
 * @returns {Boolean}
 */
const isArrayValid = (arrayValues = [], conditionEvaluation = () => FALSE) => {
    if (_.isArray(arrayValues) && !_.isEmpty(arrayValues))
        return arrayValues.every(conditionEvaluation);
    return FALSE
}

/**
 * @description Function for returning current and previous year...
 * @name getCurrentAndPreviousAssessmentYear
 * @returns {Object}
 */
const getCurrentAndPreviousAssessmentYear = (todayDate = new Date()) => {
    if (_.isDate(todayDate)) {
        // var todayDate = new Date('2018-01-05'); // for passing custom date and testing UI
        var currentYear = todayDate.getFullYear(); // extracting year from today's date
        let nextYear = currentYear + 1;
        let startDate = `${currentYear}${APRIL_START}`;  // April start of current year
        let endDate = `${nextYear}${MARCH_END}`; // March end of next year
        let result = moment(todayDate).isBetween(startDate, endDate); // checking whether current date is between start and end date
        // if result success returning current year and next year
        if (result) {
            return {
                currentYear,
                nextYear
            }
        }
        // otherwise returing last year and current year
        else
            return {
                currentYear: currentYear - 1,
                nextYear: nextYear - 1
            }
    }
    return { currentYear: 0, nextYear: 0 }
}

/**
 * @description Function evaluates the assessment years are valid
 * @name isValidAssessmentYear
 * @param {Array} assessmentYear 
 * @returns {Boolean}
 */
const isValidAssessmentYear = (assessmentYear = [0, 0]) => {
    if (_.isArray(assessmentYear)) {
        let { currentYear, nextYear } = getCurrentAndPreviousAssessmentYear();
        // current year
        if (assessmentYear[DEFAULT_INDEX_POSITION_ZERO] === currentYear &&
            assessmentYear[DEFAULT_INDEX_POSITION_ONE] == nextYear) return TRUE
        // current year - 1
        if (assessmentYear[DEFAULT_INDEX_POSITION_ZERO] === currentYear - 1 &&
            assessmentYear[DEFAULT_INDEX_POSITION_ONE] === nextYear - 1) return TRUE
        // current year - 2
        if (assessmentYear[DEFAULT_INDEX_POSITION_ZERO] === currentYear - 2 &&
            assessmentYear[DEFAULT_INDEX_POSITION_ONE] === nextYear - 2) return TRUE
        // otherwise returing last year and current year
        else return FALSE
    }
    return FALSE
}

/**
 * @description Function for getting the list of assessment date and validating and returning it...
 * @param {Array} year 
 * @returns {Array}
 */
const fetchAssessmentDates = (year = [DEFAULT_VALUE, DEFAULT_VALUE]) => {
    if (_.isArray(year))
        if (isValid(NUMBER, year[DEFAULT_INDEX_POSITION_ZERO]) && isValid(NUMBER, year[DEFAULT_INDEX_POSITION_ONE]))
            return year
    return [DEFAULT_VALUE, DEFAULT_VALUE]
}

/**
 * @description Function return common message pattern based on the current and next year...
 * @name getITRWarningMessage
 * @returns {String}
 */
const getITRWarningMessage = () => {
    let year = getCurrentAndPreviousAssessmentYear();
    let { currentYear, nextYear } = year;
    return `Please provide correct latest 2 years ITR files:
If latest ITR filed, then please upload = ${currentYear}-${nextYear} AND ${currentYear - 1}-${currentYear}
If latest ITR not filed, then please upload = ${currentYear - 2}-${currentYear - 1} and ${currentYear - 1}-${currentYear}`
}

/**
 * @description Function for cross checking whether the uploaded ITR documents belongs to
 * same user...
 * @name isValidITRDocument
 * @param {Array} parsedInfo 
 * @param {String} panNumber 
 * @returns {Boolean}
 */
const isValidITRDocument = (parsedInfo = [], panNumber = DEFAULT_PAN) => {
    if (_.isArray(parsedInfo) && isValid(PAN_NUMBER, panNumber)) {
        let result = [];
        parsedInfo.map(item => {
            // extracting meta data from the ITR parsing response....
            let { metaData = {} } = item;
            let { pan = DEFAULT_PAN } = metaData;
            let isValidPan = pan === panNumber;
            result.push(isValidPan)
        });
        return isArrayValid(result, isTrue)
    }
    return FALSE
}
const generateCustomErrorResponse = (response, message) =>
    response.status(StatusCodes.OK).json({ status: false, message: [message] })

/**
 * @description Function for calculating creditor days...
 * @name calculateGrossProfitMargin
 * @param {Object} param0 
 * @returns {Number}
 */
const calculateGrossProfitMargin = (
    {
        grossProfit = DEFAULT_VALUE,
        netSales = DEFAULT_VALUE
    } = {}) => {
    let result = DEFAULT_VALUE;
    if (isValid(NUMBER, grossProfit) && isValid(NUMBER, netSales)) {
        result = (grossProfit / netSales) * 100
        if (_.isNumber(result) && _.isFinite(result))
            result = _.round(result, 4) ? _.round(result, 4) : DEFAULT_VALUE
        else
            result = DEFAULT_VALUE;
    }
    return result
}

/**
 * @description Function for returning current and previous year...
 * @name getAssessmentYearForGSTR
 * @returns {Object}
 */
const getAssessmentYearForGSTR = (todayDate = new Date()) => {
    if (_.isDate(todayDate)) {
        var currentYear = todayDate.getFullYear(); // extracting year from today's date
        let previousYear = currentYear - 1; // calculating previous year
        let startDate = `${previousYear}${APRIL_START}`;  // April start of previous year 2020-04-01
        let endDate = `${currentYear}${MARCH_END}`; // March end of current year  2021-03-31
        let result = moment(todayDate).isBetween(startDate, endDate); // checking whether current date is between start and end date
        // if result success returning current year and next year
        if (result) {
            return {
                currentYear, // 2020
                previousYear // 2019
            }
        }
        // otherwise returing last year and current year
        else {
            return {
                currentYear: currentYear + 1, // 2020 + 1 => 2021
                previousYear: previousYear + 1 // 2019 + 1 => 2020
            }
        }
    }
    return { currentYear: 0, previousYear: 0 }
}

/**
 * @description Function for formatting filing date
 * @name getFormattedFilingDate
 * @param {Object} filingInfo 
 * @returns {String}
 */
const getFormattedFilingDate = (filingInfo = {}) => {
    let { endDate, previousYear, currentYear } = filingInfo;
    return `${endDate.format('MMMM')} ${previousYear}-${moment(currentYear, 'YYYY').format('YY')}`
}

/**
 * @description Function returns latest 12 month with current & previous year
 * @name getLatest12Months
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {Array}
 */
const getLatest12Months = (startDate, endDate) => {

    let result = [];

    while (startDate.diff(endDate, 'months') >= 0) {
        let { currentYear, previousYear } = getAssessmentYearForGSTR(new Date(endDate))
        result.push(getFormattedFilingDate({ endDate, previousYear, currentYear }))
        // pushing month with current & previous year - January 2019-20
        endDate.add(1, 'month')
    }

    return result
}

/**
 * @description Function returns is the date is valid filing date or not
 * if less than 20, valid filing date else not
 * @name checkIsValidFilingDate
 * @param {Number} date 
 * @returns {Boolean}
 */
const checkIsValidFilingDate = (date) => {
    return _.isInteger(date) && date > DEFAULT_VALUE ? date <= GSTR_FILING_DEAD_LINE : FALSE
}

/**
 * @description Function to evaluate & reassign start date based on deadline
 * @name getValidFilingInfo
 * @param {Number} date 
 * @param {Date} currentDate 
 * @returns {Object}
 */
const getValidFilingInfo = (date, currentDate) => {

    let startDate, updatedMonthsCount;

    if (checkIsValidFilingDate(date)) {
        startDate = moment(currentDate).subtract(1, 'month') //eliminating previous month and considering last 12 months
        updatedMonthsCount = LAST_12_MONTH + 1; // in this case last month filing is optional, getting last 13 months
    }
    else {
        startDate = moment(currentDate).subtract(1, 'month') //eliminating current month and considering last 12 months
        updatedMonthsCount = LAST_12_MONTH;
    }

    return { startDate, updatedMonthsCount: updatedMonthsCount }
}

module.exports = {
    base64ToUint8Array, mergePDFTables, extractValueFromPattern,
    fetchITRFormType, extractAssessmentYear, fetchDocumentType, checkElementExists,
    getCommonITRInfoObject, fetchFormattedITRObject, splitValue,
    extractValueFromNestedArray, isElementExists, getPositionInArray, sendValidResult,
    replaceAllOccurances, getLength, getITRErrorInfo,
    getStringMatchResult, evaluateResult, checkITRFormType, extractPanNumber,
    calculateDebtorDays, calculateCreditorDays, isTrue, isArrayValid, extractITRFormNumber,
    isValidAssessmentYear, fetchAssessmentDates, getITRWarningMessage, isValidITRDocument,
    getCurrentAndPreviousAssessmentYear, isValidInsurance, generateCustomErrorResponse,
    calculateGrossProfitMargin, checkForValidElement, getAssessmentYearForGSTR,
    getLatest12Months, checkIsValidFilingDate, getValidFilingInfo
}