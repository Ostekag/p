import { useEffect, useState } from "react";
import { getAnnouncements } from "../api/announcementApi";
import "./Announcements.css"; // файл стилей

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAnnouncements();
        setAnnouncements(res.data);
      } catch (err) {
        console.log("Ошибка получения объявлений:", err.response?.data);
        setError("Не удалось загрузить объявления");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="loading">Загрузка объявлений...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container page">
  <h1 className="hero-title">Объявления</h1>  {/* добавляем класс hero-title */}
  
  {announcements.length === 0 && <p>Объявлений пока нет</p>}

  <div className="grid">
    {announcements.map((item) => (
      <div key={item._id} className="card announcement-card">
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <small>{new Date(item.createdAt).toLocaleString()}</small>
      </div>
    ))}
  </div>
</div>
  );
}

export default Announcements;