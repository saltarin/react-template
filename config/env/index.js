const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const dotEnvExpand = require('dotenv-expand');

function loadEnv(path) {
  let envFile;
  if (fs.existsSync(path)) {
    envFile = fs.readFileSync(path);
  }
  let env = {};
  if (envFile) {
    env = dotenv.parse(envFile);
  }
  return env;
}

function loadConstants() {
  const envPath = path.resolve(__dirname, '../../.env');
  const envLocalPath = path.resolve(__dirname, '../../.env.local');
  const env = loadEnv(envPath);
  const envLocal = loadEnv(envLocalPath);
  const mergeEnv = {...env, ...envLocal};
  return dotEnvExpand({parsed: mergeEnv}).parsed;
}

function defineWebpackConstants() {
  const constants = loadConstants();
  const webpackConstants = {};
  Object.entries(constants).forEach(([key, value]) => webpackConstants[`process.env.${key}`] = JSON.stringify(value));
  return webpackConstants;
}

module.exports = {
  defineWebpackConstants
}