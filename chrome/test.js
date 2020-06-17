#!/usr/bin/env node

const { resolve } = require("path");
const chromeLaunch = require("chrome-launch");

const EXTENSION_PATH = resolve("./chrome/build/unpacked");
const START_URL = "https://facebook.github.io/react/";

chromeLaunch(START_URL, {
  args: [`--load-extension=${EXTENSION_PATH}`],
});
