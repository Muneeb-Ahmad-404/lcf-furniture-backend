

---

````md
# LCF Furniture Backend API

MERN stack backend for the LCF Furniture e-commerce platform.

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
````

---

### 2. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

#### Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/lcf-furniture
PORT=5000
```

#### MongoDB Atlas (Cloud)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lcf-furniture
PORT=5000
```

---

### 3. Seed the Database

```bash
npm run seed
```

---

### 4. Start the Server

#### Development mode (auto-restart)

```bash
npm run dev
```

#### Production mode

```bash
npm start
```

---

## API Endpoints

### Products

* `GET /api/products`
  Get all products (supports filtering, sorting)

* `GET /api/products/:id`
  Get a single product

* `POST /api/products`
  Create a new product

* `PUT /api/products/:id`
  Update a product

* `DELETE /api/products/:id`
  Delete a product

* `GET /api/products/:id/related`
  Get related products

---

### Categories

* `GET /api/categories`
* `GET /api/categories/:name`
* `POST /api/categories`
* `PUT /api/categories/:id`
* `DELETE /api/categories/:id`

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
* `GET /api/hero-slides/:id`
* `POST /api/hero-slides`
* `PUT /api/hero-slides/:id`
* `DELETE /api/hero-slides/:id`

---

### Page Content

* `GET /api/page-content/:pageName`
  Retrieve content for pages like `about`, `contact`, `home`

* `POST /api/page-content/:pageName`
  Create or update page content

---

## Deployment

### Deploy to Railway / Render / Heroku

1. Create an account on your chosen platform
2. Connect the backend GitHub repository
3. Set environment variables:

   * `MONGODB_URI`
   * `PORT`
4. Deploy the service

---

## MongoDB Atlas Setup

1. Create an account at
   [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Whitelist your deployment IP
5. Copy the connection string
6. Add it to your backend environment variables

---

## Notes

* This backend **must not** be deployed on Vercel
* Use Railway or Render for stable long-running Node servers
* Frontend and admin panel should consume this API via `NEXT_PUBLIC_API_URL`

```

---

### Why your original looked “wrong”

- Random trailing `#` at the end breaks Markdown rendering
- No section separators, so everything collapsed visually
- Inconsistent code fences
- Atlas example mixed with local config
- Markdown renderers are strict, not sympathetic

This version will render correctly on:
- GitHub
- GitLab
- Vercel
- Railway
- Any Markdown viewer that isn’t drunk

Now the README is not the problem anymore. The tooling chaos is.
```
