export default function GenreFilter({ genres, active, onChange }) {
  return (
    <div className="chips">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={genre === active ? 'chip chip--active' : 'chip'}
          onClick={() => onChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
