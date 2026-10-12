import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function Favorites({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return (
      <div className="empty">
        <h2>В избранном пока пусто 📭</h2>
        <p>Отметьте книги звёздочкой — они появятся здесь.</p>
        <Link className="btn" to="/">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const total = books.reduce((sum, book) => sum + book.price, 0);

  return (
    <section>
      <h1 className="page-title">Избранное</h1>
      <p className="counter">
        Книг в избранном: <strong>{books.length}</strong> · Общая стоимость:{' '}
        <strong>{total.toLocaleString('ru-RU')} ₽</strong>
      </p>

      <div className="grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
