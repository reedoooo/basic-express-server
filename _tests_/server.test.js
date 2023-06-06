'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

// Describe the test suite
describe('API Server Tests', () => {
  
  // Test for bad route
  it('responds with 404 on a bad route', async () => {
    const response = await request.get('/nonexistentroute?name=Tha+human');
    expect(response.status).toEqual(404);
  });

  // Test for bad method
  it('responds with 404 on a bad method', async () => {
    const response = await request.post('/person?name=His+Dog');
    expect(response.status).toBe(404);
  });

  // Test for missing name in query string
  it('responds with 500 if no name is in the query string', async () => {
    const response = await request.get('/person?name');
    expect(response.status).toBe(500);
  });

  // Test for correctly formatted request
  it('responds with 200 if the request is correctly formatted', async () => {
    const response = await request.get('/person?name=Reed');
    expect(response.status).toBe(200);
  });

  // Test for the response body
  it('passes if response body is an object with correct format', async () => {
    const response = await request.get('/person?name=El+Humano');
    expect(response.text).toBe(`{"name":"El Humano"}`);
  });
});
