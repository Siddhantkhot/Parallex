import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../MovieCard/MovieCard';
import { SkeletonCard } from '../SkeletonLoader/SkeletonLoader';
import type { Movie } from '../../types/tmdb.types';
import './MovieCarousel.css';

interface MovieCarouselProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  error?: Error | null;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, isLoading, error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="carousel" aria-label={title}>
      <div className="carousel__header container">
        <h2 className="carousel__title">{title}</h2>
        <div className="carousel__controls">
          <button
            id={`carousel-prev-${title.replace(/\s/g, '-').toLowerCase()}`}
            className="carousel__btn"
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            id={`carousel-next-${title.replace(/\s/g, '-').toLowerCase()}`}
            className="carousel__btn"
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel__track-wrapper">
        <div className="carousel__track" ref={scrollRef}>
          <div className="carousel__items">
            {isLoading ? (
              <SkeletonCard count={10} />
            ) : error ? (
              <p className="carousel__error">Failed to load movies.</p>
            ) : (
              movies?.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} animationDelay={i * 40} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
