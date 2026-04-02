const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // ✅ ОБЯЗАТЕЛЬНО () !!!

mongoose
  .connect("mongodb://127.0.0.1:27017/shop_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Server works ✅");
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Поле name обязательно" });
    }

    const product = await Product.create({ name, price, category });

    res.status(201).json({
      message: "✅ Товар добавлен",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server started on http://localhost:3000");
});