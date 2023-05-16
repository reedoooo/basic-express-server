'use strict';

const validator = (request, response, next) => {
  if (request.query.name) {
    console.log('validator.js hit');
    next();
  } else {
    // console.log('validator.js error hit');
    // next('Invalid request');
    {next();}
  }
};

module.exports = validator;
