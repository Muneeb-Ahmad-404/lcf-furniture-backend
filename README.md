# LCF Furniture Backend API

Backend API for the LCF Furniture e-commerce platform built with the MERN stack.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (image storage)

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

#### Required Environment Variables

```env
MONGODB_URI=
PORT=
CORS_ORIGIN=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
#### Environment Variables Values
```
MONGODB_URI=mongodb+srv://muneebahmad2005p_db_user:UwUrbNJSXqWLPLbI@cluster0.krai7vd.mongodb.net/?appName=Cluster0
PORT=5000
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
JWT_SECRET=thewheelsonthebusgoesroundandroundallthewaylong
CLOUDINARY_CLOUD_NAME=djzgaprfs
CLOUDINARY_API_KEY=628828355133194
CLOUDINARY_API_SECRET=OmLhmJ1gDs1_R3yM338Uex21EaA
```
---

#### Example: Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/lcf-furniture
PORT=5000
CORS_ORIGIN=http://localhost:3000, http://localhost:3001
JWT_SECRET=your_strong_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

#### Example: MongoDB Atlas (Cloud)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lcf-furniture
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com, https://your-admin-panel-domain.com
JWT_SECRET=your_strong_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 3. Seed the Database

```bash
npm run seed
```

---

### 4. Start the Server

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

---

## API Endpoints

### Products

- `GET /api/products`  
  Retrieve all products (supports filtering and sorting)

- `GET /api/products/:id`  
  Retrieve a single product

- `POST /api/products`  
  Create a new product

- `PUT /api/products/:id`  
  Update a product

- `DELETE /api/products/:id`  
  Delete a product

- `GET /api/products/:id/related`  
  Retrieve related products

---

### Categories

- `GET /api/categories`
- `GET /api/categories/:name`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

---

### Reviews

- `GET /api/reviews`
- `GET /api/reviews/:id`
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

---

### Hero Slides

- `GET /api/hero-slides`
- `GET /api/hero-slides/:id`
- `POST /api/hero-slides`
- `PUT /api/hero-slides/:id`
- `DELETE /api/hero-slides/:id`

---

### Page Content

- `GET /api/page-content/:pageName`  
  Retrieve page content (`home`, `about`, `contact`, etc.)

- `POST /api/page-content/:pageName`  
  Create or update page content

---

## Image Uploads

- Product images and hero slides are uploaded to **Cloudinary**
- Requires valid Cloudinary credentials in environment variables
- Images are stored remotely, not on the server filesystem

---

## Deployment

### Supported Platforms

- Railway
- Render
- Heroku

### Deployment Steps

1. Create an account on the platform
2. Connect the backend GitHub repository
3. Set all required environment variables:
   - `MONGODB_URI`
   - `PORT`
   - `CORS_ORIGIN`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Deploy the service

---

## MongoDB Atlas Setup

1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Whitelist deployment IP
5. Copy the connection string
6. Add it to `MONGODB_URI`

---

## Notes

- This backend must **not** be deployed on Vercel
- Designed for long-running Node.js servers
- Frontend and admin panel should consume the API using `NEXT_PUBLIC_API_URL`
- Missing environment variables will crash the server intentionally

