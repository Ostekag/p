const express = require("express");
const Announcement = require("../models/Announcement");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения объявлений" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Объявление не найдено" });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения объявления" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const announcement = new Announcement({
      title,
      content,
      category
    });

    await announcement.save();
    res.status(201).json({ message: "Объявление добавлено", announcement });
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления объявления" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Объявление не найдено" });
    }

    res.json({
      message: "Объявление обновлено",
      updatedAnnouncement
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления объявления" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Объявление не найдено" });
    }

    res.json({ message: "Объявление удалено" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления объявления" });
  }
});

module.exports = router;