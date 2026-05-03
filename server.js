import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Public routes
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import reviewRoutes from "./routes/reviews.js";
import heroSlideRoutes from "./routes/heroSlides.js";
import pageContentRoutes from "./routes/pageContent.js";
import contactRoutes from "./routes/contact.js";

// Admin auth routes
import adminAuthRoutes from "./auth/routes/adminAuthRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- Middleware -------------------- */
const allowedOrigins = String(process.env.CORS_ORIGIN).split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- MongoDB -------------------- */

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/lcf-furniture",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

/* -------------------- Routes -------------------- */

// Admin auth (login only)
app.use("/api/admin/auth", adminAuthRoutes);

// Public + admin-protected routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/hero-slides", heroSlideRoutes);
app.use("/api/page-content", pageContentRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend running"
  });
});

/* -------------------- Error handling -------------------- */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

/* -------------------- Server -------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
