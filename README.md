#  food delivery system that includes user authentication, menu management, and order tracking.

This is the **backend** repository for the **Menu Management Application**. It provides a robust API for managing menu items, orders, and user authentication using modern technologies and best practices.

---

## 📜 Project Description

The backend is built using **Node.js** and **Express.js** to deliver RESTful APIs for the frontend. It handles user authentication, menu management, and order processing, ensuring a secure and seamless user experience.

---

## 🚀 Features

- **User Authentication**:
  - JWT-based authentication for secure login and protected routes.
  - Middleware to safeguard endpoints for authenticated users only.
  
- **Menu Management**:
  - Create, update, delete, and retrieve menu items.
  - Search and filter menu items by name, category, or availability.

- **Order Management**:
  - Place orders with cart details.
  - Retrieve user-specific order history.
  - Support for dynamic pagination and filtering.

- **CORS Handling**:
  - Properly configured CORS to support both development and production environments.

- **Error Handling**:
  - Centralized error handling for consistent API responses.

---

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Token-based authentication.
- **dotenv**: Environment variable management.
- **Body-parser**: Parsing incoming request bodies.
- **Cors**: Cross-Origin Resource Sharing middleware.

---
# Features Overview

## 1. Authentication

### Endpoints:
- **POST /api/login**: User login.
- **POST /api/register**: User registration.

### Middleware:
- **protectRoute**: Protects endpoints by verifying JWT tokens.  
  This middleware ensures that only authenticated users can access protected routes.

---

## 2. Menu Management

### Endpoints:
- **GET /api/menu**: Fetch paginated menu items.
- **POST /api/menu**: Create a new menu item. _(Protected)_
- **PUT /api/menu/:id**: Update an existing menu item. _(Protected)_
- **DELETE /api/menu/:id**: Delete a menu item. _(Protected)_

### Search:
- **GET /api/menu/search**: Search menu items by name or category.

---

## 3. Order Management

### Endpoints:
- **GET /api/orders**: Fetch user-specific orders. _(Protected)_
- **POST /api/orders**: Place an order. _(Protected)_

---

## Authentication & Authorization

For any **protected** routes, a valid JWT token must be included in the request header to gain access. This ensures secure access control.

## 🛡️ Assumptions, Challenges, and Limitations

### Assumptions
- Each user manages their own tasks and orders independently.
- Authentication tokens are securely stored in the frontend and sent in Authorization headers.
- Menu categories are predefined (e.g., "Main Course", "Desserts").

### Challenges
- Properly handling CORS for both development and production environments.
- Implementing efficient search and pagination for large datasets.
- Ensuring secure user authentication and data validation.

### Limitations
- The backend currently does not support role-based access control (e.g., admin vs user).
- No caching is implemented for frequently accessed endpoints, which might lead to slower response times for large datasets.

## 🐛 Common Errors & Solutions

### 1. MongoDB Connection Error
- **Error**: Failed to connect to MongoDB
- **Solution**: Check your `MONGO_URL` in `.env`. Ensure your MongoDB instance is running.

### 2. CORS Policy Error
- **Error**: Access-Control-Allow-Origin header missing.
- **Solution**: Verify `corsOptions` in `server.js` includes the frontend URL.

### 3. JWT Authentication Error
- **Error**: Unauthorized
- **Solution**: Ensure a valid JWT token is sent in the Authorization header.

## 🔧 Setup Instructions

Follow these steps to set up the backend locally:

### **1. Clone the repository**
```bash
https://github.com/CodeSciRahul/full-stack-task-management-app-backend.git

### **2. Install Dependency**
```bash
npm install

### **3. Configure environment variables
Create a .env file in the root directory and add the following environment variables:
```bash
PORT=5000
MONGO_URL=your-mongo-db-connection-string
SECERT_KEY=your-jwt-secret-key

### **4. Start Server
```bash
node server.js
