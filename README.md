task-management-system(OMS_Assignment)

# Clone the repo locally
git clone https://github.com/miteshpr97/OMS_Assignment.git

# Navigate into the project
cd OMS_Assignment

# Task Management System

A full-stack **Task Management System** built with **React.js** on the frontend and **Node.js/Express.js** on the backend, using **MySQL** for database storage. The system supports user authentication, task creation, assignment, notifications via Twilio (SMS and WhatsApp), and file uploads via Cloudinary.

---

## 📂 Project Structure

OMS_Assignment/
│
├── client/ # Frontend (React.js + Vite)
└── server/ # Backend (Node.js + Express + MYSQL)


---

## ✅ Features

- User Registration and Login
- Task Creation, Assignment, and Status Updates
- Role-based Access (Admin & Employee)
- Real-time Notifications (SMS & WhatsApp via Twilio)
- File/Image Upload (via Cloudinary)
- Secure API with JWT Authentication

---

## 🌐 Live Demo

> _Coming soon or link your deployed URL here (e.g., Vercel + Render)_

---

## 🔑 .env Example

Create a `.env` file in the `/server` directory with the following variables:

```env
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name

SECRET_KEY=your-secret-jwt-key

ACCOUNT_SID=your-twilio-account-sid
AUTHTOKEN=your-twilio-auth-token
TWILIOPHONENUMBERFORWHATSAPP=whatsapp:+1415XXXXXXX
TWILIOPHONENUMBERFORSMS=+1415XXXXXXX

CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
