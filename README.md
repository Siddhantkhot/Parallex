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
