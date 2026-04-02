import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setToken(token); // Navbar сразу обновится

      setResult(`Вход выполнен. Добро пожаловать, ${user.name}!`);
      setTimeout(() => navigate("/news"), 1000);
    } catch (err) {
      setResult(err.response?.data?.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <h1>Вход</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Вход..." : "Войти"}</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default Login;