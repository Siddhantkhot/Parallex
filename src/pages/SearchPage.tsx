import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import GenreFilter from '../components/GenreFilter/GenreFilter';
import MovieCard from '../components/MovieCard/MovieCard';
import { SkeletonCard } from '../components/SkeletonLoader/SkeletonLoader';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchMovies, useDiscoverMovies, useGenres } from '../hooks/useMovies';
import './SearchPage.css';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'revenue.desc', label: 'Highest Revenue' },
];

const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedQuery = useDebounce(query, 450);
  const { data: genresData } = useGenres();

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
    setPage(1);
  }, [debouncedQuery, setSearchParams]);

  const isSearching = debouncedQuery.length > 0;

  const searchResult = useSearchMovies(debouncedQuery, page, selectedGenre, selectedYear);
  const discoverResult = useDiscoverMovies(page, selectedGenre, selectedYear, sortBy);

  const activeResult = isSearching ? searchResult : discoverResult;
  const movies = activeResult.data?.results ?? [];
  const totalPages = activeResult.data?.total_pages ?? 1;

  const handleGenreSelect = (id: number | undefined) => {
    setSelectedGenre(id);
    setPage(1);
  };

  return (
    <main className="page search-page">
      <div className="container">
        {/* Header */}
        <div className="search-page__header animate-fade-in-up">
          <h1 className="search-page__heading">
            {isSearching ? `Results for "${debouncedQuery}"` : 'Discover Movies'}
          </h1>
          {activeResult.data && (
            <span className="search-page__count">
              {activeResult.data.total_results.toLocaleString()} movies
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-page__bar animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          <SearchBar value={query} onChange={setQuery} />
          <button
            id="toggle-filters-btn"
            className={`btn btn-ghost search-page__filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="search-filters"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div
            id="search-filters"
            className="search-page__filters glass-card animate-fade-in-down"
          >
            {/* Genre */}
            <div className="search-page__filter-section">
              <label className="search-page__filter-label">Genre</label>
              <GenreFilter
                genres={genresData?.genres}
                selectedGenreId={selectedGenre}
                onSelect={handleGenreSelect}
              />
            </div>

            {/* Year */}
            <div className="search-page__filter-section">
              <label className="search-page__filter-label" htmlFor="year-select">Year</label>
              <select
                id="year-select"
                className="search-page__select"
                value={selectedYear ?? ''}
                onChange={(e) => {
                  setSelectedYear(e.target.value ? Number(e.target.value) : undefined);
                  setPage(1);
                }}
              >
                <option value="">Any Year</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            {!isSearching && (
              <div className="search-page__filter-section">
                <label className="search-page__filter-label" htmlFor="sort-select">Sort By</label>
                <select
                  id="sort-select"
                  className="search-page__select"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Results Grid */}
        <div className="search-page__grid">
          {activeResult.isLoading ? (
            <SkeletonCard count={20} />
          ) : movies.length > 0 ? (
            movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} animationDelay={i * 30} />
            ))
          ) : (
            <div className="search-page__empty">
              <p className="search-page__empty-title">No movies found</p>
              <p className="search-page__empty-sub">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!activeResult.isLoading && totalPages > 1 && (
          <div className="search-page__pagination">
            <button
              id="pagination-prev-btn"
              className="btn btn-ghost"
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="Previous page"
            >
              ← Previous
            </button>
            <span className="search-page__page-info">
              Page {page} of {Math.min(totalPages, 500)}
            </span>
            <button
              id="pagination-next-btn"
              className="btn btn-ghost"
              disabled={page >= Math.min(totalPages, 500)}
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
