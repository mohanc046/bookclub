

import moment from 'moment';

import _ from 'lodash';

const OPTIONAL_GSTR_FILING_COUNT_1 = 1;
const OPTIONAL_GSTR_FILING_COUNT_2 = 2;
const DEFAULT_VALUE = 0;
const MARCH_END = '-03-31';
const APRIL_START = '-04-01';
const MAXIMUM_REQUIRED_GSTR_FILE = 10;
const MONTH_COUNT = {
    ONE: 1,
    TWO: 2
};
const WITH_1_MONTH_COUNT = 1;
const WITH_0_MONTH_COUNT = 0;
const GSTR_FILING_DEAD_LINE = 25;

const NOT_HAVING_GSTR_FOR_ELIGIBILITY = "Minimum required age is 1 months from the date of GST registration to proceed the assessment";

const HAVING_VALID_GSTR_FILING_MONTHS = "Got valid GSTR filing months";

const getDifferenceInMonths = (endDate, startDate) => {
    return endDate.diff(startDate, 'months')
}

export const checkIsValidFilingDate = (date) => {
    return date >= GSTR_FILING_DEAD_LINE
}

export const checkOptionalGSTRMonthsCount = (date = moment(), dateOfIncorporation = moment()) => {

    // declaring temporary optional month count variable
    let result = DEFAULT_VALUE; /*?*/

    // extracting date from moment (i.e: 1 - 31)
    let extractedDate = moment(date).date(); /*?*/

    let updatedEndDate = moment(date).format(`MM/YYYY`); /*?*/

    let updatedStartDate = moment(dateOfIncorporation).format(`MM/YYYY`) /*?*/

    // extracted difference in month count between current date & date of establishment of organization
    const monthCount = getDifferenceInMonths(moment(updatedEndDate, `MM/YYYY`), moment(updatedStartDate, `MM/YYYY`)); /*?*/

    // --------------- New Distributors ---------------- //

    // case 1 : Established this current month & less or greater than 25 days
    // for eliminating current month
    if (monthCount === WITH_0_MONTH_COUNT)
        result = OPTIONAL_GSTR_FILING_COUNT_1;

    // case 2 : Establishment is previous month & current date is greater than 25 days.
    // for eliminating only current month
    if (monthCount === WITH_1_MONTH_COUNT && checkIsValidFilingDate(extractedDate)) /*?*/
        result = OPTIONAL_GSTR_FILING_COUNT_1

    // case 3 : Establishment is previous month & current date is less than 25 days.
    // for eliminating both current & previous months
    if (monthCount === WITH_1_MONTH_COUNT && !checkIsValidFilingDate(extractedDate)) /*?*/
        result = OPTIONAL_GSTR_FILING_COUNT_2;

    // --------------- Existing Distributors ---------------- //
    if (monthCount >= MONTH_COUNT.TWO)   /*?*/
        // based on current date - GSTR dead line date - month count is made options
        result = checkIsValidFilingDate(extractedDate) ? OPTIONAL_GSTR_FILING_COUNT_1 : OPTIONAL_GSTR_FILING_COUNT_2

    // returning optional count for processing
    return result /*?*/

}

/*
* @description Function for getting formatted year for comparison
* @name getFormattedDate
* @param {Object} payload 
* @returns {String}
*/
export const getFormattedDate = (payload) => {
    let {
        formatString = `YYYY`, condition = 'year',
        numberToBeSubtracted = 0, date = new Date(),
        currentDateFormat = `DD/MM/YYYY`, numberToBeAdded = 0, skipOperation = false
    } = payload;

    if (skipOperation) return moment(date, currentDateFormat).format(formatString)

    return numberToBeAdded
        ? moment(date, currentDateFormat).add(numberToBeAdded, condition).format(formatString)
        :
        moment(date, currentDateFormat).subtract(numberToBeSubtracted, condition).format(formatString)
}

export const getAssessmentInfo = (payload) => {
    const { endDate, result = false, startDate } = payload || {};
    const condition = result ? { skipOperation: true } : { skipOperation: false, numberToBeAdded: 1 };
    return {
        currentYear: getFormattedDate({ date: endDate, currentDateFormat: `YYYY-MM-DD`, ...condition }), /*?*/
        previousYear: getFormattedDate({ date: startDate, currentDateFormat: `YYYY-MM-DD`, ...condition }) /*?*/
    }
}

