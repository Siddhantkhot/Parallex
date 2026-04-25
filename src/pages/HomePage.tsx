import React from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import { useTrending, usePopular, useTopRated, useNowPlaying, useUpcoming } from '../hooks/useMovies';
import './HomePage.css';

const HomePage: React.FC = () => {
  const trending = useTrending();
  const popular = usePopular();
  const topRated = useTopRated();
  const nowPlaying = useNowPlaying();
  const upcoming = useUpcoming();

  return (
    <main className="page home-page">
      {/* Hero */}
      <HeroBanner movies={trending.data?.results} isLoading={trending.isLoading} />

      {/* Carousels */}
      <div className="home-page__carousels">
        <MovieCarousel
          title="Trending This Week"
          movies={trending.data?.results}
          isLoading={trending.isLoading}
          error={trending.error}
        />
        <MovieCarousel
          title="Now Playing"
          movies={nowPlaying.data?.results}
          isLoading={nowPlaying.isLoading}
          error={nowPlaying.error}
        />
        <MovieCarousel
          title="Popular Movies"
          movies={popular.data?.results}
          isLoading={popular.isLoading}
          error={popular.error}
        />
        <MovieCarousel
          title="Top Rated"
          movies={topRated.data?.results}
          isLoading={topRated.isLoading}
          error={topRated.error}
        />
        <MovieCarousel
          title="Coming Soon"
          movies={upcoming.data?.results}
          isLoading={upcoming.isLoading}
          error={upcoming.error}
        />
      </div>
    </main>
  );
};

export default HomePage;
