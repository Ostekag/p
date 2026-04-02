const express = require("express");
const News = require("../models/News");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения новостей" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "Новость не найдена" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения новости" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const newNews = new News({
      title,
      content,
      image
    });

    await newNews.save();
    res.status(201).json({ message: "Новость добавлена", newNews });
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления новости" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "Новость не найдена" });
    }

    res.json({ message: "Новость обновлена", updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления новости" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return res.status(404).json({ message: "Новость не найдена" });
    }

    res.json({ message: "Новость удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления новости" });
  }
});

module.exports = router;