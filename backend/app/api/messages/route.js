import { Router } from "express";
import { connectDB } from "../../../lib/mongodb.js";
import Messages from "../../../models/Messages.js";
import { authenticate } from "../../../middleware/auth.js";

const router = Router();

// Public — anyone can submit a product inquiry
router.post("/", async (req, res, next) => {
  try {
    await connectDB();
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "name, email and message are required" });

    const inquiry = await Messages.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    next(err);
  }
});

// Protected — admin reads all messages
router.get("/", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const messages = await Messages.find()
      .populate("productId", "name imageUrl")
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const msg = await Messages.findById(req.params.id).populate("productId", "name imageUrl");
    if (!msg) return res.status(404).json({ error: "Message not found" });
    res.json(msg);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const msg = await Messages.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!msg) return res.status(404).json({ error: "Message not found" });
    res.json(msg);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    await connectDB();
    const msg = await Messages.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
