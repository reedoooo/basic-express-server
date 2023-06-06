'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./src/middleware/logger');
const validator = require('./src/middleware/validator');
const error404 = require('./src/error-handlers/404');
const error500 = require('./src/error-handlers/500');

const app = express();

app.use(cors());
app.use(logger);
app.use(validator);

app.get('/', (request, response) => {
  console.log('Hello World!');
  response.status(200).json({ message: 'Hello World!' });
});

app.get('/person', (request, response, next) => {
  if (request.query.name) {
    response.status(200).send(
      JSON.stringify({
        name: request.query.name,
      }),
    );
  } else {
    next();
  }
});

app.use(error404);
app.use(error500);

require('dotenv').config();

const serverUrl = process.env.PORT || 3001;

app.listen(serverUrl, () => {
  console.log(`Server is running, listening on ${serverUrl}`);
});
