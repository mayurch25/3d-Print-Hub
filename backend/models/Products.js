import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  images: [{ type: String }],
  price: { type: Number, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category: String,
  inStock: { type: Boolean, default: true },
  published: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Products || mongoose.model("Products", ProductSchema);
