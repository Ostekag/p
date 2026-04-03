import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css"; // Или index.css, смотря где у тебя лежат главные стили
// Компоненты
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Страницы
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Announcements from "./pages/Announcements";
import Schedule from "./pages/Schedule";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  // Инициализируем состояние токена из localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Синхронизируем состояние с localStorage при изменении токена
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      {/* Передаем токен в Navbar, чтобы менять кнопки Вход/Выход */}
      <Navbar token={token} setToken={setToken} />

      <div className="content" style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contacts" element={<Contacts />} />
          
          {/* Передаем setToken в логин и регистрацию, чтобы сохранить его после входа */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          
          {/* Защищенный роут: если токена нет, Profile может не открыться (логика внутри компонента) */}
          <Route path="/profile" element={<Profile token={token} />} />
          
          {/* 404 ошибка */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;