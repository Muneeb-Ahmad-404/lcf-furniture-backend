import express from "express"
import HeroSlide from "../models/HeroSlide.js"
import requireAdmin from "../auth/middleware/adminAuth.js"
import multer from "multer"
import cloudinary from "../utils/cloudinary.js"

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
})

// helpers
const parseNumber = (value, fallback = 0) => {
  const n = Number(value)
  return Number.isNaN(n) ? fallback : n
}

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value
  if (typeof value === "string") return value === "true"
  return false
}

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "hero-slides" }, (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      })
      .end(buffer)
  })
}

// Public
router.get("/", async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({ order: 1 })
    res.json(slides)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id)
    if (!slide) return res.status(404).json({ error: "Hero slide not found" })
    res.json(slide)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin only
router.use(requireAdmin)

router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer)
    }

    if (!imageUrl && req.body.imageUrl) {
      imageUrl = req.body.imageUrl
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Hero image is required" })
    }

    const slide = new HeroSlide({
      link: imageUrl,
      title: req.body.title || "",
      order: parseNumber(req.body.order),
      active: parseBoolean(req.body.active),
    })

    await slide.save()
    res.status(201).json(slide)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!slide) return res.status(404).json({ error: "Hero slide not found" })
    res.json(slide)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id)
    if (!slide) return res.status(404).json({ error: "Hero slide not found" })
    res.json({ message: "Hero slide deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
