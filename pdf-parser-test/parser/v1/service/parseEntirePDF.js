const https = require("https");

const pdfreader = require("pdfreader");

const { logger } = require('../../../service/config/logger');

const fsPromises = require('fs').promises

const FACING_ISSUE_WHILE_PARSING_ENTIRE_PDF = 'Facing issue, while parsing entire PDF document!';

async function bufferize(url) {
  var hn = url.substring(url.search("//") + 2);
  hn = hn.substring(0, hn.search("/"));
  var pt = url.substring(url.search("//") + 2);
  pt = pt.substring(pt.search("/"));
  const options = { hostname: hn, port: 443, path: pt, method: "GET" };
  return new Promise(function (resolve, reject) {
    var buff = new Buffer.alloc(0);
    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        buff = Buffer.concat([buff, d]);
      });
      res.on("end", () => {
        resolve(buff);
      });
    });
    req.on("error", (e) => {
      console.error("https request error: " + e);
    });
    req.end();
  });
}

/*
if second param is set then a space ' ' inserted whenever text
chunks are separated by more than xwidth
this helps in situations where words appear separated but
this is because of x coords (there are no spaces between words)

each page is a different array element
*/
async function readlines(buffer, xwidth) {
  return new Promise((resolve, reject) => {
    var pdftxt = new Array();
    var pg = 0;
    new pdfreader.PdfReader().parseBuffer(buffer, function (err, item) {
      if (err) logger.error("pdf reader error: " + err);
      else if (!item) {
        pdftxt.forEach(function (a, idx) {
          pdftxt[idx].forEach(function (v, i) {
            pdftxt[idx][i].splice(1, 2);
          });
        });
        resolve(pdftxt);
      } else if (item && item.page) {
        pg = item.page - 1;
        pdftxt[pg] = [];
      } else if (item.text) {
        var t = 0;
        var sp = "";
        pdftxt[pg].forEach(function (val, idx) {
          if (val[1] == item.y) {
            if (xwidth && item.x - val[2] > xwidth) {
              sp += " ";
            } else {
              sp = "";
            }
            pdftxt[pg][idx][0] += sp + item.text;
            t = 1;
          }
        });
        if (t == 0) {
          pdftxt[pg].push([item.text, item.y, item.x]);
        }
      }
    });
  });
}

/**
 * @description Function for parsing the entire PDF
 * @name parseEntirePDF
 * @param {String} url 
 * @returns {Array}
 * @todo change in the buffer config for parsing the specific page
 * @todo find way for parsing the selected pages.
 */
const parseEntirePDF = async (url) => {
  try {
    var buffer = await bufferize(url);
    var lines = await readlines(buffer);
    lines = await JSON.parse(JSON.stringify(lines));
    // returns the assessment year for with Acknowledgement number  
    return lines[0][0];
  } catch (err) {
    logger.error(err)
    throw new Error(FACING_ISSUE_WHILE_PARSING_ENTIRE_PDF)
  }
}

/**
 * @description Function for parsing the entire PDF
 * @name parseEntireCertificate
 * @param {String} url 
 * @returns {Array}
 */
const parseEntireCertificate = async (url) => {
  try {
    var buffer = await bufferize(url);
    var lines = await readlines(buffer);
    lines = await JSON.parse(JSON.stringify(lines));
    return lines;
  } catch (err) {
    logger.error(err)
    throw new Error(FACING_ISSUE_WHILE_PARSING_ENTIRE_PDF)
  }
}

/**
 * @function fileToBase64
 * @description This function is read file To Base64 format
 * @param {String} filePath The Document path
 */
const fileToBase64 = (filePath) => fsPromises.readFile(filePath, { encoding: 'base64' })

/**
 * @function parseEntirePdfInFile
 * @description This function is Copy of parseEntirePDF to read System files
 * @param {String} docPath The Document path
 */
const parseEntirePdfInFile = async (docPath) => {
  try {
    const buffer = await fsPromises.readFile(docPath)
    var lines = await readlines(buffer)
    lines = await JSON.parse(JSON.stringify(lines))
    // returns the assessment year for with Acknowledgement number
    return lines[0][0]
  } catch (err) {
    logger.error(err)
    throw new Error(FACING_ISSUE_WHILE_PARSING_ENTIRE_PDF)
  }
}

module.exports = { parseEntirePDF, parseEntireCertificate, bufferize, parseEntirePdfInFile, fileToBase64 }
