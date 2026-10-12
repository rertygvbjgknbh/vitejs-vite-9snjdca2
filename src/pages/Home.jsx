import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import BookCard from '../components/BookCard';

export default function Home({ books, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('Все');

  const genres = useMemo(
    () => ['Все', ...new Set(books.map((b) => b.genre))],
    [books]
  );

  const visibleBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchGenre = genre === 'Все' || book.genre === genre;
      return matchTitle && matchGenre;
    });
  }, [books, query, genre]);

  return (
    <section>
      <h1 className="page-title">Каталог книг</h1>

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <GenreFilter genres={genres} active={genre} onChange={setGenre} />
      </div>

      <p className="counter">
        Найдено книг: <strong>{visibleBooks.length}</strong> из {books.length}
      </p>

      {visibleBooks.length === 0 ? (
        <div className="empty">
          <h3>Ничего не найдено </h3>
          <p>Попробуйте изменить запрос или выбрать другой жанр.</p>
        </div>
      ) : (
        <div className="grid">
          {visibleBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
