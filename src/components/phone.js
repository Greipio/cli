const {
  sendGetRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

const Phone = (phone, country, data) => {
  const { dev, format } = data;

  if (country.length !== 2) {
    program.error(
      "Invalid country code. Please use ISO 3166-1 alpha-2 format."
    );
  }

  if (phone.length <= 6) {
    program.error("Invalid phone number.");
  }

  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  queryParams.push(`country_code=${country}`);
  queryParams.push("source=CLI");
  queryParams = "?" + queryParams.join("&");

  sendGetRequest(`score/phone/${encodeURIComponent(phone)}`, queryParams)
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

module.exports = Phone;
