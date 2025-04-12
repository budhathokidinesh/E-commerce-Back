# 🛒 E-commerce Backend

A scalable and modular Express.js-based backend for an e-commerce platform. It supports authentication, admin management, shopping functionalities, order processing, reviews, and PayPal payment integration.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** (JWT + Cookies)
- 🛍️ **Shopping APIs** (products, cart, address, orders)
- 🧑‍💼 **Admin APIs** (product & order management)
- 💬 **Product Reviews**
- 💳 **PayPal Payment Integration**
- 🌐 **CORS Enabled for Frontend**
- 🗂️ Organized Codebase with Clean Separation of Concerns

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT, Cookies
- **Payments**: PayPal
- **Deployment**: Render.com

---

## 📁 Folder Structure

```bash
E-Commerce-Back/
├─ src/
│  ├─ config/
│  │  └─ dbConfig.js
│  ├─ controllers/
│  │  ├─ admin/
│  │  │  ├─ adminOrderController.js
│  │  │  └─ productsControllers.js
│  │  ├─ auth/
│  │  │  └─ authController.js
│  │  ├─ common/
│  │  │  └─ featureController.js
│  │  └─ shopping/
│  │     ├─ addressController.js
│  │     ├─ cartController.js
│  │     ├─ orderController.js
│  │     ├─ productReviewController.js
│  │     ├─ productsController.js
│  │     └─ searchController.js
│  ├─ helpers/
│  │  ├─ cloudinary.js
│  │  └─ paypalClient.js
│  ├─ middlewares/
│  │  └─ responseClient.js
│  ├─ models/
│  │  ├─ Address.js
│  │  ├─ Cart.js
│  │  ├─ Features.js
│  │  ├─ Order.js
│  │  ├─ ProductModel.js
│  │  ├─ Reviews.js
│  │  └─ User.js
│  └─ routes/
│     ├─ admin/
│     │  ├─ orderRoute.js
│     │  └─ productRoute.js
│     ├─ auth/
│     │  └─ authRoutes.js
│     ├─ commonRoute/
│     │  └─ featureRoute.js
│     └─ shopping/
│        ├─ addressRoute.js
│        ├─ cartRoute.js
│        ├─ orderRoute.js
│        ├─ reviewRoute.js
│        ├─ searchRoute.js
│        └─ shopProductRoute.js
├─ .env
├─ .gitignore
├─ file_tree.text
├─ package.json
├─ server.js
└─ yarn.lock
```

## 🧪 API Overview

### Base URL

https://e-commerce-back-a9pp.onrender.com/api/

### Auth Routes

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/logout`

### Admin Routes

- `GET /admin/products`
- `POST /admin/products`
- `GET /admin/orders`

### Shop Routes

- `GET /shop/products`
- `POST /shop/cart`
- `POST /shop/address`
- `POST /shop/order`
- `POST /shop/review`
- `GET /shop/search?q=...`

---

## 💳 Payment Integration

- **PayPal Checkout** integrated using `@paypal/checkout-server-sdk`.

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/budhathokidinesh/E-commerce-Back.git
cd E-commerce-Back
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a .env file and include:

```PORT=8000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 4. Run the server

```
yarn dev
```

### 5. CORS Setup

http://localhost:5173

If yoou are hosting frontend from other hosting sites then don't forget to change the domain name.

Front-end code is available here https://github.com/budhathokidinesh/E-commerce-Front.git

### 📄 License

This project is open source and available under the MIT License.

### ✨ Author

Made with ❤️ by Dinesh Budhathoki
