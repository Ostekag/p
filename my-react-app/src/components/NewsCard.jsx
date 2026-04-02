import React from "react";

function NewsCard({ item }) {
  return (
    <div className="card news-card">
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <small>{new Date(item.createdAt).toLocaleString()}</small>
    </div>
    
  );
}

export default NewsCard; // <- обязательно default export