import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register({ setToken }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      // регистрация
      const res = await api.post("/auth/register", form);

      // 🔹 получаем токен сразу после регистрации
      const { token } = res.data;
      localStorage.setItem("token", token);

      // 🔹 обновляем state в App → Navbar сразу обновляется
      setToken(token);

      setResult("Регистрация успешна! Вы автоматически вошли.");
      setForm({ name: "", email: "", password: "", role: "student" });

      // переходим на страницу новостей
      setTimeout(() => navigate("/news"), 1000);
    } catch (err) {
      setResult(err.response?.data?.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <h1>Регистрация</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Регистрация..." : "Зарегистрироваться"}</button>
      </form>

      {result && <p>{result}</p>}
    </div>
  );
}

export default Register;