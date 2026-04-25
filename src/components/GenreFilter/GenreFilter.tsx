import React from 'react';
import type { Genre } from '../../types/tmdb.types';
import './GenreFilter.css';

interface GenreFilterProps {
  genres?: Genre[];
  selectedGenreId?: number;
  onSelect: (id: number | undefined) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenreId, onSelect }) => {
  return (
    <div className="genre-filter" role="group" aria-label="Filter by genre">
      <button
        id="genre-filter-all"
        className={`genre-pill ${selectedGenreId === undefined ? 'active' : ''}`}
        onClick={() => onSelect(undefined)}
        aria-pressed={selectedGenreId === undefined}
      >
        All
      </button>
      {genres?.map((genre) => (
        <button
          key={genre.id}
          id={`genre-filter-${genre.id}`}
          className={`genre-pill ${selectedGenreId === genre.id ? 'active' : ''}`}
          onClick={() => onSelect(selectedGenreId === genre.id ? undefined : genre.id)}
          aria-pressed={selectedGenreId === genre.id}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
