const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const promotionsRouter = require('../routes/promotions');
const db = require('../db');

const app = express();
app.use(bodyParser.json());
app.use('/promotions', promotionsRouter);

describe('promotion apply', () => {
  beforeAll(done => {
    const stmt = db.prepare('INSERT INTO promotions (name, code, discount, budget, capping) VALUES (?, ?, ?, ?, ?)');
    stmt.run('Test', 'TEST', 10, 100, 5, done);
  });

  it('applies a promo code', async () => {
    const res = await request(app)
      .post('/promotions/apply')
      .send({ code: 'TEST', amount: 50 });
    expect(res.status).toBe(200);
    expect(res.body.amount).toBe(40);
  });
});
