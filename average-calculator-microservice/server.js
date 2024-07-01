const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
let numbersStore = [];

const thirdPartyServerUrl = 'https://third-party-server.com/numbers';