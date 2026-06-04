const { getDb } = require('./src/lib/db.js');
async function run() {
  try {
    // If db.ts is TS, we might need to use ts-node or run it via Next.js
    // Let's just write a plain sqlite3 script
    const sqlite3 = require('sqlite3').verbose();
    const { open } = require('sqlite');
    const db = await open({ filename: 'database.db', driver: sqlite3.Database });
    await db.run('INSERT INTO listings (title, category, price) VALUES (?, ?, ?)', 'Test Banana', 'Fruits', 'UGX 1000');
    const listings = await db.all('SELECT * FROM listings');
    console.log(listings[listings.length - 1]);
  } catch (e) {
    console.error(e);
  }
}
run();
