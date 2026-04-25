# CineVault — Movie App Walkthrough

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

## Running the App

```bash
# Start development server
npm run dev

# TypeScript type check
npx tsc --noEmit

# Production build
npm run build


# Here is a step-by-step breakdown of how the CineVault movie app was built from the ground up:

# ### 1. Scaffolding the Project
# First, I created the foundational structure using **Vite** with the **React and TypeScript** template. Vite is significantly faster than traditional tools like Create React App. 
# - **Command:** `npx create-vite@latest ./ --template react-ts`

# ### 2. Installing Dependencies
# Next, I installed the core libraries needed to power the app's features:
# - **React Router (`react-router-dom`)**: For navigating between different pages (Home, Search, Details, Favorites) without reloading the browser.
# - **TanStack Query (`@tanstack/react-query`)**: For fetching data from the API. It automatically handles caching, loading states, and background updates, which makes the app feel incredibly fast.
# - **Axios (`axios`)**: A clean HTTP client to make requests to the TMDB API.
# - **Lucide React (`lucide-react`)**: A modern icon library used for all the UI icons (search, hearts, arrows, stars).

# ### 3. Setting Up TypeScript Types and the API Client
# Before building components, I defined the data structure:
# - **Types (`src/types/tmdb.types.ts`)**: I wrote TypeScript interfaces for the TMDB API responses (Movies, Credits, Videos, etc.). This ensures we get autocomplete and catch errors early if we try to access properties that don't exist.
# - **API Client (`src/api/tmdb.ts`)**: I created an Axios instance pre-configured with the base URL and the API key (from the `.env` file). I then wrote helper functions for every endpoint we needed (trending, popular, search, detail, credits, etc.) and helper functions to construct image URLs for movie posters and backdrops.

# ### 4. Creating Custom Hooks
# To connect the UI to the API cleanly, I created custom React hooks:
# - **`useMovies.ts`**: This file uses TanStack Query's `useQuery` to wrap all our API calls. It manages caching times (e.g., trending movies cache for 5 minutes, genres for 1 hour) so we don't spam the API unnecessarily.
# - **`useDebounce.ts`**: A utility hook used on the search page. It delays the search API call until you stop typing for 400ms, preventing the app from making an API request for every single keystroke.

# ### 5. State Management (Favorites)
# I needed a way to store "Favorite" movies globally so they could be accessed from any page:
# - **`FavoritesContext.tsx`**: I used React Context to create a global state for favorites. I also added logic using `useEffect` to automatically save and load the favorites list from the browser's `localStorage`, ensuring your favorites persist even if you close the tab.

# ### 6. Design System and Global Styles
# I built a custom, premium design system from scratch rather than using a CSS framework:
# - **`index.css`**: I defined CSS variables (tokens) for all colors (deep navy, gold accents), spacing, border-radii, and typography. I also created global utility classes for buttons, badges, glassmorphism card effects, and keyframe animations (like `fadeInUp` and `shimmer` for loading skeletons).

# ### 7. Building Reusable Components
# I built the UI modularly, creating isolated components with their own CSS files:
# - **`Navbar`**: A sticky top navigation with a search bar and a dynamic favorites counter badge.
# - **`HeroBanner`**: The large banner on the homepage that auto-rotates through trending movies, featuring gradient overlays and crossfade animations.
# - **`MovieCard`**: The standard display for a movie, featuring a poster, rating badge, a hover overlay, and a heart button to add it to favorites.
# - **`MovieCarousel`**: A horizontally scrollable row of `MovieCard`s with left/right navigation arrows.
# - **`SkeletonLoader`**: The animated "shimmering" placeholders you see while data is fetching.

# ### 8. Assembling the Pages
# With the building blocks ready, I assembled the four main pages:
# - **`HomePage.tsx`**: Combines the `HeroBanner` with several `MovieCarousel` components for Trending, Popular, Top Rated, etc.
# - **`SearchPage.tsx`**: Uses the debounced search hook. It includes a responsive grid for results and a filter panel to sort by genre or year.
# - **`MovieDetailPage.tsx`**: The most complex page. It fetches the movie details, cast, similar movies, and YouTube trailers simultaneously. It uses a large backdrop image and features a modal popup to watch the trailer.
# - **`FavoritesPage.tsx`**: Reads from the `FavoritesContext` and displays a grid of saved movies, or a friendly "empty state" if you haven't added any yet.

# ### 9. Wiring it all together
# Finally, I connected everything in the app root:
# - **`App.tsx`**: I wrapped the entire application in the `QueryClientProvider` (for data fetching) and the `FavoritesProvider` (for state). I then defined the `Routes` so the app knows which page to render based on the URL.

# The result is a fast, type-safe, and visually rich application built entirely from scratch without relying on heavy UI component libraries.