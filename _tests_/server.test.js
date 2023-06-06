'use strict';

const server = require('../server.js');
const supertest = require('supertest');
const request = supertest(server.app);

// Close the server after all tests have finished
afterAll(async () => {
  await server.server.close();
});

// Describe the test suite
describe('API Server Tests', () => {
  // Test for bad route (404 error)
  it('responds with 404 on a bad route', async () => {
    const response = await request.get('/invalidroute');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invalid request route');
  });

  // Test for bad method (404 error)
  it('responds with 404 on a bad method', async () => {
    const response = await request.post('/person');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invalid request method');
  });

  // Test for missing name in query string (500 error)
  it('responds with 500 if no name is in the query string', async () => {
    const response = await request.get('/person');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Missing value for \'name\' query');
  });

  // Test for correctly formatted request (200 success)
  it('responds with 200 if the request is correctly formatted', async () => {
    const response = await request.get('/person?name=Reed');
    expect(response.status).toBe(200);
  });

  // Test for the response body
  // Test for the response body
  it('passes if response body is an object with correct format', async () => {
    const response = await request.get('/person?name=El+Humano');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'El Humano' });
  });
});
