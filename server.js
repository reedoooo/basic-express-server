'use strict';

// Dependencies
const express = require('express');
const cors = require('cors');

// Middleware
const logger = require('./src/middleware/logger');
const validator = require('./src/middleware/validator');

// Error Handlers
const error404 = require('./src/error-handlers/404');
const error500 = require('./src/error-handlers/500');

// Express app instance
const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(logger); // Logger middleware
app.use(validator); // Validator middleware

app.get('/', (request, response) => {
  console.log('Hello World!');
  response.status(200).json({ message: 'Hello World!' });
});


// Routes
app.get('/person', (request, response, next) => {
  if (request.query.name) {
    response.status(200).send(
      JSON.stringify({
        name: request.query.name,
      }),
    );
  } else {
    next(); // If no name is provided, proceed to next middleware
  }
});

// Error Handling
app.use(error404); // 404 handler
app.use(error500); // 500 handler
module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  }),
};

