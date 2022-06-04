const _ = require('lodash');

const EMPTY = "";

const { invalidBankStatementDetails } = require('./data');

const isAllInformationAreValid = (bankStatementInfo = []) => {


    return bankStatementInfo.every(property => {
        
       
        return _.isEmpty(property) ? false : true  /*?.*/

    })


}

/**
 *  Before processing bank information checking if all necessary information are present.
 * 
 *  If some information not been present, we will facing issue while processing for the
 *  particular information set.
 * 
 *  In the below example will be processing customer information and getting the account holder name
 *  incase customer information not been present, so there will an issue while processing it.
 * 
 */

const isValidBankStatement = (bankStatement) => {

    // extracting bank statement information for validation
    const {
        accountXns, customerInfo,
        monthlyDetails, summaryInfo,
        top5FundsReceived, top5FundsTransferred
    } = bankStatement;


    accountXns
    customerInfo
    monthlyDetails
    summaryInfo
    top5FundsReceived
    top5FundsTransferred


    // processing account holder information

    const { name: accountHolderName = EMPTY } = customerInfo;

    accountHolderName

    // checking all the properties were not empty before processing

    const validationResult = isAllInformationAreValid([
        accountXns, customerInfo,
        monthlyDetails, summaryInfo,
        top5FundsReceived, top5FundsTransferred
    ])

    return validationResult;
}

let validationResponse = isValidBankStatement(invalidBankStatementDetails);

validationResponse
