/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'BrainQuiz APIs',
        description: 'API for BrainQuiz MCQ project',
        contact: {
            'name': 'Abhi Pandey',
            'email': 'pandeyabhi142002@gmail.com'
        },
    },
    host: process.env.PORT,      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: ['http'],   // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']

    securityDefinitions: {
        Authorization: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
        },
    },  // by default: empty object
    security: [{ Authorization: [] }],         // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
