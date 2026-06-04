import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db: any = null;

export async function getDb() {
  if (db) return db;

  db = await open({
    filename: path.resolve(process.cwd(), 'database.db'),
    driver: sqlite3.Database
  });

  // Enable WAL mode
  await db.exec('PRAGMA journal_mode = WAL');

  // Define the schema using raw SQL
  const schema = `
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT 'Farmer',
      farm_name TEXT DEFAULT 'Tunda Gula Farm',
      location TEXT DEFAULT 'Kayunga',
      description TEXT DEFAULT 'Specializing in organic fruits and vegetables.',
      rating REAL DEFAULT 4.8,
      completion INTEGER DEFAULT 72,
      earnings_month TEXT DEFAULT 'UGX 842K',
      phone TEXT DEFAULT '0700 000 000',
      email TEXT DEFAULT 'farmer@tundagula.ug'
    );

    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT,
      price TEXT,
      status TEXT DEFAULT 'Active',
      icon TEXT DEFAULT '🥬',
      stock TEXT DEFAULT '0',
      min_qty TEXT DEFAULT '1',
      delivery_method TEXT DEFAULT 'Pickup only',
      rating REAL DEFAULT 5.0,
      orders_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT NOT NULL,
      amount TEXT,
      status TEXT,
      delivery_date TEXT,
      produce TEXT,
      quantity TEXT,
      icon TEXT DEFAULT '🍽️'
    );

    CREATE TABLE IF NOT EXISTS harvests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produce TEXT NOT NULL,
      quantity TEXT,
      date TEXT,
      month TEXT,
      day TEXT,
      icon TEXT DEFAULT '🍍'
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT,
      type TEXT DEFAULT 'info',
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL, -- 'income' or 'withdrawal'
      amount TEXT,
      description TEXT,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      comment TEXT,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS farmer_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      surname TEXT,
      phone TEXT,
      whatsapp TEXT,
      story TEXT,
      farm_name TEXT,
      farm_type TEXT,
      district TEXT,
      sub_county TEXT,
      village TEXT,
      farm_size TEXT,
      years_farming TEXT,
      certifications TEXT,
      produce_categories TEXT,
      payment_method TEXT,
      momo_number TEXT,
      email TEXT,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await db.exec(schema);

  // Run migrations for existing table
  try { await db.exec('ALTER TABLE farmer_registrations ADD COLUMN email TEXT'); } catch(e) {}
  try { await db.exec('ALTER TABLE farmer_registrations ADD COLUMN password TEXT'); } catch(e) {}

  // Seed initial data if tables are empty
  const profileCount = await db.get('SELECT count(*) as count FROM profiles');
  if (profileCount.count === 0) {
    await db.run('INSERT INTO profiles (name, farm_name, location) VALUES (?, ?, ?)', 'Farmer', 'Tunda Gula Farm', 'Kayunga');
    
    // Seed listings
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Fresh Kayunga Pineapples', 'Fruits', 'UGX 5,000/kg', '🍍', '320 kg available', 'Min. 20kg', 'Self-deliver', 4.9, 8, 'Active');
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Mango (Ngowe Variety)', 'Fruits', 'UGX 7,000/kg', '🥭', '18 kg - restock soon', 'Min. 10kg', 'Pickup only', 4.7, 4, 'Low Stock');
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Passion Fruit', 'Fruits', 'UGX 8,000/kg', '🟡', '80 kg available', 'Min. 5kg', 'Self-deliver', 4.8, 2, 'Active');
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Watermelon', 'Fruits', 'UGX 3,000/kg', '🍉', '25 kg - restock soon', 'Min. 20kg', 'Pickup only', 4.1, 1, 'Low Stock');
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Sukuma Wiki (Kale)', 'Vegetables', 'UGX 2,500/kg', '🥬', '60 kg available', 'Min. 10kg', 'Self-deliver', 4.9, 1, 'Active');
    await db.run("INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, rating, orders_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      'Matooke (Cooking Bananas)', 'Fruits', 'UGX 4,000/bunch', '🍌', 'Out of season', 'Min. 5 bunches', 'Pickup only', 4.5, 0, 'Paused');

    // Seed orders
    await db.run("INSERT INTO orders (customer, amount, status, delivery_date, produce, quantity) VALUES ('Kati Kati Restaurant', 'UGX 200K', 'PENDING', 'Fri 4 Apr', 'Pineapples', '40kg')");
    await db.run("INSERT INTO orders (customer, amount, status, delivery_date, produce, quantity) VALUES ('Serena Hotel Kampala', 'UGX 175K', 'CONFIRMED', 'Thu 3 Apr', 'Mangoes', '25kg')");

    // Seed harvests
    await db.run("INSERT INTO harvests (produce, quantity, date, month, day, icon) VALUES ('Pineapples', '200kg', '8 Apr', 'Apr', '8', '🍍')");
    await db.run("INSERT INTO harvests (produce, quantity, date, month, day, icon) VALUES ('Watermelon', '150kg', '14 Apr', 'Apr', '14', '🍉')");

    // Seed notifications
    await db.run("INSERT INTO notifications (title, message, type) VALUES ('New Order', 'Kati Kati Restaurant ordered 40kg of Pineapples', 'order')");

    // Seed transactions
    await db.run("INSERT INTO transactions (type, amount, description) VALUES ('income', 'UGX 200K', 'Payment for Pineapples')");

    // Seed reviews
    await db.run("INSERT INTO reviews (customer_name, rating, comment) VALUES ('Kati Kati Restaurant', 5, 'Best pineapples in the region!')");
    await db.run("INSERT INTO reviews (customer_name, rating, comment) VALUES ('Serena Hotel', 4, 'Very fresh mangoes, will order again.')");
  }

  return db;
}
