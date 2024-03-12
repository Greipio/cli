const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * Get the IP address or the Geolocation information of the current user
 *
 * @param {object} data - The options object
 * @param {boolean} data.ip - Display only the IP address
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.modules - The modules to use for validation
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Me({ ip: true, dev: true, format: "json" });
 *
 */
const Me = (data) => {
  const { ip, dev, modules, format } = data;

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (typeof modules !== "undefined") {
    queryParams.push(`params=${modules}`);
  }
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest(ip === true ? "ip" : "GeoIP", queryParams)
    .then((data) => {
      if (data.status === "success") {
        if (ip === true) {
          console.log(data.data);
        } else {
          if (format === "json") {
            console.log(data.data);
          } else {
            formatJsonForPrint(data.data);
          }
        }
      } else {
        program.error(data.description);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = Me;
