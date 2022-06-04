const { StatusCodes } = require("http-status-codes");

const pdf2base64 = require('pdf-to-base64');

const _ = require('lodash')

const { parseEntirePDF, parseEntireCertificate, bufferize } = require('../service/parseEntirePDF');

const pdf_table_json = require("../service/pdfToTableJson");

const { logger, consoleLogger } = require('../../../service/config/logger')

const {
	base64ToUint8Array, extractAssessmentYear, fetchDocumentType,
	mergePDFTables, fetchFormattedITRObject,
	getITRErrorInfo, checkITRFormType,
	isValidAssessmentYear, fetchAssessmentDates, getITRWarningMessage,
	isValidITRDocument,
	generateCustomErrorResponse
} = require('../utils/index');

const { pdfParser_ITR_3_2018_19, xmlParserItr3For201819 } = require('../ITR/form-3/2018_19');

const { pdfParser_ITR_3_2019_20, xmlParserItr3For201920 } = require('../ITR/form-3/2019_20');

const { pdfParser_ITR_5_2018_19 } = require('../ITR/form-5/2018_19');

const { pdfParser_ITR_5_2019_20 } = require('../ITR/form-5/2019_20');

const { pdfParser_ITR_4_2019_20 } = require('../ITR/form-4/2019_20');

const { gstMainParser } = require("../GSTR/form-3b/2020_21");

const { defaultValues } = require('../../../service/enums/index');

const { xmlToJsonParser } = require("../../../service/xml_handler");

const { gstrErrorMessages } = require('./enums');
const { pdfParser_ITR_4_2018_19 } = require("../ITR/form-4/2018_19");
const {
	ITR_3_2018_19, ITR_3_2019_20, ITR_3_2020_21, ITR_5_2019_20,
	ITR_5_2018_19, ITR_5_2020_21, ITR_4_2018_19, ITR_4_2019_20,
	ASSESSMENT_YEAR_PATTER, ITR_4_2020_21
} = defaultValues;

const DEFAULT_VALUE = 0;

const DEFAULT_INDEX_POSITION_ZERO = 0;

const FACING_ISSUE_TRY_AFTER_SOME_TIME = 'Something went wrong, please try after sometime!';

const SUCCESSFULL = "ITR processed successfully";

const FACING_ISSUE_WHILE_TABLEDATA_TO_JSON = "Facing issue while converting tableData to JSON"

const FACING_ISSUE_WHILE_PDF_TO_BASE64 = `Facing issue while converting PDF to Base64`

const DEFAULT_PAN = "#ASDHEHBFD#%!";

const INVALID_DOCUMENT_UPLOADED = `Invalid documents uploaded, please provide valid ITR Files`;

const MISMATCH_DOCUMENT_UPLOADED = `PAN Number is mismatched: Please provide ITR files of same PAN number`

/**
 * @description Function for converting the base64 data to the JSON object
 * @name tableDataToJson
 * @param {String} base64 
 * @returns {Object}
 */
const tableDataToJson = async (base64) => {
	try {
		const uintArray = base64ToUint8Array(base64);
		const response = await pdf_table_json(uintArray, false);
		return { parsedInfo: response };
	}
	catch (err) {
		logger.error(`Issue with parsing base64 to unit8Array and then to table data with error : ${err}`);
		throw new Error(FACING_ISSUE_WHILE_TABLEDATA_TO_JSON)
	}
}

/**
 * @description Function for converting the PDF to base64 data with help of S3 link
 * @name pdftoBase64
 * @param {String} files 
 * @returns {Object}
 */
const pdftoBase64 = async (files) => {
	try {
		const result = await pdf2base64(files);
		return { base64Data: result };
	}
	catch (err) {
		logger.error(`Issue with parsing ITR form - ${files} with error : ${err}`);
		throw new Error(FACING_ISSUE_WHILE_PDF_TO_BASE64)
	}
}

/**
 * @description Function for parsing the ITR JSON Table data and return object.
 * @name fetchInformationFromPDF
 * @param {String} type 
 * @param {Array} parsedInfo 
 * @returns {Object}
 */
