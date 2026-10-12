import { Link } from 'react-router-dom';

export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      <Link
        to={`/book/${book.id}`}
        className="card__cover"
        style={{ background: book.cover }}
      >
        <span>{book.emoji}</span>
      </Link>

      <div className="card__body">
        <span className="tag">{book.genre}</span>

        <h3 className="card__title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </h3>

        <p className="card__author">{book.author}</p>

        <div className="card__footer">
          <span className="price">{book.price.toLocaleString('ru-RU')} ₽</span>

          <button
            type="button"
            className={isFavorite ? 'fav fav--active' : 'fav'}
            onClick={() => onToggleFavorite(book.id)}
            title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            aria-pressed={isFavorite}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  );
}
