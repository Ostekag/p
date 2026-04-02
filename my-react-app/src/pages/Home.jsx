import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="container page">
      <section className="hero">
        <div className="hero-content">
          <span className="badge">Современный цифровой портал колледжа</span>

          <h1>Добро пожаловать в портал колледжа AITU</h1>

          <p>
            Удобное пространство для студентов, преподавателей и абитуриентов:
            новости, объявления, расписание, важная информация и быстрый доступ
            ко всем основным разделам сайта в одном месте.
          </p>

          <div className="hero-actions">
            <Link to="/news" className="primary-btn">
              Смотреть новости
            </Link>

            <Link to="/schedule" className="secondary-btn">
              Открыть расписание
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Почему этот портал удобный</h2>
        <p className="section-text">
          Сайт сделан в современном светлом стиле, чтобы вся важная информация
          была понятной, читаемой и быстро доступной с любого устройства.
        </p>

        <div className="grid">
          <div className="card feature-card">
            <div className="feature-icon">📰</div>
            <h3>Актуальные новости</h3>
            <p>
              Все важные события колледжа, обновления и полезные материалы в
              одном разделе.
            </p>
          </div>

          <div className="card feature-card">
            <div className="feature-icon">📅</div>
            <h3>Удобное расписание</h3>
            <p>
              Быстрый просмотр занятий, групп, преподавателей, кабинетов и
              времени.
            </p>
          </div>

          <div className="card feature-card">
            <div className="feature-icon">📢</div>
            <h3>Объявления</h3>
            <p>
              Важные уведомления и организационная информация для студентов и
              преподавателей.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;