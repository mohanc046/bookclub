/**
 * Imports chai from node library
 */
const chai = require('chai');
/**
 * Imports assert from chai
 */
const assert = chai.assert

const {
  isElementExists,
  getStringMatchResult,
  checkElementExists,
  splitValue,
  fetchITRFormType,
  extractAssessmentYear,
  replaceAllOccurances,
  fetchDocumentType,
  getLength,
  getITRErrorInfo,
  isTrue,
  isArrayValid,
  getCurrentAndPreviousAssessmentYear,
  isValidAssessmentYear,
} = require('../service/utils/index');

const {
  parsedSampleData,
  extractedNestedArrayData,
  itrFormTypeData,
  itrInfoSampleData,
} = require('./utilsTestData')


/**
 * @function isElementExists
 */
describe('Check if value is present in the specified index', function () {

  /** Positive Test Cases */
  it('It will return true as string is present in the specified index', function () {
    assert.equal(isElementExists(parsedSampleData[0], 0), true);
  });
  it('It will return true as string(string of special char and number) is present in the specified index', function () {
    assert.equal(isElementExists(parsedSampleData[2], 2), true);
  });
  it('It will return true as number is present in the specified index', function () {
    assert.equal(isElementExists(parsedSampleData[2], 0), true);
  });

  /** Negative Test Cases */
  it('It will return false as the element of array is empty in the specified index', function () {
    assert.equal(isElementExists(parsedSampleData[0], 2), false);
  });

  it('It will return false as the specified index is missing in the input array', function () {
    assert.equal(isElementExists(parsedSampleData[0], 10), false);
  });

  it('It will return false as the specified index is negative', function () {
    assert.equal(isElementExists(parsedSampleData[0], -1), false);
  });

  it('It will return false as there are no parameters passed to the function', function () {
    assert.equal(isElementExists(), false);
  });
})


/**
 * @function getStringMatchResult
 */
describe('Check if the pattern is present inside the input string', function () {

  /** Positive Test Cases */
  it('It will return true as pattern is present in the input string', function () {
    assert.equal(getStringMatchResult('10TotalRevenue10', 'Total'), true);
  });

  it('It will return true as pattern(number) is present in the input (number)', function () {
    assert.equal(getStringMatchResult(10393, 039), true)
  });

  /** Negative Test Cases */
  it('It will return false as the the pattern is not missing in the input string', function () {
    assert.equal(getStringMatchResult('Total Revenue', 'GST Value'), false);
  });

  it('It will return false as no parameters are passed in the function', function () {
    assert.equal(getStringMatchResult(), false);
  });
})


/**
 * @function checkElementExists
 */
describe('checking if the pattern is present in the input array', function () {

  /** Positive test Cases */

  it('It should return True as pattern is present in the input array at specified index', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[0], pattern: 'Total', index: 0 }), true)
  });

  it('It should return True as pattern is present as sub text in the input array at specified index', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[1], pattern: '10Total10', index: 0 }), true)
  });

  /** Negative test Cases  */

  it('It should return False as pattern is missing in the input array at specified index', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[1], pattern: 'RevenueTotal', index: 0 }), false)
  });

  it('It should return False as input array is empty', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[2], pattern: 'Total', index: 0 }), false)
  });

  it('It should return False as no parameters are passed to the function', function () {
    assert.equal(checkElementExists({}), false)
  });

  it('It should return False as specified index is not present in the input array', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[0], pattern: 'Total', index: 6 }), false)
  });
  it('it should return False as specified index is negative', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[0], pattern: 'Total', index: -1 }), false)
  });

  it('It should return False as pattern is present in input array but not at the specified index', function () {
    assert.equal(checkElementExists({ element: parsedSampleData[0], pattern: 'Total', index: 1 }), false)
  });
})


/**
 * @function splitValue
 */
describe('Splitting the whole string at the input pattern', function () {

  /** Positive Test Cases */
  it('It will return object with value at index1 after spliting the pattern', function () {
    assert.deepEqual(splitValue('Total10', 'Total'), ['', '10']);
  });

  it('It will return object with value at index1 after spliting the pattern', function () {
    assert.deepEqual(splitValue('TotalRevenue10', 'Total'), ['', 'Revenue10']);
  });

  it('It will return object with empty value at index1 after spliting as pattern and string are same', function () {
    assert.deepEqual(splitValue('Total', 'Total'), ['', '']);
  });

  it('It will return object with whole string at index1 as pattern is missing', function () {
    assert.deepEqual(splitValue('Total', 'TotalRevenue'), ['Total']);
  });

  it('It will return object with empty string at index1 as input string is empty', function () {
    assert.deepEqual(splitValue('', 'TotalRevenue'), ['']);
  });

  it('It will return object with each character at different index as splitting pattern is null', function () {
    assert.deepEqual(splitValue('Total', ''), ['T', 'o', 't', 'a', 'l']);
  });

  it('It will return empty object as no parameters are passed', function () {
    assert.deepEqual(splitValue(), ['']);
  });
})

