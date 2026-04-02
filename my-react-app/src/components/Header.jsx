import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <h2>AITU College Portal</h2>

        <nav>
          <Link to="/">Главная</Link>
          <Link to="/about">О колледже</Link>
          <Link to="/news">Новости</Link>
          <Link to="/announcements">Объявления</Link>
          <Link to="/schedule">Расписание</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;