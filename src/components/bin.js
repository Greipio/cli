const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * BIN lookup function
 *
 * @param {string} bin - The BIN to lookup
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * BIN("45717360", { dev: true, format: "json" });
 *
 */
const BIN = (bin, data) => {
  const { dev, format } = data;

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`bin=${bin}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("BINLookup", queryParams)
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

module.exports = BIN;
