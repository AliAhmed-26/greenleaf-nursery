# 🌿 GreenLeaf Nursery

A full-stack **MERN e-commerce** application for a modern online plant nursery featuring secure authentication, AI-powered plant recommendations, an admin dashboard, OTP email verification, and a complete shopping experience.

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Context API
- Custom Hooks
- CSS
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication & Security

- JWT
- bcrypt
- Cookie Parser
- Express Validator
- Express Rate Limit

---

## AI

- Google Gemini API

---

## Email Service

- Resend API

---

## 🚀 Live Demo

🌐 https://greenleaf-nursery.vercel.app

---

## 📸 Preview

> Add screenshots or GIFs here

- Home Page
- Shop
- Product Details
- Cart
- Checkout
- Admin Dashboard
- AI Recommendation

---

# ✨ Features

## 🔒 Security Features

- JWT Authentication
- Access Token
- Refresh Token
- Password Hashing (bcrypt)
- Role-Based Authorization
- Protected Routes
- Cookie Parser
- Express Rate Limiting
- Input Validation

---

## 👤 User

- Browse Products
- Category Filtering
- Shopping Cart
- Checkout
- Place Orders
- View Order History
- AI Plant Recommendation Assistant

---

## 👨‍💼 Admin

- Dashboard
- Product Management ( **CRUD** )
<!-- - Add Products
- Edit Products
- Delete Products -->
- Upload Product Images
- View Recent Orders
- View Recent Customers
- Low Stock Monitoring
- Update Order Status

---

# 🤖 AI Integration

Integrated **Google Gemini API** to provide intelligent plant recommendations and assistance.

Examples:

- Recommend indoor plants
- Suggest low-maintenance plants
- Plant care guidance
- General gardening questions

---

## 📧 Email Integration

OTP verification is implemented using the **Resend API**, allowing users to securely verify their email addresses during authentication.

---

# 📂 Project Structure

```
GreenLeaf-Nursery
│
├── frontend
│   └── src
│       ├── components
│       ├── hooks
│       └── routes
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   └── public
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/AliAhmed-26/greenleaf-nursery.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
node --watch server.js
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_Access_SECRET=your_access_secret

JWT_Refresh_SECRET=your_refresh_secret

GEMINI_API_KEY=your_gemini_api_key

RESEND_API_KEY=your_resend_api_key

```
---

# 🚀 Major Functionalities

- Authentication System
- Refresh Token Flow
- OTP Verification
- AI Chat Assistant
- Admin Dashboard
- Product CRUD
- Image Upload
- Shopping Cart
- Checkout
- Order Management
- Rate Limiting
- Protected Routes

---

# 👨‍💻 Author

**Ali Ahmed**

BS Computer Science Student

---

# 📜 License

This project is intended for educational and portfolio purposes.