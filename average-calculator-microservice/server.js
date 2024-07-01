const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
let numbersStore = [];

const thirdPartyServerUrl = 'https://third-party-server.com/numbers';

// Utility function to fetch numbers from the third-party server
const fetchNumber = async (type) => {
    try {
      const response = await axios.get(`${thirdPartyServerUrl}/${type}`, { timeout: 500 });
      return response.data.number; // Assuming the response contains a number field
    } catch (error) {
      console.error('Error fetching number:', error.message);
      return null;
    }
  };