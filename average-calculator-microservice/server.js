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

  // Utility function to calculate average
const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
  };
  
  app.get('/numbers/:numberType', async (req, res) => {
    const numberType = req.params.numberType;
    const validTypes = ['p', 'f', 'e', 'r'];
  
    if (!validTypes.includes(numberType)) {
      return res.status(400).json({ error: 'Invalid number type' });
    }
  
    const prevState = [...numbersStore];
  
    const newNumber = await fetchNumber(numberType);
    if (newNumber !== null && !numbersStore.includes(newNumber)) {
      if (numbersStore.length >= windowSize) {
        numbersStore.shift();
      }
      numbersStore.push(newNumber);
    }
  
    const avg = numbersStore.length ? calculateAverage(numbersStore) : 0;
  