/**
 * @function fetchITRFormType
 */

describe('Validating the ITR type fetched from the parsed data(input array) ', function () {

  /** Positive Test cases */
  it('It should return true as the input array passed is valid', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[0]), { isValidITRType: true, itrType: 'ITR-5' })
  });

  /** Negative Test cases */
  it('It should return false as input array passed is invalid ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[1][0]), { isValidITRType: false })
  });

  it('It should return false as input array is empty ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[1]), { isValidITRType: false })
  });
})

/** 
 * @function extractAssessmentYear 
 */
describe('validating the year extracted from the PDF(parsed data)', function () {

  /** Positive test cases */
  it('It should return true as year extracted from the input array is valid', function () {
    assert.deepEqual(extractAssessmentYear({ element: parsedSampleData[6], pattern: 'Assessment Year : ', index: 1 }), {
      isValidAssessmentYear: true, assessmentYear: '2019-20',
      "year": [
        2019, 2020]
    })
  });

  /** Negative test cases */
  it('It should return false as pattern is missing in input array', function () {
    assert.equal(extractAssessmentYear({ element: parsedSampleData[7], pattern: 'Assessment Year : ' }), false)
  });

  it('It should return false as pattern is present but year is missing or invalid', function () {
    assert.deepEqual(extractAssessmentYear({ element: parsedSampleData[8], pattern: 'Assessment Year : ' }), { isValidAssessmentYear: false })
  });

  it('It should return false as parameters are not passed to the function', function () {
    assert.equal(extractAssessmentYear({}), false)
  });
})


/**
 * @function fetchDocumentType
 */

describe('Validating the ITR type from the itrInfoSampleData object', function () {

  /** Positive test cases */
  it('It should return ITR_7_2019_20 as the input object has valid data', function () {
    assert.equal(fetchDocumentType(itrInfoSampleData[2]), 'ITR_7_2019_20')
  });

  it('It should return ITR7_201920 as the input object has valid data', function () {
    assert.equal(fetchDocumentType(itrInfoSampleData[3]), 'ITR7_201920')
  });

  /** Negative test case */

  it('It should return _ as the input object is empty', function () {
    assert.equal(fetchDocumentType(itrInfoSampleData[4]), '_')
  });
})

/** 
 * @function replaceAllOccurances
 */

describe('Replacing all the occurances of search string and replacing it by other string)', function () {

  /** Positive test cases */
  it('It should return Total GST as GST is replaced by Revenue ', function () {
    assert.equal(replaceAllOccurances('Total Revenue', 'Revenue', 'GST'), 'Total GST')
  });

  it('It should return Total GST as GST is replaced by Value ', function () {
    assert.equal(replaceAllOccurances('Total Value!', 'Value', 'GST'), 'Total GST!')
  });

  it('It should return 1900 replacing 6 by 9 ', function () {
    assert.equal(replaceAllOccurances(1600, 6, 9), 1900)
  });

  /** Negative Test Cases */

  it('It should return Total Revenue as it is as search string is missing in input string ', function () {
    assert.equal(replaceAllOccurances('Total Revenue', 'Value', 'GST'), 'Total Revenue')
  });

  it('It should return Total Revenue as it is as search string is integer  ', function () {
    assert.equal(replaceAllOccurances('Total Revenue', 100, 'GST'), 'Total Revenue')
  });

  it('It should return GST as search string is converted into integer and then replaced with the input string', function () {
    assert.equal(replaceAllOccurances(100, '100', 'GST'), 'GST')
  });
})


/**
 * @function getLength
 */
describe('Checking the obtained length of object', function () {

  /** Positive test cases */
  it('It should return length of string as 4 as string is "Hello" ', function () {
    assert.equal(getLength('Hello'), '4')
  });

  it('It should return length of string as 4 as arrat is of length 4 ', function () {
    assert.equal(getLength(['Total', 'Revenue', '04', '00', '66']), '4')
  });

  /** Negative test cases */
  it('It should return 0 as input is not a string or an array', function () {
    assert.equal(getLength(96845), '0')
  });
})

/** 
 * @function getITRErrorInfo
 */

describe('Checking the error message received', function () {

  /** Positive test cases */
  it('It will return an object with message Hello', function () {
    assert.deepEqual(getITRErrorInfo({ message: 'Hello' }), { isValidITRInfo: false, message: 'Hello', result: "" })
  });

  it('It will return an object with message 1064', function () {
    assert.deepEqual(getITRErrorInfo({ message: 1064 }), { isValidITRInfo: false, message: 1064, result: "" })
  });

  it('It will return an object with obejct as message as object is passed', function () {
    assert.deepEqual(getITRErrorInfo({ message: { object: 'Hello' } }), { isValidITRInfo: false, message: { object: 'Hello' }, result: "" })
  });
})

