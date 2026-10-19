const {
  sendGetRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

/**
 * IP threats function
 */
const Threats = (ip, data) => {
  const { dev, format } = data;

  if (ip.length <= 6) {
    program.error("Invalid IP address.");
  }

  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push("source=CLI");
  queryParams = "?" + queryParams.join("&");

  sendGetRequest(`score/ip/${encodeURIComponent(ip)}`, queryParams)
    .then((data) => {
      if (isApiSuccess(data)) {
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
