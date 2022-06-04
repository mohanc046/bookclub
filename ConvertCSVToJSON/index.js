
const fs = require('fs');

const xlsx = require('node-xlsx');

const path = require('path');

const _ = require('lodash');

const Excel = require('exceljs')

/**
 * Constants enumerating the HTTP status codes.
 * @const
 */
const HttpStatus = require("http-status-codes");

/**
 * Importing logger Module
 */
const { logger } = require("../../../../utils/logger");

/**
 * Importing user Model
 */
const { User } = require("../index");


module.exports.readFileContent = pathname => {
  return new Promise((resolve) => {
    fs.readdir(pathname, (err, files) => {

      console.log(files, "----------files");

      if (err && !(files && files.length)) {
        logger.info("Directory does not exist.");
        return resolve(false);
      }
      return resolve(`${pathname}/${files[0]}`);
    });
  });
};


const nameSeparator = ' ';

const divideName = (name) => {

  const updatedName = _.trim(`${name}`)

  const nameSlices = updatedName.split(nameSeparator);

  return {
    firstName: nameSlices[0],
    lastName: nameSlices.slice(1,).join(nameSeparator)
  }
}

/**
 * @function
 * @name convertXlsxToJSON
 * @description Convert XLSX to JSON Format
 */
module.exports.convertXlsxToJSON = async (request, response) => {

  const csvFile = path.join(__dirname, '/files.xlsx');

  let workbook = new Excel.Workbook();

  const obj = xlsx.parse(csvFile); // parses a file

  const ASE_INFO = getRoleWiseInfo(obj[0]);
  const ASM_INFO = getRoleWiseInfo(obj[1]);
  const SOM_INFO = getRoleWiseInfo(obj[2]);
  const RSA_INFO = getRoleWiseInfo(obj[3]);
  const RC_INFO = getRoleWiseInfo(obj[4]);
  const BDM_INFO = getRoleWiseInfo(obj[5]);
  const RSM_INFO = getRoleWiseInfo(obj[6]);
  const MDM_INFO = getRoleWiseInfo(obj[7]);
  const SMS_INFO = getRoleWiseInfo(obj[8]);


  let totalAdminCount = 0;

  let totalAdminList = [];

  let entireAdminUsers = [ASE_INFO,
    ASM_INFO,
    SOM_INFO,
    RSA_INFO,
    RC_INFO,
    BDM_INFO,
    RSM_INFO,
    MDM_INFO,
    SMS_INFO]

  entireAdminUsers.map((item, index) => {

    const { totalCount = 0, UNIQUE_BY_MOBILE = [], errorValues = [] } = item;

    totalAdminCount = totalAdminCount + totalCount;

    totalAdminList.push(...UNIQUE_BY_MOBILE);

    if (!_.isEmpty(errorValues)) {

      let worksheetSample = workbook.addWorksheet(`BritanniaAdmin${index}`);

      worksheetSample.columns = [
        { header: 'First Name', key: 'firstName' },
        { header: 'Last Name', key: 'lastName' },
        { header: 'Mobile Number', key: 'mobileNumber' },
        { header: 'Email Id', key: 'emailId' },
        { header: 'Role', key: 'roleName' },
        { header: 'Region', key: 'region' },
      ]

      worksheetSample.getRow(1).font = { bold: true }
      errorValues.forEach((e, index) => {
        worksheetSample.addRow({ ...e })
      })

    }
  })


  // group application by ADMIN
  let uniqueAdminUsers = _.chain(totalAdminList).groupBy("mobileNumber").map(function (individualInfo, mobileNumber) {
    return {
      mobileNumber,
      emailId: _.get(_.find(individualInfo, 'emailId'), 'emailId'),
      firstName: _.get(_.find(individualInfo, 'firstName'), 'firstName'),
      lastName: _.get(_.find(individualInfo, 'lastName'), 'lastName'),
      roles: _.map(individualInfo, 'roleName'),
    }
  }).value();

  let updatedAdminList = [];

  for (let item of uniqueAdminUsers) {

    const { mobileNumber } = item;

    const isAdminExists = await User.findOne({ phone: mobileNumber });

    updatedAdminList.push({ ...item, alreadyExists: isAdminExists ? 'Yes' : 'No' })

  }

  let adminWithSingleRole = 0;

  let adminWithTwoRole = 0;

  updatedAdminList.map((item) => {

    if (_.size(item.roles) == 1) adminWithSingleRole = adminWithSingleRole + 1;

    else adminWithTwoRole = adminWithTwoRole + 1

  });


  let worksheet = workbook.addWorksheet('BritanniaAdmin')

  worksheet.columns = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Mobile Number', key: 'mobileNumber' },
    { header: 'Email Id', key: 'emailId' },
    { header: 'Role', key: 'roles' },
    { header: 'AlreadyExists', key: 'alreadyExists' },
  ]

  worksheet.getRow(1).font = { bold: true }

  // Dump all the data into Excel
  updatedAdminList.forEach((e, index) => {
    // row 1 is the header.
    // const rowIndex = index + 2

    // By using destructuring we can easily dump all of the data into the row without doing much
    // We can add formulas pretty easily by providing the formula property.
    worksheet.addRow({
      ...e
    })
  })

  workbook.xlsx.writeFile('britanniaAdmins.xlsx')

  return response.status(HttpStatus.OK).json({
    message: 'Success',
    totalAdminCount,
    totalAdminList,
    uniqueAdminUserCount: _.size(updatedAdminList),
    updatedAdminList,
    adminWithSingleRole,
    adminWithTwoRole,
    totalUsers: (adminWithSingleRole + adminWithTwoRole)
  });

}

const getRoleWiseInfo = (sheet) => {

  const roleName = sheet['name'];

  const rows = [];

  const errorValues = [];

  //loop through all rows in the sheet
  for (let j = 1; j < sheet['data'].length; j++) {
    //add the row to the rows array

    const [region, name, email, phoneNumber] = sheet['data'][j];

    const { firstName = "", lastName = "" } = divideName(name);

    const emailId = _.trim(`${email}`).toLocaleLowerCase();

    const mobileNumber = _.trim(`${phoneNumber}`).replaceAll(' ', '');

    const isValidMobileNumber = isValid(MOBILE_NUMBER, mobileNumber);

    const isValidEmail = isValid(EMAIL, emailId);

    const isValidFirstName = isValid(IS_NOT_EMPTY, firstName);

    const isValidLastName = isValid(IS_NOT_EMPTY, lastName);

    const isValidRegion = isValid(IS_NOT_EMPTY, region);

    if (isValidMobileNumber && isValidEmail && isValidFirstName && isValidLastName) {
      rows.push({
        roleName,
        region,
        firstName,
        lastName,
        emailId,
        mobileNumber
      })
    }
    else {
      errorValues.push({
        roleName,
        region,
        firstName,
        lastName,
        emailId,
        mobileNumber,
        errorValues: {
          isValidMobileNumber,
          isValidEmail,
          isValidFirstName,
          isValidLastName,
          isValidRegion
        }
      })
    }
  }

  var UNIQUE_BY_MOBILE = _.uniqBy(rows, 'mobileNumber'); //removed if had duplicate id

  var UNIQUE_USERS = _.uniqWith(rows, _.isEqual);//removed complete duplicates

  return {
    roleName, totalCount: _.size(rows),
    uniqueUserCountByMobileNumber: _.size(UNIQUE_BY_MOBILE),
    uniqueUserCountByDuplicates: _.size(UNIQUE_USERS),
    UNIQUE_BY_MOBILE, UNIQUE_USERS,
    errorValuesCount: _.size(errorValues), errorValues
  }
}