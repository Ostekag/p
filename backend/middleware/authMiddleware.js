const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Получаем заголовок
  const authHeader = req.header("Authorization");
  
  // Достаем токен (Bearer <token>)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещен" });
  }

  try {
    // Проверяем токен тем же ключом из .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ВАЖНО: записываем данные в req.user, чтобы маршрут /profile их увидел
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Токен невалиден" });
  }
};