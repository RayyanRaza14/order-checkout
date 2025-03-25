import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

app.post("/api/orders", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({ items, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Instead of app.listen(), export the app for Vercel
export default app;
