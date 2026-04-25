# CineVault — Movie App Walkthrough
live site : [(https://parallex-5l8lom22j-khotsiddhant108-5389s-projects.vercel.app/)]
A cinematic movie discovery app built with React 18 + TypeScript + Vite.

---

## What Was Built

### Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Routing | React Router v6 |
| Data Fetching | TanStack Query v5 |
| API | TMDB REST API |
| State | React Context + localStorage |
| Styling | Vanilla CSS with design tokens |
| Icons | Lucide React |

---

## File Structure

```
src/
├── api/tmdb.ts                      # TMDB client + image helpers
├── types/tmdb.types.ts              # Full TypeScript types
├── hooks/
│   ├── useMovies.ts                 # All TanStack Query hooks
│   └── useDebounce.ts               # Generic debounce hook
├── context/FavoritesContext.tsx     # Favorites + localStorage
├── components/
│   ├── Navbar/                      # Sticky glassmorphism navbar
│   ├── HeroBanner/                  # Auto-rotating hero (6 movies)
│   ├── MovieCard/                   # Card with hover overlay + favorites
│   ├── MovieCarousel/               # Scrollable horizontal carousel
│   ├── SearchBar/                   # Debounced search with clear
│   ├── GenreFilter/                 # Genre pill toggle buttons
│   └── SkeletonLoader/              # Shimmer placeholders
├── pages/
│   ├── HomePage.tsx                 # Hero + 5 carousels
│   ├── SearchPage.tsx               # Live search + filters + grid
│   ├── MovieDetailPage.tsx          # Full detail + cast + trailer
│   └── FavoritesPage.tsx            # Saved movies list
├── index.css                        # Design system (tokens + animations)
└── App.tsx                          # Providers + routing
```

---

## Pages

### 🏠 Home Page (`/`)
- Auto-rotating hero banner with crossfade (6 trending movies, 7s interval)
- Navigation arrows + dot indicators
- 5 horizontal carousels: Trending, Now Playing, Popular, Top Rated, Coming Soon
- Skeleton loading placeholders

### 🔍 Search / Discover Page (`/search`)
- Debounced live search (450ms)
- URL-synced query params (`?q=...`)
- Filter panel: Genre pills, Year dropdown, Sort dropdown
- Responsive grid with pagination (up to 500 pages)
- Empty state UI

### 🎬 Movie Detail Page (`/movie/:id`)
- Full-bleed backdrop image
- Sticky poster column with favorites button
- Title, tagline, rating, runtime, release year, status
- Genre links → filtered search
- Overview, director credit
- Top 12 cast members with photos
- Budget / Revenue / Vote Count stats
- **YouTube trailer modal** (embedded, autoplay)
- Similar movies carousel

### ❤️ Favorites Page (`/favorites`)
- Persisted in `localStorage`
- Horizontal card layout with poster, rating, overview
- Remove button per movie
- Animated empty state

---

## Design System Highlights
- **Color palette**: Deep navy `#0a0b0f`, gold `#f5c518`, red accent `#e50914`
- **Typography**: Inter (Google Fonts) at 9 size steps
- **Animations**: `fadeInUp`, `fadeIn`, `scaleIn`, `shimmer`, `heartBeat`
- **Glassmorphism**: Navbar + filter panels with `backdrop-filter: blur`
- **Responsive**: Mobile-first, collapses navbar to hamburger at 900px
---
