# 🚀 DevPulse

A collaborative internal issue tracking platform for software teams where contributors can report bugs or feature requests and maintainers can manage issue workflows.

---

# 🌐 Live URL

```bash
https://l2a2-devpulse.vercel.app/api
```

---

# ✨ Features

- User Registration & Login
- JWT Authentication & Authorization
- Role-Based Access Control
- Create Bug Reports & Feature Requests
- Get All Issues with Filtering & Sorting
- Get Single Issue Details
- Update Issues with Permission Validation
- Delete Issues (Maintainer Only)
- Password Hashing using bcrypt
- PostgreSQL Database Integration
- Modular Express Architecture
- Raw SQL Queries

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Server Framework |
| TypeScript | Type Safety |
| PostgreSQL | Relational Database |
| pg | PostgreSQL Driver |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |
| dotenv | Environment Variables |

---

# 📁 Project Structure

```bash
src
│
├── app.ts
├── server.ts
│
├── config
├── db
├── middlewares
├── modules
│   ├── auth
│   └── issues
│
├── types
└── utils
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/md-abu-naim/L2A2-DevPulse.git
```

---

## 2️⃣ Move Into Project

```bash
cd L2A2-DevPulse
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Setup Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_CONNECTION=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

---

## 5️⃣ Run Development Server

```bash
npm run dev
```

---

## 6️⃣ Build Project

```bash
npm run build
```

---

# 🗄️ Database Schema Summary

## 👤 Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| password | TEXT |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## 🐞 Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# 🔐 Authentication

Protected routes require JWT token in headers.

```bash
Authorization: <JWT_TOKEN>
```

---

# 📌 API Endpoints

# 🔹 Auth Routes

## Register User

### POST `/api/auth/signup`

### Request Body

```json
{
  "name": "Mohammad Abu Naim",
  "email": "naim@example.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

---

## Login User

### POST `/api/auth/login`

### Request Body

```json
{
  "email": "naim@example.com",
  "password": "securePassword123"
}
```

---

# 🔹 Issue Routes

## Create Issue

### POST `/api/issues`

### Protected Route

```json
{
  "title": "Database connection timeout",
  "description": "Pool exhausts after multiple concurrent requests",
  "type": "bug"
}
```

---

## Get All Issues

### GET `/api/issues`

### Query Parameters

| Query | Values |
|---|---|
| sort | newest / oldest |
| type | bug / feature_request |
| status | open / in_progress / resolved |

### Example

```bash
/api/issues?sort=newest&type=bug
```

---

## Get Single Issue

### GET `/api/issues/:id`

---

## Update Issue

### PATCH `/api/issues/:id`

### Protected Route

### Rules

- Maintainer can update any issue
- Contributor can update only own issue
- Contributor can update only if status is `open`

---

## Delete Issue

### DELETE `/api/issues/:id`

### Protected Route

### Rules

- Only maintainer can delete issues

---

# 🔒 Security Features

- Passwords hashed using bcrypt
- JWT Authentication
- Role-Based Authorization
- Protected Routes Validation
- Input Validation
- Secure Environment Variables

---

# 📦 Scripts

```json
"scripts": {
    "dev": "tsx watch ./src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

---

# 👨‍💻 Author

### Naim Web Dev
#### Full-stack Developer
