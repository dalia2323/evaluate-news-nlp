const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client'));

// Function to extract text from a given URL
const extractTextFromURL = async (url) => {
    try {
        console.log(`Scraping content from: ${url}`);
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const extractedText = $('body').text().trim();

        if (!extractedText) {
            console.warn('No readable content found on the provided URL');
            return null;
        }

        const previewText = extractedText.substring(0, 200);
        console.log(`Extracted Preview:\n${previewText}\n--- End of Preview ---`);
        return previewText;
    } catch (err) {
        console.error('Scraping error:', err.message);
        throw new Error('Unable to extract text from the URL');
    }
};

// Endpoint to analyze a given URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        console.warn('Missing URL in request body');
        return res.status(400).json({ error: 'A valid URL is required' });
    }

    try {
        new URL(url); 
    } catch (err) {
        console.warn('Invalid URL format:', url);
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        const textContent = await extractTextFromURL(url);

        if (!textContent) {
            return res.status(400).json({ error: 'No text found on the given webpage' });
        }

        const apiResponse = await axios.post(
            'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer', 
            { text: textContent }
        );

        return res.json(apiResponse.data);
    } catch (err) {
        console.error('Processing error:', err.message);
        return res.status(500).json({ error: 'Error processing the request' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("Welcome to the server API. Use the client application to interact.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
