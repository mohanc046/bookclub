/** Express router providing pdf-parsed related routes
 * @module PDF-parse/routes
 */

/**
 * @namespace PDFparse
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const router = require("express").Router();

const controllerMethods = require("../controller/index");

/**
 * Route for handling PDF-parse
 * @name /parse/itr
 * @function
 * @memberof module:pdf-parse/routes~itrParseRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/parse/itr", controllerMethods.getITRInfo);

router.post("/parse/gstCertificate", controllerMethods.parseGstCertificate);

/**
 * Route for handling PDF-parse GSTR type
 * @name /parse/gstr
 * @function
 * @memberof module:pdf-parse/routes~gstrParseRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/parse/gstr', controllerMethods.gstrParse)

/**
 * Route for handling XML-parse ITR type
 * @name /parse/itr/xml
 * @function
 * @memberof module:pdf-parse/routes~itrParseRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/parse/itr/xml', controllerMethods.itrXmlParse)

module.exports = router;