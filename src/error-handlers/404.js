'use strict';

const error404 = (request, response, next) => {
  console.log('error404.js hit');
  if (request.method === 'GET' && !request.url.includes('/person')) {
    let err = {
      message: 'Invalid request route',
    };
    console.log('404a hit');
    response.status(404).send(err);
  }
  else if (request.method !== 'GET') {
    console.log('404b hit');
    let err = {
      message: 'Invalid request method',
    };
    response.status(404).send(err);
  }
  else {
    console.log('404 next hit');
    next();   
  }

};

module.exports = error404;