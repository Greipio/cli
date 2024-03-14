#!/usr/bin/env node
/* eslint-disable comma-dangle */

const process = require("process");
const { program, Option } = require("commander");
const Token = require("./src/token");
const { setToken } = require("./lib/utils");
const {
  defaultColor,
  redColor,
  greenColor,
  defaultFormat,
  purpleColor,
  yellowColor,
} = require("./lib/variables");
const Me = require("./src/components/me");
const Lookup = require("./src/components/lookup");
const Threats = require("./src/components/threats");
const Country = require("./src/components/country");
const ASN = require("./src/components/asn");
const BIN = require("./src/components/bin");
const IBAN = require("./src/components/iban");
const Email = require("./src/components/email");
const Phone = require("./src/components/phone");
const Profanity = require("./src/components/profanity");
const pjson = require("./package.json");

// Configure the output
program.configureOutput({
  writeErr: (str) =>
    process.stdout.write(`${redColor}[ERR]${defaultColor} ${str}`),
});

// Configure the help option
program.option("-h, --help", "Display help for command");

// Configure the main program
program
  .name(pjson.name)
  .description(
    `${greenColor}Greip CLI is a command-line interface for the Greip.io${defaultColor}`
  )
  .version(pjson.version, "-v, --version", "Display the current version");

program
  .command("login")
  .helpOption(false)
  .summary("Login to the CLI")
  .description("Login to the CLI with your Greip token")
  .argument("<token>", "Your Greip token")
  .action((token) => {
    setToken(token);
    console.log(
      `${greenColor}You have been logged in successfully.${defaultColor}`
    );
  })
  .addHelpText("after", `\nExample:\n  $ ${pjson.name} login <token>`)
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help login' for more information about this command.${defaultColor}`
  );

program
  .command("logout")
  .helpOption(false)
  .summary("Logout from the CLI")
  .description("This command will log you out from the CLI")
  .action(() => {
    setToken(null);
    console.log(
      `${greenColor}You have been logged out successfully.${defaultColor}`
    );
  })
  .addHelpText("after", `\nExample:\n  $ ${pjson.name} logout`)
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help logout' for more information about this command.${defaultColor}`
  );

program
  .command("me")
  .helpOption(false)
  .description("Display your IP address and location information")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-i, --ip", "Display only the IP address").conflicts("dev")
  )
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .option(
    "-m, --modules <modules>",
    "Comma separated list of modules (modules: location, currency, timezone, security)"
  )
  .action((data) => {
    Token(Me(data));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} me\n  $ ${pjson.name} me --ip\n  $ ${pjson.name} me --dev\n  $ ${pjson.name} me --format json\n  $ ${pjson.name} me --modules location,currency,timezone,security\n  $ ${pjson.name} me --ip --format json --modules location,currency,timezone,security\n  $ ${pjson.name} me --dev --format json --modules location,currency,timezone,security`
  )
  .showHelpAfterError(
    `${purpleColor}Tip: try '${pjson.name} help me' for more information about this command.${defaultColor}`
  );

program
  .command("lookup")
  .helpOption(false)
  .description("Lookup a given IP address and display its location information")
  .argument("<ip>", "The IP address to lookup")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .option(
    "-m, --modules <modules>",
    "Comma separated list of modules (modules: location, currency, timezone, security)"
  )
  .action((ip, options) => {
    Token(Lookup(ip, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} lookup 1.1.1.1\n  $ ${pjson.name} lookup 1.1.1.1 --dev\n  $ ${pjson.name} lookup 1.1.1.1 --format json\n  $ ${pjson.name} lookup 1.1.1.1 --modules location,currency,timezone,security\n  $ ${pjson.name} lookup 1.1.1.1 --dev --format json --modules location,currency,timezone,security`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help lookup' for more information about this command.${defaultColor}`
  );

program
  .command("threats")
  .helpOption(false)
  .description(
    "Display information about a given IP address's intelligence threats"
  )
  .argument("<ip>", "The IP address to display threats information")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((ip, options) => {
    Token(Threats(ip, options, "threats"));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} threats 1.1.1.1\n  $ ${pjson.name} threats 1.1.1.1 --dev\n  $ ${pjson.name} threats 1.1.1.1 --format json`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help threats' for more information about this command.${defaultColor}`
  );

