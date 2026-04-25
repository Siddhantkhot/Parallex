import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Search, Heart, Menu, X } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="CineVault Home">
          <Film size={24} className="navbar__logo-icon" />
          <span className="navbar__logo-text">Parallax</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/search" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>Discover</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            Favorites
            {favorites.length > 0 && (
              <span className="navbar__badge">{favorites.length}</span>
            )}
          </NavLink>
        </div>

        {/* Desktop Search */}
        <form className="navbar__search" onSubmit={handleSearch} role="search">
          <Search size={16} className="navbar__search-icon" aria-hidden="true" />
          <input
            id="navbar-search-input"
            type="search"
            placeholder="Search movies..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="navbar__search-input"
            aria-label="Search movies"
          />
        </form>

        {/* Favorites Icon */}
        <Link to="/favorites" className="navbar__fav-btn" aria-label={`Favorites (${favorites.length})`}>
          <Heart size={20} />
          {favorites.length > 0 && <span className="navbar__fav-count">{favorites.length}</span>}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          id="navbar-menu-toggle"
          className="navbar__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu animate-fade-in-down">
          <form onSubmit={handleSearch} className="navbar__mobile-search" role="search">
            <Search size={16} aria-hidden="true" />
            <input
              id="mobile-search-input"
              type="search"
              placeholder="Search movies..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              aria-label="Search movies"
            />
          </form>
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className="navbar__mobile-link">Home</NavLink>
          <NavLink to="/search" onClick={() => setMenuOpen(false)} className="navbar__mobile-link">Discover</NavLink>
          <NavLink to="/favorites" onClick={() => setMenuOpen(false)} className="navbar__mobile-link">
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
