import { Router } from "express";
import { connectDB } from "../../../lib/mongodb.js";
import Products from "../../../models/Products.js";
import { authenticate, optionalAuth } from "../../../middleware/auth.js";

const router = Router();

router.get("/", optionalAuth, async (req, res, next) => {
  try {
    await connectDB();
    const filter = req.user ? {} : { published: true };
    const products = await Products.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await connectDB();
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
