# Tunda Gula: Listing Model Analysis

This document provides a detailed technical analysis of the **Listing** model within the Tunda Gula farmer portal.

## 1. Database Schema
The Listing model is implemented as a table in SQLite. The schema is defined in `src/lib/db.ts`.

```sql
CREATE TABLE IF NOT EXISTS listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,          -- Name of the produce (e.g., "Fresh Pineapples")
  category TEXT,                -- Produce category (e.g., "Fruits", "Vegetables")
  price TEXT,                   -- Formatted price string (e.g., "UGX 5,000/kg")
  status TEXT DEFAULT 'Active', -- Status: 'Active', 'Low Stock', 'Paused'
  icon TEXT DEFAULT '🥬',       -- Emoji representation for UI
  stock TEXT DEFAULT '0',       -- Formatted stock string (e.g., "320 kg available")
  min_qty TEXT DEFAULT '1',     -- Formatted minimum quantity (e.g., "Min. 5kg")
  delivery_method TEXT DEFAULT 'Pickup only',
  rating REAL DEFAULT 5.0,      -- Average customer rating
  orders_count INTEGER DEFAULT 0 -- Total orders fulfilled for this listing
);
```

## 2. Field Breakdown

| Field | Data Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | N/A | Unique identifier (Primary Key). |
| `title` | `TEXT` | N/A | Human-readable name of the product. |
| `category` | `TEXT` | N/A | Used for filtering and grouping in the portal. |
| `price` | `TEXT` | N/A | Stored as a string to include currency and units. |
| `status` | `TEXT` | `'Active'` | Controls visibility and availability in the store. |
| `icon` | `TEXT` | `'🥬'` | A single emoji used for visual identification. |
| `stock` | `TEXT` | `'0'` | Current inventory levels. |
| `min_qty` | `TEXT` | `'1'` | The minimum purchase amount allowed. |
| `delivery_method` | `TEXT` | `'Pickup only'` | Logic for how the item reaches the customer. |
| `rating` | `REAL` | `5.0` | 0.0 to 5.0 scale for customer feedback. |
| `orders_count` | `INTEGER` | `0` | Analytics field to track listing popularity. |

## 3. Architecture Analysis

### Current Strengths
*   **UI-Ready**: The model is designed for immediate display. Storing `price` as "UGX 5,000/kg" means no frontend logic is needed to format currency or units.
*   **Flexibility**: The `TEXT` type for `stock` and `min_qty` allows farmers to use various units (e.g., "crates", "bags", "kg") without changing the schema.
*   **Low Overhead**: As a flat SQLite table, CRUD operations are extremely fast and require zero configuration.

### Technical Debt & Limitations
*   **Calculation Barriers**: Because numeric data (price, stock) is stored as text, you cannot perform SQL queries like `SUM(stock)` or `AVG(price)` without significant overhead and parsing.
*   **Validation Risks**: There is no database-level enforcement of numeric values. A user could technically save "Negotiable" in the `price` field, which might break logic expecting a specific format.
*   **Non-Relational**: The listings are not currently linked to a `Farmer` or `Profile`. In a multi-vendor scenario, a `farmer_id` foreign key would be mandatory.

## 4. Recommendations

### Short Term (Optimization)
*   **Status Enum**: Implement a strict list of allowed statuses (Active, Low Stock, Out of Stock, Paused) in the application layer to ensure data consistency.

## 5. Functional Requirements (CRUD Roadmap)

Based on the latest product direction, the Listing module must support the following core operations through dedicated interfaces:

### A. Create Operation (Add Listing)
*   **Interface**: Dedicated page at `/dashboard/listings/new`.
*   **Logic**: Full-screen form with real-time preview.
*   **Fields**: Title, Category, Price, Stock, Min Qty, Delivery Method, and Icon (Emoji).

### B. Read Operation (Management View)
*   **Interface**: Gallery view at `/dashboard/listings`.
*   **Features**: 
    *   Dynamic data retrieval from SQLite via `getListings()`.
    *   Filtering by Status (Active, Inactive, Low Stock).
    *   Search by Title/Category.
    *   Sorting (Recent, Price, Rating).

### C. Update Operation (Edit Listing)
*   **Interface**: Dedicated page at `/dashboard/listings/edit/[id]`.
*   **Logic**: Pre-filled form with current DB values.
*   **Action**: Atomic updates to specific fields with cache invalidation (`revalidatePath`).

### D. Delete Operation
*   **Interface**: "Delete" button on each product card.
*   **Logic**: Destructive action with a confirmation gate to prevent accidental loss.
*   **Action**: Calls `deleteListing(id)` and refreshes the data context.

### E. Analytics & Details (Stats)
*   **Interface**: "Stats" button on product cards.
*   **Function**: Shows performance insights (Total Revenue, Orders, Market Views, and Conversion Trends) for that specific item.

### F. Data Portability (Export)
*   **Interface**: "Export" button in the management header.
*   **Logic**: Client-side CSV generation of the entire inventory for accounting and external backups.
