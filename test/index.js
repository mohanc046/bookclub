const assert = require('chai').assert;

const moment = require('moment');

const { summer } = require('../SimplifyConditionalLogic/afterDecompose');
 
const { disabilityAmount } = require('../SimplifyConditionalLogic/afterConsolidate');

const plan = {
    summerStart: '2021-06-01',
    summerEnd: '2021-10-01'
}

const currentDate = moment().format(`YYYY-MM-DD`)

const dateInSummer = `2021-06-15`

const dateInWinter = `2021-11-15`

describe('Validating isSummer or not', () => {


    it('it should return false if date not lies between summer', () => {
        assert.equal(summer(plan, currentDate), false)
    });

    it('it should return true if date lies between summer range', () => {
        assert.equal(summer(plan, dateInSummer), true)
    });

    it('it should return false if date not lies between summer range', () => {
        assert.equal(summer(plan, dateInWinter), false)
    });

});

describe('Validating disability amount or not', () => {

    it('it should return 0 if seniority is less then 2 years', () => {
        assert.equal(disabilityAmount({ seniority: 1 }), 0)
    });

    it('it should return 0 if monthsDisabled is greater than 12', () => {
        assert.equal(summer({ monthsDisabled: 13 }), 0)
    });

    it('it should return 0 if isPartTime is empty', () => {
        assert.equal(summer({ isPartTime: 2 }), 0)
    });

});