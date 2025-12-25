import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,
    },
    tag: {
      type: String,
      enum: ["New", "Hot", "Sale", ""],
      default: "",
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: [
      {
        label: String,
        value: String,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
productSchema.index({ category: 1, featured: 1 })
productSchema.index({ name: "text", description: "text" })

export default mongoose.model("Product", productSchema)
