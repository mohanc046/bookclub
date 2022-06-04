
/**
 * @description Function which returns extracted values from the patterns it gots matched.
 * @name extractValueFromPattern
 * @param {Array} element 
 * @param {String} text 
 * @param {Number} index 
 * @param {Number} resultIndex
 * @returns {Number}
 */
const extractValueFromPattern = (element, text, index = 0, resultIndex) => {
  if (text === '10Total10' || text === 'Total expenses' || text === '5Total capital expenses (1 + 2 + 3 + 4)5') {
    result = extractValueFromText(element, text, index)
    return result
  }
  else if (text === '3Compensation to employees') {
    result = extractValueFromSliceIndex(element, resultIndex)
    return result
  }
  else {
    result = extractValueFromIndex(element, resultIndex)
    return result
  }
}

/**
 * @description Function which returns extracted values from the text after matching.
 * @name extractValueFromText
 * @param {Array} element 
 * @param {String} text 
 * @param {Number} index 
 * @returns {Number}
 */
const extractValueFromText = (element, text, index = 0) => {
  if (element && text) {
    if (index > element.length || index < 0 || element[index] === '' || element[index].includes(text) === false) { return 0 }
    const result = element[index].split(text);
    if (result && result[1] === '') { return 0 }
    return result && result[1];
  } else { return 0 }
}

/**
 * @description Function which returns extracted values from the index after the pattern is matched.
 * @name extractValueFromIndex
 * @param {Array} element 
 * @param {Number} resultIndex
 * @returns {Number}
 */
const extractValueFromIndex = (element, resultIndex) => {
  if (element && resultIndex) {
    const number = element.length
    if (number < resultIndex || resultIndex < 0) { return 0 }
    const result = element[resultIndex]
    if (result === '') { return 0 }
    return result
  } else { return 0 }
}

/**
 * @description Function which returns extracted values from the index after removing unwanted value and the pattern is matched.
 * @name extractValueFromSliceIndex
 * @param {Array} element 
 * @param {Number} resultIndex
 * @returns {Number}
 */
const extractValueFromSliceIndex = (element, resultIndex) => {
  if (element && resultIndex) {
    const number = element.length
    if (number < resultIndex || resultIndex < 0) { return 0 }
    const result = element[resultIndex].slice(1)
    if (result === '') { return 0 }
    return result
  } else { return 0 }
}

module.exports = { extractValueFromText, extractValueFromIndex, extractValueFromPattern, extractValueFromSliceIndex }