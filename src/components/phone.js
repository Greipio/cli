const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * Phone validation function
 *
 * @param {string} phone - The phone number to validate
 * @param {string} country - The country code of the phone number (in ISO 3166-1 alpha-2 format)
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Phone("1234567890", "US", { dev: true, format: "json" });
 *
 */
const Phone = (phone, country, data) => {
  const { dev, format } = data;

  // Check if the country code is valid
  if (country.length !== 2) {
    program.error(
      "Invalid country code. Please use ISO 3166-1 alpha-2 format."
    );
  }

  // Check if the phone number is valid
  if (phone.length <= 6) {
    program.error("Invalid phone number.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`phone=${phone}`);
  queryParams.push(`countryCode=${country}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("validatePhone", queryParams)
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

module.exports = Phone;
