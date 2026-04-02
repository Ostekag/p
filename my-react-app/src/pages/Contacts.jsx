import { useState } from "react";
import api from "../services/api";

function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/messages", form);
      setResult(res.data.message);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setResult("Ошибка отправки");
    }
  };

  return (
    <div className="container page">
      <h1>Контакты</h1>
      <p>Email: info@aitu-college.kz</p>
      <p>Телефон: +7 (777) 123-45-67</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Тема"
          value={form.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Сообщение"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Отправить</button>
      </form>

      {result && <p>{result}</p>}
    </div>
  );
}

export default Contacts;