import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  imageUrl: String,
  price: { type: Number, min: 0 },
  category: String,
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Products || mongoose.model("Products", ProductSchema);
