const { sendGetRequest, formatJsonForPrint } = require("../../lib/utils");
const { program } = require("commander");

/**
 * Profanity check function
 *
 * @param {string} text - The text to check for profanity
 * @param {object} data - The options object
 * @param {boolean} data.dev - Return a fake response for development purposes
 * @param {string} data.format - The format of the response
 * @param {boolean} data.scoreOnly - Display only the profanity score
 * @param {boolean} data.listProfanity - Display the list of profane words
 *
 * @returns {void}
 *
 * @example
 * Profanity("The quick brown fox jumps over the lazy dog", { dev: true, format: "json" });
 *
 */
const Profanity = (text, data) => {
  const { dev, format, scoreOnly, listProfanity } = data;

  // Check if the text is valid
  if (text.length < 2) {
    program.error("Invalid text.");
  }

  // Preparing request query params
  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (scoreOnly === true) {
    queryParams.push("scoreOnly=yes");
  }
  if (listProfanity === true) {
    queryParams.push("listBadWords=yes");
  }
  queryParams.push(`text=${text}`);
  queryParams = "?" + queryParams.join("&");

  // Sending the request
  sendGetRequest("badWords", queryParams)
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

module.exports = Profanity;
