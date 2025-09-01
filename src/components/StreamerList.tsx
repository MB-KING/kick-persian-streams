import React, { useState } from 'react';
import type { StreamerListProps } from '../types/Streamer';
import StreamerCard from './StreamerCard';
import './StreamerList.css';

const StreamerList: React.FC<StreamerListProps> = ({ streamers, filter, isLoading = false }) => {
  const [sortBy, setSortBy] = useState<'viewers' | 'followers' | 'name'>('viewers');
  const [showOnlyLive, setShowOnlyLive] = useState(false);

  const filteredStreamers = streamers
    .filter(streamer => {
      if (showOnlyLive && streamer.isLive !== true) return false;
      if (filter) {
        return (streamer.displayName?.toLowerCase().includes(filter.toLowerCase())) ||
               (streamer.game?.toLowerCase().includes(filter.toLowerCase())) ||
               (streamer.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase())));
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'viewers':
          return (b.viewers || 0) - (a.viewers || 0);
        case 'followers':
          return (b.followers || 0) - (a.followers || 0);
        case 'name':
          return (a.displayName || a.username).localeCompare(b.displayName || b.username);
        default:
          return 0;
      }
    });

  // Create skeleton cards for loading state
  const createSkeletonCards = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={`skeleton-${index}`} className="streamer-card skeleton">
        <div className="skeleton-thumbnail"></div>
        <div className="skeleton-info">
          <div className="skeleton-header">
            <div className="skeleton-name"></div>
            <div className="skeleton-username"></div>
          </div>
          <div className="skeleton-title"></div>
          <div className="skeleton-meta">
            <div className="skeleton-category"></div>
            <div className="skeleton-followers"></div>
          </div>
        </div>
      </div>
    ));
  };

  // Show skeleton cards when loading or if we have very few streamers
  const shouldShowSkeletons = isLoading || streamers.length < 5;
  const skeletonCount = isLoading ? 20 : Math.max(0, 20 - streamers.length);

  return (
    <div className="streamer-list-container">
      <div className="streamer-controls">
        <div className="filter-controls">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={showOnlyLive}
              onChange={(e) => setShowOnlyLive(e.target.checked)}
            />
            فقط استریمرهای زنده
          </label>
        </div>
        
        <div className="sort-controls">
          <label className="sort-label">
            مرتب‌سازی بر اساس:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'viewers' | 'followers' | 'name')}
              className="sort-select"
            >
              <option value="viewers">تعداد بینندگان</option>
              <option value="followers">تعداد فالوورها</option>
              <option value="name">نام</option>
            </select>
          </label>
        </div>
      </div>



      {filteredStreamers.length === 0 && !shouldShowSkeletons ? (
        <div className="no-results">
          <h3>هیچ استریمری یافت نشد</h3>
          <p>لطفاً فیلترهای خود را تغییر دهید</p>
        </div>
      ) : (
        <div className="streamer-grid">
          {filteredStreamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
          {shouldShowSkeletons && createSkeletonCards(skeletonCount)}
        </div>
      )}
    </div>
  );
};

export default StreamerList;
