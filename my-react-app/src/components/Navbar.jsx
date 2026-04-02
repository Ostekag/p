import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // обновляем state
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container nav">
        <h2>AITU College</h2>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/about">О колледже</Link>

          {!token && (
            <>
              <Link to="/login">Вход</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}

          {token && (
            <>
              <Link to="/news">Новости</Link>
              <Link to="/announcements">Объявления</Link>
              <Link to="/schedule">Расписание</Link>
              <Link to="/profile">Профиль</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;