export const getAssessmentYearForGSTR = (todayDate = new Date(), getAssessmentInfo) => {
    // extracting year from today's date
    var currentYear = getFormattedDate({ date: todayDate, currentDateFormat: `MM/YYYY` }) /*?*/
    // calculating previous year
    let previousYear = getFormattedDate({ numberToBeSubtracted: 1, date: todayDate, currentDateFormat: `MM/YYYY` })
    // April start of previous year 2020-04-01
    let startDate = `${previousYear}${APRIL_START}`;
    // March end of current year  2021-03-31
    let endDate = `${currentYear}${MARCH_END}`;
    // checking whether current date is between start and end date
    let result = moment(todayDate).isBetween(startDate, endDate);

    return getAssessmentInfo({ endDate, result, startDate, originalDate: todayDate })
}

/**
* @description Function for formatting filing date
* @name getFormattedFilingDate
* @param {Object} filingInfo 
* @returns {String}
*/
export const getFormattedFilingDate = (filingInfo = {}) => {
    let { startDate, previousYear, currentYear } = filingInfo;
    return `${startDate.format('MMMM')} ${previousYear}-${moment(currentYear, 'YYYY').format('YYYY')}`
}

export const getLatestFilingInfo = (startDate, endDate) => {

    // formatting start date & end date with MM/YYYY
    let updatedStartDate = moment(startDate, `MM/YYYY`); /*?*/
    let updatedEndDate = moment(endDate, `MM/YYYY`);/*?*/

    // added to stop month comparison iteration while it reaches 1.
    updatedEndDate.add(MONTH_COUNT.ONE, 'months');

    // appending formatted filing info.
    let result = [];
    while (getDifferenceInMonths(updatedEndDate, updatedStartDate) > DEFAULT_VALUE) {
        let { currentYear, previousYear } = getAssessmentYearForGSTR(updatedStartDate, getAssessmentInfo) /*?*/
        result.push(getFormattedFilingDate({ startDate: updatedStartDate, previousYear, currentYear }))
        updatedStartDate.add(MONTH_COUNT.ONE, 'months')
    }
    return result /*?*/
}

/**
 * @description Function for returning updated filing months information.
 * @name getSlicedFilingInfo
 * @param {Array} totalMonthsFiling 
 * @param {Number} totalMonthsCount 
 * @param {Number} gstrOptionalMonthCount 
 */
export const getSlicedFilingInfo = (totalMonthsFiling, totalMonthsCount, gstrOptionalMonthCount) => {

    // removing optional filing from total count
    let updatedFilingCount = totalMonthsCount - gstrOptionalMonthCount; /*?*/

    // getting all the total filing count except optional months.
    let updatedFilingInfo = []; /*?*/

    // by default removing optional filing details
    updatedFilingInfo = totalMonthsFiling.slice(0, Math.max(updatedFilingCount, DEFAULT_VALUE)) /*?*/

    // slicing latest 12 months in case of existing distributor
    if (updatedFilingCount > MAXIMUM_REQUIRED_GSTR_FILE)
        updatedFilingInfo = updatedFilingInfo.slice(Math.max(updatedFilingCount - MAXIMUM_REQUIRED_GSTR_FILE, DEFAULT_VALUE));

    return updatedFilingInfo /*?*/

}

/**
 * @description Function returns updated filing information 
 * having check for both the existing / new distributor
 * @name getUpdatedFilingInfo
 * @param {Array} totalMonthsFiling 
 * @param {Number} gstrOptionalMonthCount 
 * @returns {Array}
 */
export const getUpdatedFilingInfo = (totalMonthsFiling, gstrOptionalMonthCount) => {

    // declaring variable to hold updated filing information
    let updatedFilingInfo = totalMonthsFiling ? totalMonthsFiling : []; /*?*/

    // getting total GSTR filing count
    const totalFilingCount = _.size(totalMonthsFiling); /*?*/

    /**
     * validating if totalFiling count is valid then processing total filing months for 
     * getting updated filing information
     */
    if (totalFilingCount) {
        updatedFilingInfo = getSlicedFilingInfo(totalMonthsFiling, totalFilingCount, gstrOptionalMonthCount)
    }

    return updatedFilingInfo /*?*/

}

