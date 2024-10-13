/* eslint-disable comma-dangle */
/* eslint-disable no-async-promise-executor */
const fs = require("fs");
const { baseUri, yellowColor, defaultColor } = require("./variables");
const { program } = require("commander");
const { default: axios } = require("axios");

const getToken = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("/tmp/.greip-storage", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  })
    .then((data) => {
      return data;
    })
    .catch(() => {
      return "";
    });
};

const setToken = (token) => {
  token = token?.toString() || "";
  fs.writeFile("/tmp/.greip-storage", token, function (err) {
    if (err) throw err;
  });
};

const sendGetRequest = (endpoint, params = "", retries = 3) => {
  return new Promise(async (resolve, reject) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const token = await getToken();
        const response = await axios.get(`${baseUri}/${endpoint}${params}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });

        // Resolve with the response data
        resolve(response.data);
        return; // Exit the function after successful resolution
      } catch (error) {
        if (attempt === retries) {
          // Reject the promise after final attempt
          reject(new Error(`Final fetch error after ${retries} attempts.`));
        } else {
          console.error(`Retrying... (${attempt}/${retries})`);
        }
      }
    }
  });
};

const formatJsonForPrint = (jsonObject) => {
  if (jsonObject === null || jsonObject === undefined) {
    program.error("No data to display.");
    return;
  }
  Object.keys(jsonObject).forEach((key) => {
    if (jsonObject[key] && typeof jsonObject[key] === "object") {
      console.log(`ー ${yellowColor}${key}:${defaultColor}`);
      Object.entries(jsonObject[key]).forEach(([innerKey, innerValue]) => {
        if (innerValue && typeof innerValue === "object") {
          console.log(`  ー ${yellowColor}${innerKey}:${defaultColor}`);
          Object.entries(innerValue).forEach(
            ([innerInnerKey, innerInnerValue]) => {
              if (innerInnerValue && typeof innerInnerValue === "object") {
                console.log(
                  `    ー ${yellowColor}${innerInnerKey}:${defaultColor}`
                );
                Object.entries(innerInnerValue).forEach(
                  ([innerInnerInnerKey, innerInnerInnerValue]) => {
                    if (innerInnerInnerValue === "") {
                      innerInnerInnerValue = null;
                    }
                    console.log(
                      `      ー ${yellowColor}${innerInnerInnerKey}:${defaultColor} ${innerInnerInnerValue}`
                    );
                  }
                );
              } else {
                if (innerInnerValue === "") {
                  innerInnerValue = null;
                }
                console.log(
                  `    ー ${yellowColor}${innerInnerKey}:${defaultColor} ${innerInnerValue}`
                );
              }
            }
          );
        } else {
          if (innerValue === "") {
            innerValue = null;
          }
          console.log(
            `  ー ${yellowColor}${innerKey}:${defaultColor} ${innerValue}`
          );
        }
      });
    } else {
      if (jsonObject[key] === "") {
        jsonObject[key] = null;
      }
      console.log(`ー ${yellowColor}${key}:${defaultColor} ${jsonObject[key]}`);
    }
  });
};

module.exports = {
  getToken,
  setToken,
  sendGetRequest,
  formatJsonForPrint,
};
