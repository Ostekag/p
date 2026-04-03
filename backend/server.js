const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Подключаем маршруты
// В server.js должно быть так:
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/", (req, res) => {
  res.send("Сервер работает");
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не найден" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});