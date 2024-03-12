const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * Email validation function
 *
 * @param {string} email - The email to validate
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 *
 * @returns {void}
 *
 * @example
 * Email("name@domain.com", { dev: true, format: "json" });
 *
 */
const Email = (email, data) => {
  const { dev, format } = data;

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`email=${email}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("validateEmail", queryParams)
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

module.exports = Email;
