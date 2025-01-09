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

## Example Requests

### Login
```bash
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}

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
npm start
