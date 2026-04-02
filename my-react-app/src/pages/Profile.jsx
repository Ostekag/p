import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    api
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  if (!token) return <p>Пожалуйста, войдите, чтобы увидеть профиль</p>;
  if (!user) return <p>Загрузка профиля...</p>;

  return (
    <div className="container page">
      <h1 className="hero-title">Профиль пользователя</h1>
      <div className="card">
        <p><b>Имя:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Роль:</b> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;