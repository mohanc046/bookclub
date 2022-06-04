const moment = require('moment');

const _ = require('lodash');

const DEFAULT_ITR_DEADLINE_DAY_MONTH = '01/01';

const DEFAULT_VALUE = 0;

const OPTION_1_YEAR_ITR_FILING = 1;

const APRIL_START = '-04-01';

const GSTR_LAST_MONTH_FILING_CHECK = '-05-25';

const MANDATORY_ITR_FILING_COUNT = 2;

const NOT_HAVING_UPDATED_ITR_FILING = "Minimum 1 year ITR file required to proceed the assessment";

const HAVING_VALID_ITR_FILING = "Got valid ITR filing!"

const getOptionalITRFilingCount = (date = moment()) => {

    let currentYear = moment(date).year(); /*?*/

    let formattedDate = moment(`${DEFAULT_ITR_DEADLINE_DAY_MONTH}/${currentYear}`, `DD/MM/YYYY`);

    // is current date before jan 
    const isBeforeJan = moment(date).isBefore(formattedDate);

    return isBeforeJan ? OPTION_1_YEAR_ITR_FILING : DEFAULT_VALUE /*?*/
}

/**
* @description Function for getting formatted year for comparison
* @name getFormattedDate
* @param {Object} payload
* @returns {String}
*/
const getFormattedDate = (payload = {}) => {
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

/**
 * @description Function that validated that todays date is between the start & end date range
 * @name checkIsDateBetweenRange
 * @param {String} todayDate 
 * @param {String} startDate 
 * @param {String} endDate 
 * @returns {Boolean}
 */
const checkIsDateBetweenRange = (todayDate, startDate, endDate) => {
    return moment(todayDate).isBetween(startDate, endDate);
}

/**
 * @description Function that returns current & previous year.
 * @name getAssessmentInfo
 * @param {Object} payload 
 * @returns {Object}
 */
const getAssessmentInfo = (payload = {}) => {

    const { endDate, result = false, startDate } = payload;

    const updateYearCountBy = result ? 0 : 1;

    const currentYearPayload = {
        date: endDate, currentDateFormat: `YYYY-MM-DD`,
        skipOperation: result, numberToBeAdded: updateYearCountBy
    };

    const previousYearPayload = {
        date: startDate, currentDateFormat: `YYYY-MM-DD`,
        skipOperation: result, numberToBeAdded: updateYearCountBy
    };

    return {
        currentYear: getFormattedDate(currentYearPayload),
        previousYear: getFormattedDate(previousYearPayload)
    }
}

/**
 * @description Function for returning current and previous year...
 * @name getAssessmentYearForGSTR
 * @returns {Object}
 */
const getAssessmentYearForGSTR = (todayDate = new Date()) => {

    // extracting year from today's date
    var currentYear = getFormattedDate({ date: todayDate, currentDateFormat: `MM/YYYY` })

    // calculating previous year
    let previousYear = getFormattedDate({ numberToBeSubtracted: 1, date: todayDate, currentDateFormat: `MM/YYYY` })

    // April start of previous year 2020-04-01
    let startDate = `${previousYear}${APRIL_START}`;

    // March end of current year  2021-03-31 ---> 2021-05-25
    let endDate = `${currentYear}${GSTR_LAST_MONTH_FILING_CHECK}`;

    // checking whether current date is between start and end date
    let result = checkIsDateBetweenRange(todayDate, startDate, endDate); /*?*/

    return getAssessmentInfo({
        endDate, result,
        startDate,
        originalDate: todayDate
    })
}

/**
 * @description Function returns valid latest mandatory ITR filing information
 * @name getTotalITRFilingInfo
 * @param {Date} endDate 
 * @returns {Object}
 */
const getTotalITRFilingInfo = (endDate) => {

    let updatedStartDate = moment(endDate).subtract(2, 'years'); /*?*/

    // added to stop month comparison iteration while it reaches zero.
    endDate.add(1, 'year');

    let updatedEndDate = endDate; /*?*/
    // appending formatted filing info.

    let result = [];

    while (updatedEndDate.diff(updatedStartDate, 'year') > DEFAULT_VALUE) {
        let {
            currentYear, previousYear
        } = getAssessmentYearForGSTR(updatedStartDate) /*?*/

        // eliminating other non-mandatory filing information
         result.push(`${previousYear}-${currentYear}`)

        updatedStartDate.add(1, 'year')
    }
    return result /*?*/
}

/**
 * @description Function for returning updated filing years information.
 * @name getSlicedITRFilingInfo
 * @param {Array} totalFilingInfo 
 * @param {Number} totalITRFilingCount 
 * @param {Number} optionalITRFilingCount 
 */
const getSlicedITRFilingInfo = (totalFilingInfo, totalITRFilingCount, optionalITRFilingCount) => {

    // removing optional filing from total count
    let updatedFilingCount = totalITRFilingCount - optionalITRFilingCount;

    // getting all the total filing count except optional months.
    let updatedFilingInfo = [];

    // by default removing optional filing details
    updatedFilingInfo = totalFilingInfo.slice(0, Math.max(updatedFilingCount, DEFAULT_VALUE))

    // slicing latest 2 years in case of existing distributor
    if (updatedFilingCount > MANDATORY_ITR_FILING_COUNT)
        updatedFilingInfo = updatedFilingInfo.slice(Math.max(updatedFilingCount - MANDATORY_ITR_FILING_COUNT, DEFAULT_VALUE));

    return updatedFilingInfo

}

/**
 * 
 * get business start date...
 * 
 * if more than 2 year make two filing as mandatory
 * 
 * else 
 * 
 *     if less than 2 year make one filing as mandatory and other as optional
 * 
 *     else less than a year make both filing as optional
 * 
 */
 const getITRFilingInfo = (endDate = moment()) => {

    let latestFilingInfo = [];

    // getting optional filing count based on Feb 1st
    let optionalITRFilingCount = getOptionalITRFilingCount(endDate); /*?*/

    let totalFilingInfo = getTotalITRFilingInfo(endDate); /*?*/

    const totalITRFilingCount = _.size(totalFilingInfo);

    if (totalITRFilingCount) {
        latestFilingInfo = getSlicedITRFilingInfo(totalFilingInfo, totalITRFilingCount, optionalITRFilingCount)
    }

    // getting total filing count
    const mandatoryFilingCount = _.size(latestFilingInfo) - optionalITRFilingCount;

    // if mandatory documents are less than zero we are enabling the warning flag
    const warningStatus = mandatoryFilingCount > DEFAULT_VALUE ? false : true;

    // in case of no GSTr filing info received based on date if incorporation setting warning message.
    const warningMessage = warningStatus ? NOT_HAVING_UPDATED_ITR_FILING : HAVING_VALID_ITR_FILING

    return {
        latestFilingInfo,
        optionalITRFilingCount,
        mandatoryFilingCount,
        warningStatus,
        warningMessage
    }
}

let filingInfo = getITRFilingInfo(moment()) /*?*/


filingInfo /*?*/

/**
 * 
 * Function to get assessment year 
 * 
 * Based on the assessment year populate 2 filing and make thing mandatory and optional
 * 
 * pre-populate existing verified documents...
 * 
 * And return those information to onboarding for verification process
 * 
 */