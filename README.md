# LCF Furniture Backend API

Backend API for the LCF Furniture e-commerce platform built with Node.js, Express, and MongoDB. This backend is part of a **three-tier architecture system** consisting of a customer-facing frontend, admin panel, and backend API.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary (image storage)

---

## System Architecture

LCF is designed as a three-tier e-commerce system:

* **Frontend:** Customer-facing Next.js application
* **Backend (this repository):** Business logic, authentication, and database operations
* **Admin Panel:** Product, category, and content management system

This backend serves both frontend and admin panel through REST APIs.

---

## Authentication & Security

* JWT-based authentication for protected routes
* Role-based access control for admin functionality
* CORS configuration for frontend and admin panel access
* Secure environment variable management
* Cloud-based media handling via Cloudinary

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Configure Environment Variables

Create a `.env` file in the backend directory.

#### Required Variables

```env
MONGODB_URI=
PORT=
CORS_ORIGIN=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

#### Local Development Example

```env
MONGODB_URI=mongodb://localhost:27017/lcf-furniture
PORT=5000
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
JWT_SECRET=your_strong_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

#### Production Example (MongoDB Atlas)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lcf-furniture
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com,https://your-admin-domain.com
JWT_SECRET=your_strong_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Database Setup

### Seed Database (optional)

```bash
npm run seed
```

---

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## API Endpoints

### Products

* `GET /api/products` – Get all products (supports filtering & sorting)
* `GET /api/products/:id` – Get single product
* `POST /api/products` – Create product (admin only)
* `PUT /api/products/:id` – Update product (admin only)
* `DELETE /api/products/:id` – Delete product (admin only)
* `GET /api/products/:id/related` – Get related products

---

### Categories

* `GET /api/categories`
* `GET /api/categories/:name`
* `POST /api/categories` (admin only)
* `PUT /api/categories/:id` (admin only)
* `DELETE /api/categories/:id` (admin only)

---

### Reviews

* `GET /api/reviews`
* `GET /api/reviews/:id`
* `POST /api/reviews`
* `PUT /api/reviews/:id`
* `DELETE /api/reviews/:id`

---

### Hero Slides

* `GET /api/hero-slides`
* `POST /api/hero-slides` (admin only)
* `PUT /api/hero-slides/:id` (admin only)
* `DELETE /api/hero-slides/:id`

---

### Page Content

* `GET /api/page-content/:pageName`
* `POST /api/page-content/:pageName` (create/update)

---

## Image Uploads

* Product and hero images are uploaded to **Cloudinary**
* No local file storage is used
* Requires valid Cloudinary credentials in environment variables

---

## Deployment

### Supported Platforms

* Railway
* Render
* Heroku

### Deployment Steps

1. Connect repository to platform
2. Configure environment variables:

   * `MONGODB_URI`
   * `PORT`
   * `CORS_ORIGIN`
   * `JWT_SECRET`
   * `CLOUDINARY_*`
3. Deploy Node.js service

---

## MongoDB Atlas Setup

1. Create cluster at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Configure IP whitelist
4. Copy connection string
5. Add to `MONGODB_URI`

---

## Notes

* Backend is designed for long-running Node.js deployment environments
* Not intended for serverless platforms like Vercel
* Frontend and admin panel consume this API via `NEXT_PUBLIC_API_URL`
* Missing environment variables will prevent server initialization

---

## Result

This backend is part of a full three-tier e-commerce system with authentication, admin controls, and cloud-based media handling.
