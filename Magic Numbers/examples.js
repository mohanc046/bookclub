const GSTR_FILING_DEAD_LINE = 25;


const checkIsValidFilingDate = (date) => {
    return date >= 25
}

/**
 * @description Function returns is the date is valid filing date or not
 * if less than 25, valid filing date else not
 * @name checkIsValidFilingDate
 * @param {Number} date 
 * @returns {Boolean}
 */
const checkIsValidFilingDate = (date) => {
    return date >= GSTR_FILING_DEAD_LINE
}


