'use strict';

/**
 * Error500 Middleware
 * Handles errors that occur when the 'name' query is missing
 */
const error500 = (request, response, next) => {
  // If 'name' query is missing, respond with error
  if (!request.query.name) {
    console.log('error500.js hit');

    let err = {
      message: 'Missing value for \'name\' query',
    };

    response.status(500).send(err);
  } else {
    next(); // If 'name' query is present, proceed to next middleware
  }
};

module.exports = error500;
