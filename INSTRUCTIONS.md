# Tunda Gula Farmer Portal - Technical Documentation & Instructions

This document outlines the architecture, data structures, and operational procedures for the Tunda Gula dynamic prototype. The project has been transitioned from a static dashboard to a fully functioning product powered by **SQLite 3** and **Raw SQL**.

---

## 1. System Architecture

The application is built using the **Next.js App Router** with a local **SQLite** persistence layer.

- **Frontend**: React (v19) with Tailwind-inspired Vanilla CSS.
- **Backend**: Next.js Server Actions for secure database communication.
- **Database**: SQLite 3 (via `sqlite3` and `sqlite` wrapper).
- **State Management**: React Context API (`DataProvider`) for global data synchronization.

---

## 2. Database Schema (Raw SQL)

Information is structured into four primary tables within the `database.db` file. 

### Profiles Table
Stores the farmer's identity and farm-wide metrics.
```sql
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT 'Emmanuel',
    farm_name TEXT DEFAULT 'AgriConnect Farm',
    location TEXT DEFAULT 'Kayunga',
    rating REAL DEFAULT 4.8,
    completion INTEGER DEFAULT 72,
    earnings_month TEXT DEFAULT 'UGX 842K'
);
```

### Listings Table
Stores produce available for sale to restaurants.
```sql
CREATE TABLE listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT,
    price TEXT,
    status TEXT DEFAULT 'Active',
    icon TEXT DEFAULT '🥬'
);
```

### Orders Table
Tracks customer requests and fulfillment status.
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    amount TEXT,
    status TEXT,
    delivery_date TEXT,
    produce TEXT,
    quantity TEXT,
    icon TEXT DEFAULT '🍽️'
);
```

### Harvests Table
Manages the upcoming harvest calendar.
```sql
CREATE TABLE harvests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produce TEXT NOT NULL,
    quantity TEXT,
    date TEXT,
    month TEXT,
    day TEXT,
    icon TEXT DEFAULT '🍍'
);
```

---

## 3. Data Flow Operations

### Fetching Data (The "Read" Flow)
1. **Initial Load**: On application mount, `src/DataContext.jsx` triggers a `refreshData()` call.
2. **Server Execution**: The `getDb()` function in `src/lib/db.ts` opens the SQLite connection.
3. **SQL Query**: The system executes `SELECT * FROM [table]` queries.
4. **State Update**: The results are stored in the `DataProvider` state, causing the UI to re-render with real data.

### Saving Data (The "Write" Flow)
1. **User Input**: User fills out a form (e.g., "Add New Listing").
2. **Server Action**: The form triggers `addListing(formData)` in `src/app/actions.ts`.
3. **Persistence**: The server executes an `INSERT INTO` SQL command with the provided values.
4. **Revalidation**: `revalidatePath('/')` is called to clear the Next.js cache.
5. **UI Sync**: The client calls `refreshData()` to pull the latest record from the database.

---

## 4. Operational Instructions

### Installation
Ensure all dependencies are installed with compatibility flags:
```bash
npm install --legacy-peer-deps
```

### Development Mode
Start the local server and database initialization:
```bash
npm run dev
```

### Database Management
- **File Location**: The database is stored in `database.db` at the root directory.
- **Seeding**: The system automatically seeds initial data if the tables are empty upon startup.
- **Direct Access**: You can view the data using any SQLite browser (e.g., DB Browser for SQLite) or by using the `sqlite3` CLI.

---

## 5. Maintenance & Safety

- **Backups**: To back up the entire application data, simply copy the `database.db` file.
- **SQL Injection**: Always use parameterized queries (e.g., `db.run('SQL', val1, val2)`) to prevent security vulnerabilities.
- **Migrations**: To modify table structures, update the `schema` variable in `src/lib/db.ts` or run a manual `ALTER TABLE` command via the SQLite CLI.

---

## 6. Phase 5: Feature Expansion Plan (Dynamic Implementation)

To transition from a dashboard prototype to a complete product, the following features will be implemented using the established SQLite pattern.

### 🔔 Dynamic Notification System
**Objective**: Real-time alerts for new orders and system updates.
- **Logic**: A new `notifications` table will store events. The layout will query for `unread` notifications.
- **Trigger**: Every time a new row is added to the `orders` table, a corresponding row is inserted into `notifications`.
- **UI**: A bell icon in the top navigation bar with a red badge indicating the count of `is_read = 0` records.

### 📦 Orders & Listings Management
**Objective**: Full lifecycle management of produce and sales.
- **Orders Page**: A dedicated `/orders` route will display a data table of all records from the `orders` table. Actions like "Accept" or "Decline" will update the `status` column via raw SQL.
- **Listings Page**: A `/listings` route will allow farmers to toggle produce visibility. `DELETE` and `UPDATE` SQL commands will manage the inventory.

### 📅 Harvest Calendar Sync
**Objective**: Predictive planning for restaurants.
- **Logic**: The `harvests` table will act as a scheduler. Farmers enter "Expected Harvest Dates".
- **Dynamic View**: The calendar UI will pull records where the `date` is in the future.
- **Editing**: Clicking a date will trigger an `UPDATE harvests SET quantity = ?` SQL command.

### 💰 Finance & MoMo Payouts
**Objective**: Transparent earnings tracking.
- **Earnings Table**: A `transactions` table will track every completed order and withdrawal.
- **MoMo Integration**: A dedicated `/momo` page where farmers enter their phone number. A raw SQL query will calculate `SUM(amount)` from completed orders to show "Withdrawable Balance".

### 👨‍🌾 Farm Profile Management
**Objective**: Professional identity and branding.
- **Logic**: The `profiles` table stores farm name, location, and bio. 
- **Dynamic View**: A `/profile` page where farmers can see their public-facing "Storefront" preview.
- **Editing**: A raw SQL `UPDATE profiles SET farm_name = ?, location = ? WHERE id = 1` will keep the farm identity current.

### ⭐ Customer Reviews & Ratings
**Objective**: Building trust and social proof.
- **Logic**: A new `reviews` table will store `customer_name`, `rating` (1-5), and `comment`.
- **Dynamic View**: A `/reviews` route showing a list of recent feedback and calculating the "Average Rating" dynamically using `SELECT AVG(rating)`.
- **Relationship**: Future expansion will link reviews directly to specific `orders`.

### ⚙️ Account Settings
**Objective**: Privacy and portal customization.
- **Logic**: A `settings` table for user-specific preferences (e.g., Notification frequency, Currency).
- **Dynamic View**: A `/settings` page with forms for password updates and language selection.

---

## 7. Data Consistency Checklist

When adding new features, ensure the following flow is maintained:
1. **Schema Update**: Add the table in `src/lib/db.ts`.
2. **Server Action**: Create the raw SQL function in `src/app/actions.ts`.
3. **Data Refresh**: Ensure `refreshData()` is called after every "Write" operation to keep the UI in sync with SQLite.

---

*Document Version: 1.1.0 (Updated Feature Roadmap)*  
*Project: Tunda Gula Prototype*
