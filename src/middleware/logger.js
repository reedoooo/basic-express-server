'use strict';

const logger = (request, response, next) => {
  response.message = `Request: ${request.method} | URL: ${request.url}`;
  console.log(response.message);
  next();
};

module.exports = logger;