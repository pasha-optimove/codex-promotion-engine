const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    discount INTEGER NOT NULL,
    budget INTEGER NOT NULL,
    capping INTEGER NOT NULL,
    uses INTEGER DEFAULT 0
  )`);
});

module.exports = db;
