const {
  sendGetRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

const IBAN = (iban, data) => {
  const { dev, format } = data;

  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push("source=CLI");
  queryParams = "?" + queryParams.join("&");

  sendGetRequest(`lookup/iban/${encodeURIComponent(iban)}`, queryParams)
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

module.exports = IBAN;