/**
 * @function fetchITRFormType
 */

describe('Validating whether the form type fethced from parsed data', function () {

  /** Positive test cases */
  it('It will return an object with itrType "ITR-5" ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[0]), { isValidITRType: true, itrType: 'ITR-5' });
  });

  /** Negative test cases */

  it('It will return an object with isValidITRType false inside object as ITR type is missing in the parsed data ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[1]), { isValidITRType: false });
  });

  it('It will return an object with isValidITRType false inside object as parsed data is having invalid data ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[2]), { isValidITRType: false });
  });

  it('It will return an object with isValidITRType false inside object as parsed data is empty ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[3]), { isValidITRType: false });
  });

  it('It will return an object with isValidITRType false inside object as parsed data is invalid ', function () {
    assert.deepEqual(fetchITRFormType(itrFormTypeData[4]), { isValidITRType: false });
  });

})

/** 
 * @function isTrue
 */

describe('Checking the value is true or false', function () {

  /** Positive test cases */
  it('It will true if the we passed params as true', function () {
    assert.equal(isTrue(true), true)
  });

  /** Negative cases */
  it('If any number values is passed it will return false', function () {
    assert.equal(isTrue(12), false)
  });

  it('If no params is passed it return false', function () {
    assert.equal(isTrue(), false)
  });

  it('If empty array is passed it return false', function () {
    assert.equal(isTrue([]), false)
  });

  it('If empty object is passed it return false', function () {
    assert.equal(isTrue({}), false)
  });

  it('It will return false if anu string values are passed', function () {
    assert.equal(isTrue('true'), false)
  });
})


/** 
 * @function isValidArray
 */

describe('Checking if the values present in the array is valid', function () {

  /** Positive test cases */
  it('It will return true if array have entire true values', function () {
    assert.equal(isArrayValid([true, true, true], isTrue), true)
  });

  it('It will return false if no conditional methods were passed', function () {
    assert.equal(isArrayValid([true, true]), false)
  });

  it('It will return false if empty array is passed', function () {
    assert.equal(isArrayValid([]), false)
  });

  it('It will return false if empty object is passed', function () {
    assert.equal(isArrayValid({}), false)
  });
  
  it('It will return false if any value in the array contain false', function () {
    assert.equal(isArrayValid([true, false], isTrue), false)
  });

  it('It will return false if strings are passed', function () {
    assert.equal(isArrayValid('Strings', isTrue), false)
  });
})

/** 
 * @function isValidArray
 */

describe('Checking if function returns valid current and previous assessment years', function () {

  /** Positive test cases */
  it('It will return current and previous year, by default current is taken for calculation', function () {
    assert.deepEqual(getCurrentAndPreviousAssessmentYear(), { currentYear: 2020, nextYear: 2021 })
  });

  it('It will return current and previous year, when a valid date is passed to this function', function () {
    assert.deepEqual(getCurrentAndPreviousAssessmentYear(new Date('2018-01-05')), {
      "currentYear": 2017, "nextYear": 2018
    })
  });

  it('It will return current and previous year by default zero, when invalid date is passed', function () {
    assert.deepEqual(getCurrentAndPreviousAssessmentYear('2018-01-05'), {
      "currentYear": 0, "nextYear": 0
    })
  });

})

/** 
 * @function isValidAssessmentYear
 */

describe('Checking whether the assessment years are valid', function () {

  /** Positive test cases */
  /** Current assessment years */
  it('It will return true, if valid assessment years passed', function () {
    assert.equal(isValidAssessmentYear([2020, 2021]), true)
  });

  /** Previous year assessment years */
  it('It will return true, if valid previous assessment years are passed', function () {
    assert.equal(isValidAssessmentYear([2019, 2020]), true)
  });

  /** Previous year assessment years */
  it('It will return true, if valid previous assessment years are passed', function () {
    assert.equal(isValidAssessmentYear([2018, 2019]), true)
  });

  /** Negative cases...*/
  it('It will return false, if incorrect years are passed', function () {
    assert.equal(isValidAssessmentYear([2020, 2019]), false)
  });

  it('It will return false, if empty years are passed', function () {
    assert.equal(isValidAssessmentYear([0, 0]), false)
  });

  it('It will return false, if invalid years are passed', function () {
    assert.equal(isValidAssessmentYear(['', '']), false)
  });

  it('It will return false, if the assessment years or not passed', function () {
    assert.equal(isValidAssessmentYear([]), false)
  });

})
