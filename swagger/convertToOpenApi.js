require('dotenv').config();
const path = require('path');
const postmanToOpenApi = require('postman-to-openapi');

// Define file paths
const postmanCollectionPath = path.join(__dirname, 'postman_collection.json');
const outputFilePath = path.join(__dirname, 'openapi.json');

// Define conversion options
const options = {
    defaultTag: 'General',
    servers: [
        {
            url: process.env.APP_BASE_URL, // Fallback URL
            // description: 'Your server description here'
        }
    ],
    outputFormat: 'json',
    info: {
        title: 'WeeGO APIs',
        // description: 'API Description',
        version: new Date().toISOString()
    },
};

// Convert Postman collection to OpenAPI
postmanToOpenApi(postmanCollectionPath, outputFilePath, options)
    .then(result => {
        console.log('OpenAPI conversion successfull.⚡️', result);
    })
    .catch(err => {
        console.error('OpenAPI conversion failed. ⛓️‍💥', err.message);
    });
