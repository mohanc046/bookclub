const DEFAULT_VALUE = 0;


/**
 * 
 * Updated Formulae 
 * 
 */

/**
 * @description Function that calculates late tax payment & returns it.
 * @name calculateLateTaxPayment
 * @param {Number} totalLateTaxPayment 
 * @param {Number} totalTimePeriod 
 * @returns {Number}
 */
const calculateLateTaxPayment = (totalLateTaxPayment, totalTimePeriod) => {

    return totalLateTaxPayment * totalTimePeriod

}

module.exports = { calculateLateTaxPayment }