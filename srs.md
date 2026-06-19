# Software Requirements Specification (SRS)
## Project: Tunda Gula

> **Generated via Automated Documentation Pipeline**
> *Focus: Living documentation derived from codebase configuration and specifications.*

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to define the software requirements for the Tunda Gula platform. This SRS serves as a living document reflecting the state of the Next.js and SQLite implementation. It provides developers, stakeholders, and product managers with a clear blueprint of the system's functional and non-functional requirements.

### 1.2 Scope
Tunda Gula is a localized digital marketplace and dashboard designed to connect local farmers directly with commercial buyers (such as restaurants). The system enables farmers to manage inventory (produce listings), track incoming orders, schedule future harvests, and maintain a public-facing digital storefront. 

### 1.3 Definitions, Acronyms, and Abbreviations
- **UI**: User Interface
- **CRUD**: Create, Read, Update, Delete
- **App Router**: The modern routing architecture provided by Next.js.
- **Server Actions**: Asynchronous server-side functions in Next.js used for data mutations.
- **SQLite**: A C-language library that implements a small, fast, self-contained SQL database engine.

---

## 2. Overall Description

### 2.1 Product Perspective
Tunda Gula operates as a standalone web application utilizing a monolithic architecture for the MVP/Prototyping phase. The frontend and backend are tightly integrated within the Next.js framework, persisting data directly to the local filesystem using SQLite 3.

### 2.2 User Classes and Characteristics
1. **Farmers**: The primary users of the dashboard. They need a simple, mobile-responsive UI to manage listings, accept/decline orders, and plan harvests.
2. **Buyers (Restaurants/Wholesalers)**: Users who view public profiles and listings to place orders for fresh produce.
3. **Administrators**: System maintainers with access to the `/admin` routes to monitor overall platform health and resolve disputes.

### 2.3 Operating Environment
- **Browser**: Modern web browsers (Chrome, Firefox, Safari, Edge) supporting ES6 and modern CSS.
- **Server**: Node.js environment (v18+) capable of running SQLite.
- **Deployment**: Virtual Private Server (VPS) or containerized environment (Docker) with persistent block storage (not compatible with ephemeral serverless environments like standard Vercel configurations).

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### FR1: Authentication & Authorization
- **FR1.1**: The system shall provide an onboarding `/registration` flow for new farmers.
- **FR1.2**: Access to the `/(dashboard)` route group must be restricted to authenticated sessions.
- **FR1.3**: Administrators must have a separate elevated access level to view `/admin` routes.

#### FR2: Farmer Profile Management
- **FR2.1**: Farmers shall be able to update their farm name, location, and bio.
- **FR2.2**: The system shall generate a dynamic public storefront for each profile.
- **FR2.3**: The system shall dynamically calculate a "profile completion" percentage based on missing data fields.

#### FR3: Listing (Inventory) Management
- **FR3.1**: Farmers shall be able to create new produce listings (Title, Category, Price, Icon).
- **FR3.2**: Farmers shall be able to toggle the status of a listing between "Active" and "Inactive".
- **FR3.3**: Changes to listings must reflect immediately on the public storefront.

#### FR4: Order Processing
- **FR4.1**: The system shall record new orders placed by buyers into the `orders` table.
- **FR4.2**: Farmers shall be able to update order statuses (e.g., Pending -> Accepted -> Completed).
- **FR4.3**: Completed orders shall increment the farmer's `earnings_month` metric.

#### FR5: Harvest Scheduling
- **FR5.1**: Farmers shall be able to input predictive harvest dates and projected yields.
- **FR5.2**: The system shall display future harvests in a calendar or list format.

### 3.2 Non-Functional Requirements

#### NFR1: Performance
- **NFR1.1**: The dashboard must render initial data within 1.5 seconds on a 3G network.
- **NFR1.2**: Database reads must utilize SQLite WAL mode to ensure UI responsiveness during concurrent write operations.

#### NFR2: Security
- **NFR2.1**: All Server Actions must utilize parameterized SQL queries to entirely mitigate SQL Injection vectors.
- **NFR2.2**: The `database.db` file must never be exposed publicly via the Next.js `public/` directory.

#### NFR3: Reliability
- **NFR3.1**: The system shall gracefully handle SQLite locking errors with automated retries.
- **NFR3.2**: Daily automated backups of the `database.db` file must be executed on the host OS.

#### NFR4: Usability
- **NFR4.1**: The UI must be fully responsive, targeting mobile-first design as farmers primarily access the portal via mobile devices.
- **NFR4.2**: Use of clear iconography (Lucide React) must be prevalent to assist low-literacy users.

---

## 4. System Interfaces

### 4.1 User Interfaces
The UI is styled using vanilla CSS, mapped to semantic utility classes for a clean, consistent aesthetic. Key interfaces include:
- `Sidebar.tsx` / `Topbar.tsx`: Persistent navigation components.
- Dashboard Data Tables: Reusable UI components for displaying listings and orders.

### 4.2 Software Interfaces
- **SQLite Database API**: Integration via `sqlite` and `sqlite3` npm packages.
- **Next.js App Router API**: Integration utilizing Server Actions (`src/app/actions.ts`) and path revalidation (`revalidatePath`).

### 4.3 Future Hardware/External Interfaces (Phase 5)
- **MTN Mobile Money API**: RESTful integration for payout processing.
- **SMS Gateway API**: Webhook integration for real-time offline alerts.

---

## 5. Automation and CI/CD

- **Linting**: Automated enforcement of TypeScript strict mode and Next.js best practices via `next lint`.
- **Testing**: Future implementation of Playwright for End-to-End testing of critical user journeys (e.g., placing an order).

---
*End of SRS Document.*