const fetchInformationFromPDF = (type, parsedInfo) => {
	// variable for holding the parsed information of the ITR form...
	let itrInfo = {};
	switch (type) {

		case ITR_3_2018_19: itrInfo = pdfParser_ITR_3_2018_19(parsedInfo);
			break;

		case ITR_3_2019_20: itrInfo = pdfParser_ITR_3_2019_20(parsedInfo);
			break;

		case ITR_3_2020_21: itrInfo = pdfParser_ITR_3_2019_20(parsedInfo);
			break;

		case ITR_4_2018_19: itrInfo = pdfParser_ITR_4_2018_19(parsedInfo);
			break;

		case ITR_4_2019_20: itrInfo = pdfParser_ITR_4_2019_20(parsedInfo);
			break;

		case ITR_4_2020_21: itrInfo = pdfParser_ITR_4_2019_20(parsedInfo);
			break;

		case ITR_5_2018_19: itrInfo = pdfParser_ITR_5_2018_19(parsedInfo);
			break;

		case ITR_5_2019_20: itrInfo = pdfParser_ITR_5_2019_20(parsedInfo);
			break;

		case ITR_5_2020_21: itrInfo = pdfParser_ITR_5_2019_20(parsedInfo);
			break;

		default: itrInfo = {
			isValidITRInfo: false,
			message: INVALID_DOCUMENT_UPLOADED
		}
	}

	return itrInfo;
}

module.exports.getITRInfo = async (req, res) => {

	let { files = [], panNumber = DEFAULT_VALUE } = req.body;

	try {
		// throwing warning message if the request body is invalid
		if (_.isEmpty(files)) return res.status(StatusCodes.BAD_REQUEST).json({ status: false });

		// storing list of ITR parsed result
		let finalResult = [];

		// holding the assessment year of different files
		let fileAssessmentYear = [];

		// for holding the warning message while parsing.
		let messageQueue = [];

		// getting each S3 link and parsing the individual files and storing it in single array.
		for (let item in files) {
			let {
				isValidITRInfo = false,
				result = [],
				assessmentYear = [DEFAULT_VALUE, DEFAULT_VALUE],
				message = ""
			} = await fetchITRInfo(files[`${item}`], panNumber);

			if (isValidITRInfo) {
				finalResult[`${item}`] = result
				fileAssessmentYear.push(assessmentYear[DEFAULT_INDEX_POSITION_ZERO])
			}
			else {
				messageQueue.push(message) // stroring warning message in queue
				finalResult[`${item}`] = { isValidITRInfo, message }
				fileAssessmentYear.push(DEFAULT_VALUE) //  if invalid default asessment year will be zero
			}
		}

		// ordering the response based on the assessment year...
		let updatedFinalResult = _.orderBy(finalResult, [`documentAssessmentYear`], [`asc`])

		// fetching the assessment year of both the files...
		let assessmentDates = fetchAssessmentDates(fileAssessmentYear);

		// sorting assessment year...
		let orderedAssessmentYear = _.sortBy(assessmentDates)

		// checking is assessment year is valid...
		let isAssessmentYearValid = isValidAssessmentYear(orderedAssessmentYear);

		// check for PAN validation between documents...
		let isValidDocument = isValidITRDocument(finalResult, panNumber);

		// pushing the validation error...
		isValidDocument === false && messageQueue.push(MISMATCH_DOCUMENT_UPLOADED);

		consoleLogger.info(`Is valid assessment year : ${isAssessmentYearValid}`);

		return res.status(StatusCodes.OK).json({
			message: _.isEmpty(messageQueue) ? isAssessmentYearValid ? [SUCCESSFULL] : [getITRWarningMessage()] : messageQueue,
			result: updatedFinalResult,
			status: isAssessmentYearValid && isValidDocument
		});

	} catch (error) {
		logger.error(`Issue while processing PDF for user ${panNumber} - ${files} with error : ${error}`);
		return res.status(StatusCodes.BAD_REQUEST).json({ message: FACING_ISSUE_TRY_AFTER_SOME_TIME, status: false });
	}

}

