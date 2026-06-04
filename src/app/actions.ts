"use server";

import { getDb } from '../lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// PROFILE ACTIONS
export async function getProfile() {
  const db = await getDb();
  return db.get('SELECT * FROM profiles LIMIT 1');
}

export async function updateProfile(formData: FormData) {
  const name = formData.get('name') as string;
  const farm_name = formData.get('farm_name') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  const db = await getDb();
  await db.run(
    'UPDATE profiles SET name = ?, farm_name = ?, location = ?, description = ?, phone = ?, email = ? WHERE id = 1',
    name, farm_name, location, description, phone, email
  );

  revalidatePath('/', 'layout');
}

// LISTING ACTIONS
export async function getListings() {
  const db = await getDb();
  return db.all('SELECT * FROM listings ORDER BY id DESC');
}

export async function getListingById(id: number) {
  const db = await getDb();
  return db.get('SELECT * FROM listings WHERE id = ?', id);
}

export async function addListing(data: any) {
  const title = data.title;
  const category = data.category;
  const price = data.price;
  const icon = data.icon || '🥬';
  const stock = data.stock || 'Available';
  const min_qty = data.min_qty || 'Min. 1';
  const delivery_method = data.delivery_method || 'Pickup only';

  const db = await getDb();
  await db.run(
    'INSERT INTO listings (title, category, price, icon, stock, min_qty, delivery_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    title, category, price, icon, stock, min_qty, delivery_method, 'Active'
  );

  await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'Listing Created', `New produce "${title}" has been added to your inventory.`, 'success'
  );

  revalidatePath('/', 'layout');
}

export async function updateListing(id: number, data: any) {
  const title = data.title;
  const category = data.category;
  const price = data.price;
  const icon = data.icon;
  const stock = data.stock;
  const min_qty = data.min_qty;
  const delivery_method = data.delivery_method;
  const status = data.status;

  const db = await getDb();
  await db.run(
    'UPDATE listings SET title = ?, category = ?, price = ?, icon = ?, stock = ?, min_qty = ?, delivery_method = ?, status = ? WHERE id = ?',
    title, category, price, icon, stock, min_qty, delivery_method, status, id
  );

  await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'Listing Updated', `Changes to "${title}" have been saved successfully.`, 'info'
  );

  revalidatePath('/', 'layout');
}

export async function deleteListing(id: number | string) {
  const targetId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  if (isNaN(targetId)) {
    throw new Error(`Invalid listing ID provided: ${id}`);
  }

  const db = await getDb();
  console.log(`[deleteListing] requested id=${targetId}`);

  const item = await db.get('SELECT title FROM listings WHERE id = ?', targetId);
  if (!item) {
    console.error(`[deleteListing] listing not found id=${targetId}`);
    throw new Error(`Listing with ID ${targetId} not found.`);
  }

  const result = await db.run('DELETE FROM listings WHERE id = ?', targetId);
  console.log(`[deleteListing] delete result id=${targetId}, changes=${result?.changes ?? 0}`);
  if (!result || result.changes === 0) {
    throw new Error(`Failed to delete listing with ID ${targetId}. No changes made.`);
  }

  await db.run(
    'INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'Listing Deleted',
    `"${item.title}" has been removed from your portal.`,
    'warning'
  );

  revalidatePath('/', 'layout');
  return {
    success: true,
    deletedId: targetId,
    message: `Listing "${item.title}" deleted successfully.`
  };
}

export async function updateListingStatus(id: number, status: string) {
  const db = await getDb();
  const item = await db.get('SELECT title FROM listings WHERE id = ?', id);
  await db.run('UPDATE listings SET status = ? WHERE id = ?', status, id);
  
  if (item) {
    await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
      'Status Changed', `"${item.title}" is now ${status}.`, 'info'
    );
  }
  revalidatePath('/', 'layout');
}

// ORDER ACTIONS
export async function getOrders() {
  const db = await getDb();
  return db.all('SELECT * FROM orders ORDER BY id DESC');
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await getDb();
  await db.run('UPDATE orders SET status = ? WHERE id = ?', status, id);
  
  const order = await db.get('SELECT customer FROM orders WHERE id = ?', id);
  await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'Order Updated', `Order for ${order.customer} marked as ${status}`, 'order'
  );

  revalidatePath('/', 'layout');
}

// HARVEST ACTIONS
export async function getHarvests() {
  const db = await getDb();
  return db.all('SELECT * FROM harvests ORDER BY id ASC');
}

export async function updateHarvest(id: number, quantity: string) {
  const db = await getDb();
  await db.run('UPDATE harvests SET quantity = ? WHERE id = ?', quantity, id);
  revalidatePath('/', 'layout');
}

