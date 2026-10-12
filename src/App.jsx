import { useMemo } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import books from './data/books';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Favorites from './pages/Favorites';

function NotFound() {
  return (
    <div className="empty">
      <h2>404 — страница не найдена</h2>
      <Link className="btn" to="/">
        ← Вернуться в каталог
      </Link>
    </div>
  );
}

export default function App() {
  const [favorites, setFavorites] = useLocalStorage('book-favorites', []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const favoriteBooks = useMemo(
    () => books.filter((b) => favorites.includes(b.id)),
    [favorites]
  );

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Книжный каталог
        </Link>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            Каталог
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            Избранное
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                books={books}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookPage
                books={books}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                books={favoriteBooks}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Проект «Каталог книг с поиском» · React + React Router + localStorage
      </footer>
    </div>
  );
}
