# SchemeSaathi Platform - Architecture & Microservices

SchemeSaathi is a multi-tier welfare discovery platform designed with **2 Frontends**, **2 Backends**, and **MongoDB**.

---

## 📁 Repository Structure

```
untitled-folder/
├── user-frontend/      # 1. User Portal (React + Vite) - Port 5173
├── admin-frontend/     # 2. Admin Dashboard (React + Vite) - Port 5174
├── user-backend/       # 3. User Express + MongoDB API - Port 5000
└── admin-backend/      # 4. Admin Express + MongoDB API - Port 5001
```

---

## 🚀 How to Run the Project

### 1. User Frontend (Port 5173)
```bash
npm run dev:user-frontend
# OR
cd user-frontend && npm run dev
```

### 2. Admin Frontend (Port 5174)
```bash
npm run dev:admin-frontend
# OR
cd admin-frontend && npm run dev
```

### 3. User Backend (Port 5000)
```bash
npm run dev:user-backend
# OR
cd user-backend && npm run dev
```

### 4. Admin Backend (Port 5001)
```bash
npm run dev:admin-backend
# OR
cd admin-backend && npm run dev
```

---

## 🍃 MongoDB Setup

Both backends use **Mongoose** to connect to MongoDB.

- Default Connection URI: `mongodb://localhost:27017/schemesaathi`
- Environmental variable override: `MONGO_URI` in `.env` file within `user-backend/` and `admin-backend/`.

### Collections:
- `schemes`: Created and updated by `admin-backend`, read & searched by `user-backend`.
- `users`: User profiles stored by `user-backend`, accessible for review by `admin-backend`.
- `adminusers`: Admin accounts & credentials for `admin-backend`.
