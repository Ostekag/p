const mongoose = require('mongoose');
// Адрес вашей локальной базы данных
// 'test_db' — это название базы, она создастся автоматически
const url = 'mongodb://127.0.0.1:27017/test_db';
async function connect() {
try {
await mongoose.connect(url);
console.log("Успешное подключение к MongoDB!");
} catch (err) {
console.error("Ошибка при подключении:", err);
}
}
connect();