module.exports.parseGstCertificate = async (req, res) => {
	try {

		const { gstCertificate } = req.body;

		if (!gstCertificate)
			return res.status(StatusCodes.OK).json({ message: "failed", status: false });

		const result = await parseEntireCertificate(gstCertificate);

		const gstNumber = fetchGSTNofromCerificate(result);

		return res.status(StatusCodes.OK).json({ status: (gstNumber ? true : false), gstNumber });

	} catch (error) {

		return res.status(StatusCodes.BAD_GATEWAY).json({ message: "failed" });

	}
}

function fetchGSTNofromCerificate(result) {
	const gstNumberString = 'Registration Number :';
	let gstNumber = '';
	if (result && result.length) {
		const finalResult = result[0];
		if (finalResult && finalResult.length) {
			for (let index = 0; index < finalResult.length; index++) {
				const element = finalResult[index] && finalResult[index][0];
				if (element && element.includes(gstNumberString)) {
					const text = element.trim();
					gstNumber = text.split(gstNumberString)[1];
					gstNumber = gstNumber.trim();
				}
			}
		}
		return gstNumber;
	}
}

/**
 * @description Function for parsing and returning result object of individual PDF...
 * @name fetchITRInfo
 * @param {String} file
 * @returns {Object}
 */
const fetchITRInfo = async (file, panNumber) => {

	// calling the function to get the parsing data 
	let { base64Data = "" } = await pdftoBase64(file);

	let { parsedInfo = {} } = await tableDataToJson(base64Data);

	let { isValidITRType = false, itrType = '' } = checkITRFormType(parsedInfo);

	// checking for valid ITR document uploaded...
	if (isValidITRType === false) return getITRErrorInfo({ message: INVALID_DOCUMENT_UPLOADED })

	// parsing entire PDF for getting the assessment year at the top left from PDF...
	let assessmentYearString = await parseEntirePDF(file);

	// consoleLogger.info(parsedInfo.pageTables[10].tables);

	let {
		isValidAssessmentYear = false,
		assessmentYear = '',
		year = [DEFAULT_VALUE, DEFAULT_VALUE]
	} = extractAssessmentYear({
		element: assessmentYearString,
		pattern: ASSESSMENT_YEAR_PATTER
	});

	// returns if assessment year not present...
	if (isValidAssessmentYear === false) return getITRErrorInfo({ message: getITRWarningMessage() })

	logger.info(`Started parsing ${itrType} - ${panNumber}`);

	// getting document type with itrInfo...
	let documentType = fetchDocumentType({ itrType, assessmentYear });

	logger.info(`Initiating parsing for ${documentType} - ${panNumber}`);

	// concatinating entire tables in the PDF before starting
	const concatedTables = mergePDFTables(parsedInfo);

	// consoleLogger.info(concatedTables);

	// passing the parsed information of PDF to the right function for getting proper result set...
	let { ITR_INFO = {}, message = SUCCESSFULL } = fetchInformationFromPDF(documentType, concatedTables);

	let formattedObject = fetchFormattedITRObject({
		...ITR_INFO,
		itrType,
		assessmentYear,
		documentAssessmentYear: year[DEFAULT_INDEX_POSITION_ZERO],
		message
	});

	logger.info(`Done parsing ${itrType} - ${panNumber}`);

	return { isValidITRInfo: true, result: formattedObject, assessmentYear: year };

}


/**
 * @function gstrParse
 * @description This controller is used to parse and calculate the GSTR info
 * @param {Object} request The request Object
 * @param {Object} response The response Object
 */
