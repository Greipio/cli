const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * Country lookup function
 *
 * @param {string} country - The country code to lookup
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.modules - The modules to use for the lookup
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Country("45717360", { dev: true, format: "json" });
 *
 */
const Country = (country, data) => {
  const { dev, modules, format } = data;

  // Check if the country code is valid
  if (country.length !== 2) {
    program.error(
      "Invalid country code. Please use ISO 3166-1 alpha-2 format."
    );
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (typeof modules !== "undefined") {
    queryParams.push(`params=${modules}`);
  }
  queryParams.push(`CountryCode=${country}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("Country", queryParams)
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

module.exports = Country;
