const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * ASN lookup function
 *
 * @param {string} asn - The ASN to lookup
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * ASN("AS7922", { dev: true, format: "json" });
 *
 */
const ASN = (asn, data) => {
  const { dev, format } = data;

  // Check if the ASN is valid
  if (asn.length <= 2) {
    program.error("Invalid ASN.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`asn=${asn}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("ASNLookup", queryParams)
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

module.exports = ASN;
