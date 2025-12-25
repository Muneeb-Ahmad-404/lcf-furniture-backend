import mongoose from "mongoose"

const heroSlideSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

heroSlideSchema.index({ order: 1 })

export default mongoose.model("HeroSlide", heroSlideSchema)
