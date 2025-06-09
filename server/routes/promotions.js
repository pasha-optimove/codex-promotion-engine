const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM promotions', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, code, discount, budget, capping } = req.body;
  const stmt = db.prepare(`INSERT INTO promotions (name, code, discount, budget, capping) VALUES (?, ?, ?, ?, ?)`);
  stmt.run(name, code, discount, budget, capping, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

router.post('/apply', (req, res) => {
  const { code, amount } = req.body;
  db.get('SELECT * FROM promotions WHERE code = ?', [code], (err, promo) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!promo) return res.status(404).json({ error: 'Promo not found' });
    if (promo.uses >= promo.capping) return res.status(400).json({ error: 'Promo capping reached' });
    if (promo.budget < promo.discount) return res.status(400).json({ error: 'Promo budget exceeded' });

    const newAmount = amount - promo.discount;
    db.run('UPDATE promotions SET uses = uses + 1, budget = budget - ? WHERE id = ?', [promo.discount, promo.id], err2 => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ amount: newAmount });
    });
  });
});

module.exports = router;
