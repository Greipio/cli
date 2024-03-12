const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * IP lookup function
 *
 * @param {string} ip - The IP to lookup
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.modules - The modules to use for validation
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Lookup("1.1.1.1", { dev: true, format: "json" });
 *
 */
const Lookup = (ip, data) => {
  const { dev, modules, format } = data;

  // Check if the IP is valid
  if (ip.length <= 6) {
    program.error("Invalid IP address.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (typeof modules !== "undefined") {
    queryParams.push(`params=${modules}`);
  }
  queryParams.push(`ip=${ip}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("IPLookup", queryParams)
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

module.exports = Lookup;
