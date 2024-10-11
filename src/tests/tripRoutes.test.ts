import request from 'supertest';
import express, { Application } from 'express';
import tripRoutes from '../routes/tripRoutes';

const app: Application = express();
app.use('/api/trips', tripRoutes);

describe('GET /api/trips/search', () => {
  it('should return a list of trips that match search criteria', async () => {
    const res = await request(app).get('/api/trips/search?keyword=London');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/trips/:id', () => {
  it('should return the details of a specific trip by ID', async () => {
    const res = await request(app).get('/api/trips/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });
});
