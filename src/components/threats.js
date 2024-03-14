const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * IP threats function
 *
 * @param {string} ip - The IP address to retrieve the intelligence threat data
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Threats("1.1.1.1", { dev: true, format: "json" });
 *
 */
const Threats = (ip, data) => {
  const { dev, format } = data;

  // Check if the IP is valid
  if (ip.length <= 6) {
    program.error("Invalid IP address.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`ip=${ip}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("threats", queryParams)
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

module.exports = Threats;
