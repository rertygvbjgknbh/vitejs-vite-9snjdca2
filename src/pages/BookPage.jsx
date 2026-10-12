import { Link, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function BookPage({ books, favorites, onToggleFavorite }) {
  const { id } = useParams();
  const book = books.find((b) => String(b.id) === id);

  if (!book) {
    return (
      <div className="empty">
        <h2>Книга не найдена </h2>
        <Link className="btn" to="/">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(book.id);

  const similar = books
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  return (
    <section>
      <Link className="back-link" to="/">
        ← Назад в каталог
      </Link>

      <article className="book-page">
        <div className="book-page__cover" style={{ background: book.cover }}>
          <span>{book.emoji}</span>
        </div>

        <div className="book-page__info">
          <span className="tag">{book.genre}</span>
          <h1>{book.title}</h1>
          <p className="book-page__author">{book.author}</p>
          <p className="book-page__year">Год издания: {book.year}</p>
          <p className="book-page__desc">{book.description}</p>

          <div className="book-page__bottom">
            <span className="price price--big">
              {book.price.toLocaleString('ru-RU')} ₽
            </span>
            <button
              className={isFavorite ? 'btn btn--active' : 'btn'}
              onClick={() => onToggleFavorite(book.id)}
            >
              {isFavorite ? '★ В избранном' : '☆ Добавить в избранное'}
            </button>
          </div>
        </div>
      </article>

      {similar.length > 0 && (
        <>
          <h2 className="section-title">Похожие книги</h2>
          <div className="grid">
            {similar.map((b) => (
              <BookCard
                key={b.id}
                book={b}
                isFavorite={favorites.includes(b.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
