const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * IBAN validation function
 *
 * @param {string} iban - The IBAN to validate
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * IBAN("DE89370400440532013000", { dev: true, format: "json" });
 *
 */
const IBAN = (iban, data) => {
  const { dev, format } = data;

  // Check if the IBAN is valid
  if (iban.length <= 10) {
    program.error("Invalid IBAN.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`iban=${iban}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("validateIBAN", queryParams)
    .then((data) => {
      if (data.status === "success") {
        if (format === "json") {
          console.log(data.data);
        } else {
          formatJsonForPrint(data.data);
        }
      } else {
        program.error(data.description);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = IBAN;
