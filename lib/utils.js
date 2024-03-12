/* eslint-disable comma-dangle */
/* eslint-disable no-async-promise-executor */
const fs = require("fs");
const { baseUri, yellowColor, defaultColor } = require("./variables");
const { program } = require("commander");

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

const sendGetRequest = async (endpoint, params = "") => {
  return new Promise(async (resolve) => {
    const token = await getToken();
    const response = await fetch(baseUri + "/" + endpoint + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      program.error("Request failed with status code: " + response.status);
    } else {
      resolve(response.json());
    }
  });
};

const sendPostRequest = (endpiont, payload) => {
  return new Promise(async (resolve) => {
    const token = await getToken();
    const response = await fetch(baseUri + "/" + endpiont, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      program.error("Request failed with status code: " + response.status);
    } else {
      resolve(response.json());
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
  sendPostRequest,
  formatJsonForPrint,
};