/**
 * @description Function returns status of GSTR filing information.
 * @name getGSTRFilingStatusInfo
 * @param {Array} latestFilingInfo 
 * @returns {Object}
 */
export const getGSTRFilingStatusInfo = (latestFilingInfo) => {

    // getting total filing count
    const mandatoryFilingCount = _.size(latestFilingInfo); /*?*/

    let isValidMandatoryCount = mandatoryFilingCount > DEFAULT_VALUE; /*?*/

    // in case of no GSTr filing info received based on date if incorporation setting warning message.
    const warningMessage = isValidMandatoryCount ? HAVING_VALID_GSTR_FILING_MONTHS : NOT_HAVING_GSTR_FOR_ELIGIBILITY

    return {
        mandatoryFilingCount,
        warningStatus: !isValidMandatoryCount,
        warningMessage
    }
}

/**
 * @description Function returns filing information till dated.
 * @name getGSTRFilingInfo
 * @returns {Array}
 * @todo move strings and magic number to enums...
 */
const getGSTRFilingInfo = (establishmentDate = new Date('2021-03-20'), currentDate = moment()) => {

    // getting valid start date based on Effective Date of registration from GSTR filing portal 
    const startDate = moment(establishmentDate); /*?*/

    // getting current date as endDate for considering latest filing processing
    let endDate = moment(currentDate); /*?*/

    // getting optional filing count based on GSTR_FILING_DEAD_LINE & new / existing distributor
    let gstrOptionalMonthCount = checkOptionalGSTRMonthsCount(currentDate, establishmentDate); /*?*/

    // getting all filing information from date od incorporation /establishment of an organization
    const totalMonthsFiling = getLatestFilingInfo(moment(startDate).format('MM/YYYY'), moment(endDate).format('MM/YYYY'));

    // validating total filingCount & then getting updated filing information.
    const latestFilingMonths = getUpdatedFilingInfo(totalMonthsFiling, gstrOptionalMonthCount)

    // if mandatory documents are less than zero we are enabling the warning flag
    const gstrFilingStatusInfo = getGSTRFilingStatusInfo(latestFilingMonths);

    // returning formatted filing info & optionalMonthCount for validating GSTR
    return {
        latestFilingMonths,
        gstrOptionalMonthCount,
        ...gstrFilingStatusInfo
    }
}

// get monthly filing verification information...
getGSTRFilingInfo(); /*?*/

const quarterlyFilingConfig = [
    {
        key: 'January February March',
        value: 'Jan-Mar'
    },
    {
        key: 'April May June',
        value: 'Apr-Jun'
    },
    {
        key: 'July August September',
        value: 'Jul-Sep'
    },
    {
        key: 'October November December',
        value: 'Oct-Dec'
    }
];

const getQuarterlyFilings = () =>{

    let { latestFilingMonths = [] } = getGSTRFilingInfo(); 

    let formattedQuarterlyFilingInfo = [];

    latestFilingMonths.map(item =>{

        const [filingPeriod, filingYear] = `${item}`.split(' ');

        quarterlyFilingConfig.map(filing => {

            const { key: filingList = [], value = "" } = filing;

            if (filingList.includes(`${filingPeriod}`))  {

                formattedQuarterlyFilingInfo.push(`${value} ${filingYear}`) 

            }
        })
    })

    return _.uniq(formattedQuarterlyFilingInfo);
}

const formatFilingList = (filingList = []) =>{

    return filingList.map((item) =>{

        const [filingPeriod, filingYear] = `${item}`.split(' ');

        return {
            fy: filingYear,
            taxp: filingPeriod
        }
    })
}



getQuarterlyFilings(); /*?*/


formatFilingList(getQuarterlyFilings()) /*?*/

formatFilingList(getGSTRFilingInfo().latestFilingMonths) /*?*/