import express from "express";
import HeroSlide from "../models/HeroSlide.js";
import requireAdmin from "../auth/middleware/adminAuth.js";

const router = express.Router();


// Public endpoints
router.get("/", async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ error: "Hero slide not found" });
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-protected endpoints
router.use(requireAdmin);

router.post("/", async (req, res) => {
  try {
    const slide = new HeroSlide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!slide) return res.status(404).json({ error: "Hero slide not found" });
    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ error: "Hero slide not found" });
    res.json({ message: "Hero slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
