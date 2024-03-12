const { getToken } = require("../lib/utils");
const { defaultColor, purpleColor } = require("../lib/variables");
const { program } = require("commander");

/**
 * Token validation function
 *
 * @param {function} callback - The callback function
 *
 * @returns {void}
 *
 * @example
 * Token(() => {});
 *
 */
const Token = async (callback = () => {}) => {
  const token = await getToken();

  // Check if the token is valid/exists
  if (!token) {
    program.error(
      `Please use the 'login' command to authenticate before using the CLI.\n\n${purpleColor}$ greip login\n${defaultColor}`
    );
  } else {
    // Continue with the callback
    callback();
  }
};

module.exports = Token;
