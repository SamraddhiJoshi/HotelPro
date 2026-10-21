# HotelPro - MERN Stack Hotel Booking System

[![React](https://img.shields.io/badge/React-18.3.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-FFCC00?logo=json-web-tokens)](https://jwt.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)

**A modern, full‑stack hotel booking platform built with the MERN stack.**
It delivers a sleek, responsive UI for guests to discover rooms, book stays, and manage reservations, while providing admins with a powerful dashboard for full CRUD control.

---

## 📷 Application Screenshots

<table>
  <tr>
    <td align="center"><img src="./assets/homepage.png" width="400" alt="Home & Room Search"/><br/>Home & Room Search Page</td>
    <td align="center"><img src="./assets/roomdetail.png" width="400" alt="Room Detail & Booking"/><br/>Room Detail & Booking View</td>
  </tr>
  <tr>
    <td align="center"><img src="./assets/mybookings.png" width="400" alt="User Booking History"/><br/>User Booking History & Status</td>
    <td align="center"><img src="./assets/admin-dashboard.png" width="400" alt="Admin Management Dashboard"/><br/>Admin Management Dashboard</td>
  </tr>
</table>

> **NOTE** – The images above are placeholders. Replace them with actual screenshots placed in the `assets/` folder.

---

## 🚀 Key Features

### User Features
- **Secure Authentication** – JWT‑based login & registration with bcrypt password hashing.
- **Room Search & Filtering** – Browse available rooms, filter by price, capacity, and dates.
- **Interactive Booking Workflow** – Select dates, view price calculation, confirm, then pay.
- **Profile Management** – View and edit personal information.
- **Booking Management** – View upcoming bookings, cancel if needed.
- **Review Submission** – Leave a rating and comment for completed stays.

### Admin Features
- **Dashboard Metrics** – Quick overview of total rooms, bookings, and users.
- **Room CRUD** – Create, update, delete rooms with image support.
- **Booking Approval & Cancellation** – Change booking status (e.g., confirm, cancel).
- **User Role Management** – Promote or demote users between `user` and `admin` roles.
- **Protected Admin Routes** – Role‑based access control ensures only admins can reach admin endpoints.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, Context API, Axios, React Router v6, Tailwind CSS (or vanilla CSS) |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose |
| **Security** | JSON Web Tokens (JWT), bcryptjs, protected middleware, RBAC |
| **DevOps**   | Git, GitHub Actions (CI), Docker (optional) |

The application follows a classic **client‑server** architecture with a thin API layer (`/api/*`) serving JSON data.

---

## 📂 Project Structure

```
HotelPro/
├─ client/                     # React frontend
│  ├─ public/                 # Static assets (index.html, favicon, ...)
│  └─ src/
│     ├─ components/          # UI components (Navbar, Footer, Card, ...)
│     ├─ context/             # AuthContext (React Context API)
│     ├─ pages/               # Route pages (Home, Login, Rooms, …)
│     ├─ pages/admin/         # Admin section pages
│     ├─ services/            # Axios instance & API helpers
│     └─ index.js, App.js
├─ server/                     # Express backend
│  ├─ config/                 # DB connection config
│  ├─ controllers/            # Business logic for each domain
│  ├─ middleware/             # auth, error handling, validation
│  ├─ models/                 # Mongoose schemas (User, Room, Booking…)
│  ├─ routes/                 # Express routers (auth, rooms, bookings…)
│  └─ server.js               # Entry point
├─ assets/                     # Placeholder screenshots for README
├─ .gitignore                  # Ignored files & folders
├─ README.md                   # *You are reading it now*
└─ package.json (root)        # Optional scripts for full‑stack install
```

---

## 🏁 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v20 or later) – [download](https://nodejs.org/)
- **npm** (comes with Node) or **yarn**
- **MongoDB** (local instance or Atlas account) – ensure a connection string is available

### Clone the repository
```bash
git clone https://github.com/SamraddhiJoshi/HotelPro.git
cd HotelPro
```

### Install dependencies
You can install both client and server in one step:
```bash
# From the root directory
npm run install-all   # (or use the script defined in package.json)
```
If the script is not present, install manually:
```bash
# Server
cd server
npm install
# Client
cd ../client
npm install
```

### Environment variables
Create `.env` files based on the provided examples:

#### Server `.env.example`
```dotenv
MONGO_URI=mongodb://localhost:27017/hotelpro
JWT_SECRET=your_jwt_secret_here
PORT=5000
```
Copy it to `server/.env` and replace the values as needed.

#### Client `.env.example`
```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```
Copy it to `client/.env`.

### Running the application
```bash
# In one terminal – start the backend
cd server
npm run dev    # Starts Express on http://localhost:5000

# In another terminal – start the frontend
cd client
npm start      # Starts React dev server on http://localhost:3000
```
The frontend is configured to proxy API requests to the backend (CORS enabled for `http://localhost:3000`).

---

## 📡 API Endpoint Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| **Auth** |
| POST   | `/api/auth/register` | Public | Register a new user (name, email, password) |
| POST   | `/api/auth/login`    | Public | Login and receive a JWT |
| GET    | `/api/auth/me`       | Protected | Get current user profile |
| **Rooms** |
| GET    | `/api/rooms`         | Public | List all rooms (with optional query filters) |
| GET    | `/api/rooms/:id`     | Public | Get details for a single room |
| POST   | `/api/rooms`         | Admin  | Create a new room |
| PUT    | `/api/rooms/:id`     | Admin  | Update room information |
| DELETE | `/api/rooms/:id`     | Admin  | Delete a room |
| GET    | `/api/rooms/stats`   | Admin  | Summary statistics (rooms count, occupancy, …) |
| **Bookings** |
| POST   | `/api/bookings`          | Protected | Create a new booking (roomId, dates) |
| GET    | `/api/bookings/my`       | Protected | List bookings for the logged‑in user |
| GET    | `/api/bookings`          | Admin     | List **all** bookings |
| POST   | `/api/bookings/:id/cancel` | Protected | Cancel a booking (owner or admin) |
| PUT    | `/api/bookings/:id/status` | Admin     | Update booking status (e.g., confirmed, cancelled) |
| **Payments** |
| POST   | `/api/payments/process`   | Protected | Mock payment processing, creates a Payment record |
| GET    | `/api/payments/:bookingId`| Admin     | Retrieve payment details for a booking |
| **Reviews** |
| POST   | `/api/reviews`            | Protected | Add a review for a room |
| GET    | `/api/reviews/room/:roomId`| Public   | Get all reviews for a specific room |


