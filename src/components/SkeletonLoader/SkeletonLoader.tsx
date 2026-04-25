import React from 'react';
import './SkeletonLoader.css';

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-card" aria-hidden="true">
        <div className="skeleton-card__poster skeleton-shimmer" />
        <div className="skeleton-card__info">
          <div className="skeleton-card__title skeleton-shimmer" />
          <div className="skeleton-card__year skeleton-shimmer" />
        </div>
      </div>
    ))}
  </>
);

export const SkeletonHero: React.FC = () => (
  <div className="skeleton-hero skeleton-shimmer" aria-hidden="true" />
);

export const SkeletonDetail: React.FC = () => (
  <div className="skeleton-detail" aria-hidden="true">
    <div className="skeleton-detail__backdrop skeleton-shimmer" />
    <div className="skeleton-detail__content container">
      <div className="skeleton-detail__poster skeleton-shimmer" />
      <div className="skeleton-detail__info">
        <div className="skeleton-detail__title skeleton-shimmer" />
        <div className="skeleton-detail__meta skeleton-shimmer" />
        <div className="skeleton-detail__overview skeleton-shimmer" />
        <div className="skeleton-detail__overview skeleton-shimmer" style={{ width: '70%' }} />
      </div>
    </div>
  </div>
);
