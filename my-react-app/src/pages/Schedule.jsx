import { useEffect, useState } from "react";
import api from "../services/api";
import "./Schedule.css";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [filters, setFilters] = useState({
    groupName: "",
    subject: "",
    teacher: "",
  });

  // Получаем расписание с backend
  useEffect(() => {
    api
      .get("/schedules")
      .then((res) => {
        setSchedules(res.data);
        setFilteredSchedules(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Применяем фильтры
  useEffect(() => {
    let filtered = schedules;

    if (filters.groupName) {
      filtered = filtered.filter(
        (item) => item.groupName === filters.groupName
      );
    }

    if (filters.subject) {
      filtered = filtered.filter((item) => item.subject === filters.subject);
    }

    if (filters.teacher) {
      filtered = filtered.filter((item) => item.teacher === filters.teacher);
    }

    setFilteredSchedules(filtered);
  }, [filters, schedules]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Получаем уникальные значения для select
  const groups = [...new Set(schedules.map((item) => item.groupName))];
  const subjects = [...new Set(schedules.map((item) => item.subject))];
  const teachers = [...new Set(schedules.map((item) => item.teacher))];

  return (
    <div className="container page">
      <h1 className="hero-title">Расписание</h1>

      {/* Фильтры */}
      <div className="filters">
        <select name="groupName" value={filters.groupName} onChange={handleChange}>
          <option value="">Все группы</option>
          {groups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select name="subject" value={filters.subject} onChange={handleChange}>
          <option value="">Все предметы</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select name="teacher" value={filters.teacher} onChange={handleChange}>
          <option value="">Все преподаватели</option>
          {teachers.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Карточки расписания */}
      <div className="grid">
        {filteredSchedules.length === 0 && <p>Нет занятий по выбранным фильтрам</p>}

        {filteredSchedules.map((item) => (
          <div className="card schedule-card" key={item._id}>
            <h3>{item.subject}</h3>
            <p><b>Группа:</b> {item.groupName}</p>
            <p><b>День:</b> {item.day}</p>
            <p><b>Преподаватель:</b> {item.teacher}</p>
            <p><b>Кабинет:</b> {item.classroom}</p>
            <p><b>Время:</b> {item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;