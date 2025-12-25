import express from "express";
import Review from "../models/Review.js";
import requireAdmin from "../auth/middleware/adminAuth.js";

const router = express.Router();

// Public endpoints
router.get("/", async (req, res) => {
  try {
    const { featured, productId } = req.query;
    const query = { active: true };

    if (featured) query.featured = featured === "true";
    if (productId) query.productId = productId;

    const reviews = await Review.find(query).sort({ createdAt: -1 }).populate("productId", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("productId", "name");
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-protected endpoints
router.use(requireAdmin);

router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
