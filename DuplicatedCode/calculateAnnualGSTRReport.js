const DEFAULT_VALUE = 0;

const data = {
    totalLateTaxPayment: 10,
    totalTimePeriod: 10
}

const { calculateLateTaxPayment } = require('./utils');

const calculateAnnualGstr = () => {

    const { totalLateTaxPayment = 0, totalTimePeriod = 0 } = data;

    return {
        financialManagement: {
            totalDownwardTrend: DEFAULT_VALUE,
            timePeriod: totalTimePeriod,
            lateTaxPayment: calculateLateTaxPayment(totalLateTaxPayment, totalTimePeriod)
        }
    }
}

module.exports = { calculateAnnualGstr }

