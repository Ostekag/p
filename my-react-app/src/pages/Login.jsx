import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Отправляем запрос на /api/auth/login (префикс /auth берется из api сервиса)
      const res = await api.post("/auth/login", form);
      
      const { token } = res.data;

      // Сохраняем данные
      localStorage.setItem("token", token);
      setToken(token); 

      // Перенаправляем пользователя
      navigate("/news");
    } catch (err) {
      // Выводим ошибку из бэкенда ("Пользователь не найден" или "Неверный пароль")
      setError(err.response?.data?.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <div className="auth-card">
        <h1>Вход</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Пароль" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;