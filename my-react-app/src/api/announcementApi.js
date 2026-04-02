import api from "../services/api";

// Получить все объявления
export const getAnnouncements = () => api.get("/announcements");