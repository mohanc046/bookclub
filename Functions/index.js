
const _ = require('lodash');

const EMPTY = "";

const { bankStatementDetails } = require('./data');

const isAllInformationAreValid = (bankStatementInfo = []) => {


    return bankStatementInfo.every(property => {

        return _.isEmpty(property) ? false : true  /*?*/

    })

}

/**
 * 
 * Must initialize the function params before performing any operations.
 * 
 * Initializing function parameters in this way will make your functions easier to read and less error-prone,
 * 
 * and will provide default behavior for your functions.
 * 
 * This will help you avoid errors that stem from passing in undefined arguments and destructuring objects that don't exist.
 * 
 */


const isValidBankStatement = (bankStatement = {}) => {

    // extracting bank statement information for validation
    const {
        accountXns = [], customerInfo = {},
        monthlyDetails = [], summaryInfo = {},
        top5FundsReceived = [], top5FundsTransferred = []
    } = bankStatement;

    // processing account holder information

    const { name: accountHolderName = EMPTY } = customerInfo;

    accountHolderName

    // checking all the properties were not empty before processing

    const validationResult = isAllInformationAreValid([
        accountXns,
        customerInfo,
        monthlyDetails,
        summaryInfo,
        top5FundsReceived,
        top5FundsTransferred
    ])

    accountXns
    customerInfo
    monthlyDetails
    summaryInfo
    top5FundsReceived
    top5FundsTransferred

    return validationResult;
}

let validationResponse = isValidBankStatement(bankStatementDetails);

validationResponse


/**
 * 
 * Beyond the basic usage, JavaScript offers lots of useful features when working with function parameters.
 * 
 * You can easily default a parameter when it’s missing.
 * 
 * All the power of JavaScript destructuring can be applied to parameters. 
 * 
 * You can even combine destructuring with default parameters.
 * 
 * 
 */


/**
 * 
 * Exercise : 
 * 
 * 1. loosely Vs highly coupled?
 * 
 * 2. High Cohesion?
 * 
 */






/**
 * 
 * High cohesion refers to a component that is very well defined. 
 * 
 * Meaning that it serves only one purpose and it accomplishes that purpose very well.
 * 
 * If you have a component that reads from a database, sends an email, prints out documents, then it does not have high cohesion. 
 * 
 * Each one of those should be separated out into its own component. 
 * 
 * By having a component do only one thing you can gain many benefits, 
 * such as testing only what you need, separation of concerns, and ease of maintenance.
 * 
 */












/**
 * 
 * 
 * 
 * Duck typing in computer programming is an application of the duck test —
 * 
 * "If it walks like a duck and it quacks like a duck, then it must be a duck"
 * 
 * — to determine whether an object can be used for a particular purpose.
 * 
 *  With normal typing, suitability is determined by an object's type.
 * 
 *  In duck typing, an object's suitability is determined by the presence of certain methods and properties,
 * 
 *  rather than the type of the object itself.
 * 
 */