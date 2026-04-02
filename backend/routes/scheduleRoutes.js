const express = require("express");
const Schedule = require("../models/Schedule");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения расписания" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Запись расписания не найдена" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения записи" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { groupName, day, subject, teacher, classroom, time } = req.body;

    const schedule = new Schedule({
      groupName,
      day,
      subject,
      teacher,
      classroom,
      time
    });

    await schedule.save();
    res.status(201).json({ message: "Расписание добавлено", schedule });
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления расписания" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { groupName, day, subject, teacher, classroom, time } = req.body;

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { groupName, day, subject, teacher, classroom, time },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Запись расписания не найдена" });
    }

    res.json({ message: "Расписание обновлено", updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления расписания" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Запись расписания не найдена" });
    }

    res.json({ message: "Расписание удалено" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления расписания" });
  }
});

module.exports = router;