module.exports.gstrParse = async (request, response) => {
	try {
		const { files, gstinNumber } = request.body
		const requiredGstrFormatType = 'Form GSTR-3B'
		const requiredNumberOfFiles = 12
		const startIndex = 0
		const gstrParsedDocuments = []

		if (files.length !== requiredNumberOfFiles) {
			logger.error(`GSTR Parse Error: Less than 12 Documents uploaded by user (GSTIN: ${gstinNumber})`)
			return generateCustomErrorResponse(response, gstrErrorMessages.LESS_THAN_12_DOCUMENTS_UPLOADED)
		}

		for (const documentUrl of files) {
			// Get the gstrFormatType from doc

			const gstrFormatType = await parseEntirePDF(documentUrl)

			if (gstrFormatType[startIndex] !== requiredGstrFormatType) {
				logger.error(`GSTR Parse Error: Invalid GSTR Format Type uploaded by user (GSTIN: ${gstinNumber})`)
				return generateCustomErrorResponse(response, gstrErrorMessages.INVALID_DOCUMENT_UPLOADED)
			}

			// Finally parse Tabular Components fully
			const { base64Data = {} } = await pdftoBase64(documentUrl)
			const { parsedInfo = {} } = await tableDataToJson(base64Data)
			gstrParsedDocuments.push(parsedInfo)
		}

		// Remove the null Objects and parse and calculate gstr data
		const { isError, errorMessage, gstData } = gstMainParser(gstrParsedDocuments, gstinNumber)

		if (isError) {
			logger.error(`GSTR Parse Error: ${errorMessage} by user (GSTIN: ${gstinNumber})`)
			return generateCustomErrorResponse(response, errorMessage)
		}

		// Send the Result
		return response.status(StatusCodes.OK).json({ message: [gstrErrorMessages.SUCCESSFUL], status: true, gstData })
	} catch (error) {
		logger.error(`GSTR Parse Error: ${error.message} at ${error.stack}`)
		// Send the error
		return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, message: [gstrErrorMessages.FACING_ISSUE_TRY_AFTER_SOME_TIME] })
	}
}

/**
 * @function getItrTypeAndYear
 * @description This function is used to get the ITR type and Year
 * @param {Object} jsonResponse
 * @returns {Object} ITR year and Type
 */
const getItrTypeAndYear = (jsonResponse) => {
	const { ITR3 } = jsonResponse.ITR
	if (ITR3) {
		return { assessmentYear: ITR3.Form_ITR3.AssessmentYear, formName: ITR3.Form_ITR3.FormName }
	}
	throw new Error('ITR Format not Known')
}

/**
 * @function getParser
 * @description This function is used to get required Parser from type and year
 * @param {Object} jsonResponse
 * @returns {Function} Required Parser
 */
const getParser = ({ assessmentYear, formName }) => {
	switch (formName) {
		case 'ITR-3': {
			switch (assessmentYear) {
				case 2018:
					return xmlParserItr3For201819
				case 2019:
					return xmlParserItr3For201920
				case 2020:
					return xmlParserItr3For201920
				default:
					throw new Error('ITR Assessment Year not known')
			}
		}
		default:
			throw new Error('ITR Form type not known')
	}
}

/**
 * @function itrXmlParse
 * @description This controller is used to parse and calculate the ITR info in XML
 * @param {Object} request The request Object
 * @param {Object} response The response Object
 */
module.exports.itrXmlParse = async (request, response) => {
	const finalResult = []
	try {
		const urls = request.body || []
		for (const eachDocumentUrl of urls) {
			// Getting the Document
			const buffer = await bufferize(`${eachDocumentUrl}`)
			// Convert XML to JSON
			const result = await xmlToJsonParser(buffer.toString())
			// Check for the Format(type, year)
			const itrInfo = getItrTypeAndYear(result)
			// Get the Required Parser
			const xmlParser = getParser(itrInfo)
			// Get the Required itr Data
			const parsedResult = xmlParser(result)
			// Logging the Result and Pushing
			finalResult.push(parsedResult)
		}
		// Sorting the Final Array Result
		finalResult.sort((a, b) => +b.metaData.assessmentYear - +a.metaData.assessmentYear)
		// Send Back the Response
		return response.status(StatusCodes.OK).json({ itrData: finalResult.slice(0, 2) })
	} catch (error) {
		// log the error
		logger.error(`Error Occurred: ${error.message}`)
		// Send the error
		return response
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error, message: error.message, itrData: finalResult })
	}
}
