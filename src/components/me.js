const {
  sendGetRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

const Me = (data) => {
  const { ip, dev, modules, format } = data;

  let queryParams = [];
  if (dev === true) {
    queryParams.push("mode=test");
  }
  if (typeof modules !== "undefined") {
    queryParams.push(`params=${modules}`);
  }
  queryParams.push("source=CLI");
  queryParams = "?" + queryParams.join("&");

  const endpoint = ip === true ? "ip" : "geo/ip";

  sendGetRequest(endpoint, queryParams)
    .then((data) => {
      if (isApiSuccess(data)) {
        if (ip === true) {
          console.log(data.data);
        } else if (format === "json") {
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

module.exports = Me;
