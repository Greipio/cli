const {
  sendPostRequest,
  formatJsonForPrint,
  isApiSuccess,
} = require("../../lib/utils");
const { program } = require("commander");

const Profanity = (text, data) => {
  const { dev, format } = data;

  if (text.length < 2) {
    program.error("Invalid text.");
  }

  const body = {
    text,
    source: "CLI",
  };
  if (dev === true) {
    body.mode = "test";
  }
  if (format) {
    body.format = format.toUpperCase();
  }

  sendPostRequest("score/text", body)
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

module.exports = Profanity;
