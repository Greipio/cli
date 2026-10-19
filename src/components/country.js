const {
  sendGetRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

const Country = (country, data) => {
  const { dev, modules, format } = data;

  if (country.length !== 2) {
    program.error(
      "Invalid country code. Please use ISO 3166-1 alpha-2 format."
    );
  }

  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (typeof modules !== "undefined") {
    queryParams.push(`params=${modules}`);
  }
  queryParams.push("source=CLI");
  queryParams = "?" + queryParams.join("&");

  sendGetRequest(
    `lookup/countries/${encodeURIComponent(country.toUpperCase())}`,
    queryParams
  )
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

module.exports = Country;