export async function addHarvest(formData: FormData) {
  const produce = formData.get('produce') as string;
  const quantity = formData.get('quantity') as string;
  const dateStr = formData.get('date') as string; // e.g. "2026-04-15"
  
  // Format for our UI: "15 Apr"
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const formattedDate = `${day} ${month}`;
  
  const icon = formData.get('icon') as string || '🥬';

  const db = await getDb();
  await db.run('INSERT INTO harvests (produce, quantity, date, day, icon) VALUES (?, ?, ?, ?, ?)',
    produce, quantity, formattedDate, day.toString(), icon
  );
  revalidatePath('/', 'layout');
}

// NOTIFICATION ACTIONS
export async function getNotifications() {
  const db = await getDb();
  return db.all('SELECT * FROM notifications ORDER BY created_at DESC');
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  await db.run('UPDATE notifications SET is_read = 1 WHERE id = ?', id);
  revalidatePath('/', 'layout');
}

// TRANSACTION ACTIONS
export async function getTransactions() {
  const db = await getDb();
  return db.all('SELECT * FROM transactions ORDER BY date DESC');
}

export async function addWithdrawal(amount: string) {
  const db = await getDb();
  await db.run("INSERT INTO transactions (type, amount, description) VALUES ('withdrawal', ?, 'MoMo Withdrawal')", amount);
  
  await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'Withdrawal Initiated', `Withdrawal of ${amount} to MoMo is being processed`, 'payment'
  );

  revalidatePath('/', 'layout');
}

// REVIEW ACTIONS
export async function getReviews() {
  const db = await getDb();
  return db.all('SELECT * FROM reviews ORDER BY date DESC');
}

export async function registerFarmer(formData: FormData) {
  const first_name = formData.get('first_name') as string;
  const surname = formData.get('surname') as string;
  const phone = formData.get('phone') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const story = formData.get('story') as string;
  const farm_name = formData.get('farm_name') as string;
  const farm_type = formData.get('farm_type') as string;
  const district = formData.get('district') as string;
  const sub_county = formData.get('sub_county') as string;
  const village = formData.get('village') as string;
  const farm_size = formData.get('farm_size') as string;
  const years_farming = formData.get('years_farming') as string;
  const certifications = formData.get('certifications') as string;
  const produce_categories = formData.get('produce_categories') as string;
  const payment_method = formData.get('payment_method') as string;
  const momo_number = formData.get('momo_number') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const db = await getDb();

  // 1. Save to farmer_registrations table
  await db.run(
    `INSERT INTO farmer_registrations (
      first_name, surname, phone, whatsapp, story, 
      farm_name, farm_type, district, sub_county, village, 
      farm_size, years_farming, certifications, produce_categories, 
      payment_method, momo_number, email, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    first_name, surname, phone, whatsapp, story, 
    farm_name, farm_type, district, sub_county, village, 
    farm_size, years_farming, certifications, produce_categories, 
    payment_method, momo_number, email, password
  );

  // 2. Update the main profile so dashboard shows the registered farmer's real data
  const fullName = `${first_name || 'Farmer'} ${surname || ''}`.trim();
  const location = sub_county ? `${district}, ${sub_county}` : (district || 'Uganda');
  const finalEmail = email || `${(first_name || 'farmer').toLowerCase()}.${(surname || 'user').toLowerCase()}@tundagula.ug`;

  await db.run(
    `UPDATE profiles SET name = ?, farm_name = ?, location = ?, description = ?, phone = ?, email = ? WHERE id = 1`,
    fullName, farm_name, location, story, phone, finalEmail
  );

  // 3. Notify admin
  await db.run('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
    'New Registration', `New farmer registration from ${fullName} (${farm_name}) in ${district}`, 'registration'
  );

  revalidatePath('/', 'layout');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function loginFarmer(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const db = await getDb();
  
  // Verify credentials against farmer_registrations
  const farmer = await db.get(
    'SELECT * FROM farmer_registrations WHERE email = ? AND password = ?',
    email, password
  );

  if (!farmer) {
    return { success: false, error: 'Invalid email or password' };
  }

  // Set an auth cookie (using farmer ID)
  // In a real app, this would be a secure, signed JWT
  (await cookies()).set('auth_token', farmer.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  // Optional: Update the dashboard profile to match the logged-in user
  // This ensures the dashboard always reflects the currently logged in farmer in our single-profile mockup
  const fullName = `${farmer.first_name || 'Farmer'} ${farmer.surname || ''}`.trim();
  const location = farmer.sub_county ? `${farmer.district}, ${farmer.sub_county}` : (farmer.district || 'Uganda');
  await db.run(
    `UPDATE profiles SET name = ?, farm_name = ?, location = ?, description = ?, phone = ?, email = ? WHERE id = 1`,
    fullName, farmer.farm_name, location, farmer.story, farmer.phone, farmer.email
  );

  revalidatePath('/dashboard');
  return { success: true };
}
