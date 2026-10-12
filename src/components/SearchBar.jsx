export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="search__icon">🔍</span>
      <input
        type="text"
        className="search__input"
        placeholder="Поиск по названию книги..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search__clear"
          onClick={() => onChange('')}
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      )}
    </div>
  );
}
