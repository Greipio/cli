# Greip CLI

The official command-line interface (CLI) for Greip.

[Report Issue](https://github.com/Greipio/cli/issues/new)
·
[Request Feature](https://github.com/Greipio/cli/discussions/new?category=ideas)
·
[API Documentation](https://docs.greip.io)
·
[Website](https://greip.io)

[![NPM Package](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/ggip)
[![Github Repository](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Greipio/cli)

[![npm version](https://badge.fury.io/js/ggip.svg)](https://badge.fury.io/js/gre-geoip)
&nbsp;
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Greipio/cli?color=green&label=Minified%20size&logo=github)
&nbsp;
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2-0)
&nbsp;
![API Status](https://img.shields.io/website?down_color=orange&down_message=down&label=API%20status&up_color=green&up_message=up&url=https%3A%2F%2Fgregeoip.com)

---

# Installation

```bash
npm i --global ggip
```

or

```bash
yarn global add ggip
```

# Usage

```

$ ggip help
Usage: ggip [options] [command]

Greip CLI is a command-line interface for the Greip.io

Options:
-h, --help Display help for command
-v, --version Display the current version

Commands:
login <token> Login to the CLI
logout Logout from the CLI
me [options] Display your IP address and location information
lookup [options] <ip> Lookup a given IP address and display its location information
country [options] <country> Display information about a given country
asn [options] <asn> Display information about a given ASN
bin [options] <bin> Lookup a given Bank Identification Number (BIN) and display its information
iban [options] <iban> Validate a given International Bank Account Number (IBAN)
email [options] <email> Validate a given email address
phone [options] <phone> <country> Validate a given phone number
profanity [options] <text> Check a given text for profanity
help [command] display help for command

```

# Configuration

After installing the CLI, you need to set your API token in order to use it's funcitonalities. This step can be done just by running the `login` command as follows:

```bash
ggip login your-api-key
```

> **Note**
> You can obtain an API token just by creating an account at [Greip.io](https://greip.io/portal/register).

# Usage

## 1. Available commands

To get a list of all available commands of the CLI just use the `help` command as follows:

```bash
ggip help
```

This will provide you a list of commands and options.

## 2. Available options & examples

To list the availabe options and examples for a specific command, just try the help help command with the command want as follows:

```bash
ggip help lookup
```

This will provide you a list of available optioins with some usage examples for the `lookup` command.

# Credits

- [Greip Developers](https://greip.io/)
- [All Contributors](https://github.com/Greipio/cli/graphs/contributors)
