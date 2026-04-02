function AnnouncementCard({ item }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <small>Категория: {item.category}</small>
    </div>
  );
}

export default AnnouncementCard;