import request from 'supertest';
import app from '../../src/app';

describe('GET /api/health', () => {
  it('debe responder 200 con estructura status/data', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      data: {
        message: 'Backend is running',
      },
    });
  });
});
