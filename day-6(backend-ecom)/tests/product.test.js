import request from 'supertest';
import app from '../server.js';

describe('GET /api/products', () => {
  it('responds with 200', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
  });
});