program
  .command("country")
  .helpOption(false)
  .description("Display information about a given country")
  .argument(
    "<country>",
    "The country to display information about (in ISO 3166-1 alpha-2 format)"
  )
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .option(
    "-m, --modules <modules>",
    "Comma separated list of modules (modules: language, flag, currency, timezone)"
  )
  .action((country, options) => {
    Token(Country(country, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} country US\n  $ ${pjson.name} country US --dev\n  $ ${pjson.name} country US --format json\n  $ ${pjson.name} country US --modules language,flag,currency,timezone`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help country' for more information about this command.${defaultColor}`
  );

program
  .command("asn")
  .helpOption(false)
  .description("Display information about a given ASN")
  .argument("<asn>", "The ASN to display information about (in ASXXXX format)")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((asn, options) => {
    Token(ASN(asn, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} asn AS13335\n  $ ${pjson.name} asn AS13335 --dev\n  $ ${pjson.name} asn AS13335 --format json\n  $ ${pjson.name} asn AS13335 --format json --dev\n  $ ${pjson.name} asn AS13335 --format newline --dev`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help asn' for more information about this command.${defaultColor}`
  );

program
  .command("bin")
  .helpOption(false)
  .description(
    "Lookup a given Bank Identification Number (BIN) and display its information"
  )
  .argument("<bin>", "The BIN to lookup")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((bin, options) => {
    Token(BIN(bin, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} bin 456789\n  $ ${pjson.name} bin 456789 --dev\n  $ ${pjson.name} bin 456789 --format json\n  $ ${pjson.name} bin 456789 --format json --dev\n  $ ${pjson.name} bin 456789 --format newline --dev`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help bin' for more information about this command.${defaultColor}`
  );

program
  .command("iban")
  .helpOption(false)
  .description("Validate a given International Bank Account Number (IBAN)")
  .argument("<iban>", "The IBAN to validate")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((iban, options) => {
    Token(IBAN(iban, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} iban BE71096123456769\n  $ ${pjson.name} iban BE71096123456769 --dev\n  $ ${pjson.name} iban BE71096123456769 --format json\n  $ ${pjson.name} iban BE71096123456769 --format newline --dev\n  $ ${pjson.name} iban BE71096123456769 --format json --dev\n  $ ${pjson.name} iban BE71096123456769 --format newline --dev`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help iban' for more information about this command.${defaultColor}`
  );

program
  .command("email")
  .helpOption(false)
  .description("Validate a given email address")
  .argument("<email>", "The email address to validate")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((email, options) => {
    Token(Email(email, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} email name@domain.com\n  $ ${pjson.name} email name@domain.com --dev\n  $ ${pjson.name} email name@domain.com --format json\n  $ ${pjson.name} email name@domain.com --format newline --dev`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help email' for more information about this command.${defaultColor}`
  );

program
  .command("phone")
  .helpOption(false)
  .description("Validate a given phone number")
  .argument("<phone>", "The phone number to validate")
  .argument(
    "<country>",
    "The country code of the phone number (in ISO 3166-1 alpha-2 format)"
  )
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .action((email, country, options) => {
    Token(Phone(email, country, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} phone 1234567890 US\n  $ ${pjson.name} phone 1234567890 US --dev\n  $ ${pjson.name} phone 1234567890 US --format json\n  $ ${pjson.name} phone 1234567890 US --format newline --dev`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help phone' for more information about this command.${defaultColor}`
  );

program
  .command("profanity")
  .helpOption(false)
  .description("Check a given text for profanity")
  .argument("<text>", "The text to check for profanity")
  .option("-d, --dev", "Return a fake response for development purposes")
  .addOption(
    new Option("-f, --format <format>")
      .choices(["newline", "json"])
      .default(defaultFormat)
  )
  .addOption(
    new Option(
      "-s, --score-only",
      "Display only the profanity score"
    ).conflicts("listProfanity")
  )
  .option("-l, --list-profanity", "Display the list of profane words")
  .action((text, options) => {
    Token(Profanity(text, options));
  })
  .addHelpText(
    "after",
    `\nExamples:\n  $ ${pjson.name} profanity "Hello, world!"\n  $ ${pjson.name} profanity "Hello, world!" --dev\n  $ ${pjson.name} profanity "Hello, world!" --format json\n  $ ${pjson.name} profanity "Hello, world!" --format newline --dev\n  $ ${pjson.name} profanity "Hello, world!" --score-only\n  $ ${pjson.name} profanity "Hello, world!" --list-profanity`
  )
  .showHelpAfterError(
    `${yellowColor}Tip: try '${pjson.name} help profanity' for more information about this command.${defaultColor}`
  );

program.parse();
