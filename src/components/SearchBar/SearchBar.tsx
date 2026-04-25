import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for movies...',
}) => {
  return (
    <div className="search-bar" role="search">
      <Search size={20} className="search-bar__icon" aria-hidden="true" />
      <input
        id="main-search-input"
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search movies"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          id="search-clear-btn"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
