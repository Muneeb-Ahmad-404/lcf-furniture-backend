import express from "express"
import Product from "../models/Product.js"
import requireAdmin from "../auth/middleware/adminAuth.js"
import multer from "multer"
import cloudinary from "../utils/cloudinary.js"

const router = express.Router()

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() })

/* =========================
   Helpers
========================= */

const parseBoolean = (value) => value === "true" || value === true

const parseNumber = (value) => {
  if (value === undefined || value === "") return undefined
  return Number(value)
}

const parseJSON = (value, fallback) => {
  if (!value) return fallback
  if (typeof value === "object") return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error)
        else resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })

/* =========================
   Public Routes
========================= */

router.get("/", async (req, res) => {
  try {
    const { category, featured, tag, search, sort, page = 1, limit = 12 } = req.query

    const query = {}
    if (category) query.category = category.toLowerCase()
    if (featured) query.featured = featured === "true"
    if (tag) query.tag = tag
    if (search) query.$text = { $search: search }

    let sortOption = { createdAt: -1 }
    if (sort === "price-asc") sortOption = { price: 1 }
    if (sort === "price-desc") sortOption = { price: -1 }
    if (sort === "name") sortOption = { name: 1 }

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const count = await Product.countDocuments(query)

    res.json({
      products,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id/related", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4)

    res.json(relatedProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/* =========================
   Admin Routes
========================= */

router.use(requireAdmin)

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" })
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer)

    const product = new Product({
      name: req.body.name,
      imageUrl,
      price: parseNumber(req.body.price),
      oldPrice: parseNumber(req.body.oldPrice),
      category: req.body.category,
      tag: req.body.tag || "",
      description: req.body.description,
      specifications: parseJSON(req.body.specifications, []),
      inStock: parseBoolean(req.body.inStock),
      featured: parseBoolean(req.body.featured),
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
})

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: parseNumber(req.body.price),
      oldPrice: parseNumber(req.body.oldPrice),
      category: req.body.category,
      tag: req.body.tag || "",
      description: req.body.description,
      specifications: parseJSON(req.body.specifications, []),
      inStock: parseBoolean(req.body.inStock),
      featured: parseBoolean(req.body.featured),
    }

    if (req.file) {
      updateData.imageUrl = await uploadToCloudinary(req.file.buffer)
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!product) return res.status(404).json({ error: "Product not found" })

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
})

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })

    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0]
      await cloudinary.uploader.destroy(`products/${publicId}`)
    }

    await product.deleteOne()
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export default router
