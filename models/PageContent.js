import mongoose from "mongoose"

const pageContentSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
      enum: ["about", "contact", "home"],
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("PageContent", pageContentSchema)
