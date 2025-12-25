import express from "express";
import PageContent from "../models/PageContent.js";
import requireAdmin from "../auth/middleware/adminAuth.js";

const router = express.Router();

// Public
router.get("/", async (req, res) => {
  try {
    const pages = await PageContent.find({});
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pageName", async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageName: req.params.pageName });
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-protected
router.use(requireAdmin);

router.post("/", async (req, res) => {
  try {
    const page = new PageContent(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const page = await PageContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
