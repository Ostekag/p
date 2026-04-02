import { useEffect, useState } from "react";
import api from "../services/api";
import "./News.css"; // стили для страницы

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container page">
      {/* Крупный заголовок */}
      <h1 className="hero-title">Новости</h1>

      {/* Пустой список */}
      {news.length === 0 && <p>Новостей пока нет</p>}

      {/* Сетка новостей */}
      <div className="grid">
        {news.map((item) => (
          <div key={item._id} className="card news-card">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;