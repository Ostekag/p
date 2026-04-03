import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css"; // Убедись, что путь к CSS верный

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
        setError("Не удалось загрузить данные профиля. Попробуйте позже.");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container page profile-page centered">
        <div className="loader">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page profile-page centered">
        <div className="error-card">{error}</div>
      </div>
    );
  }

  return (
    <div className="container page profile-page">
      <div className="profile-wrapper">
        <div className="profile-header">
          {/* Иконка пользователя (заглушка) */}
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-title-block">
            <h1 className="profile-name">{user?.name}</h1>
            <span className={`role-badge ${user?.role}`}>{user?.role}</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="info-section">
            <h2 className="section-title">Контактная информация</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              {/* Можно добавить телефон или другие поля, если они есть в БД */}
            </div>
          </div>

          <div className="info-section">
            <h2 className="section-title">Аккаунт</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">ID пользователя:</span>
                <span className="info-value mono">{user?._id}</span>
              </div>
            </div>
          </div>

          {/* Пример дополнительной секции */}
          {user?.role === "student" && (
            <div className="info-section active-section">
              <h2 className="section-title">Статус обучения</h2>
              <p className="status-text">Ваш аккаунт студента активен.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;