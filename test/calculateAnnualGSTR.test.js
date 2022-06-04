const expect = require('chai').expect;

const { calculateAnnualGstr } = require('../DuplicatedCode/calculateAnnualGSTRReport');

const { annualGSTRResponse } = require('./data')

describe('Validating calculated annual GSTR response', () => {


    it('it should be true if it returns an object', () => {
        expect(calculateAnnualGstr()).to.be.a(`object`)
        expect(calculateAnnualGstr()).to.be.a(`object`)
    });

    it('it should be true if it has own property financialManagement', () => {
        expect(calculateAnnualGstr()).to.haveOwnProperty('financialManagement')
    });

    it('it should be true if it returns expected calculation result', () => {
        expect(calculateAnnualGstr()).to.be.deep.equals(annualGSTRResponse)
    });

});