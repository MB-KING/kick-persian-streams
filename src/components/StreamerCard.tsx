import React from 'react';
import type { StreamerCardProps } from '../types/Streamer';
import './StreamerCard.css';

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const profileUrl = `https://kick.com/${streamer.username}`;

  return (
    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="streamer-card">
      <div className="streamer-thumbnail">
        {streamer.avatar && (
          <img 
            src={streamer.avatar} 
            alt={streamer.displayName || streamer.username}
            className="streamer-avatar"
          />
        )}
        {streamer.isLive && (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span className="live-text">LIVE</span>
          </div>
        )}
        {streamer.isLive && streamer.viewers && (
          <div className="viewer-count">
            <span className="viewer-icon">👁️</span>
            <span>{formatNumber(streamer.viewers)}</span>
          </div>
        )}
      </div>
      
      <div className="streamer-info">
        <div className="streamer-header">
          <h3 className="streamer-name">
            {streamer.displayName || streamer.username}
          </h3>
          <span className="streamer-username">@{streamer.username}</span>
        </div>
        
        {streamer.title && (
          <p className="stream-title">{streamer.title}</p>
        )}
        
        <div className="streamer-meta">
          {streamer.game && (
            <span className="game-category">{streamer.game}</span>
          )}
          {typeof streamer.followers === 'number' && (
            <span className="follower-count">
              {formatNumber(streamer.followers)} followers
            </span>
          )}
        </div>
        
        {streamer.tags && streamer.tags.length > 0 && (
          <div className="streamer-tags">
            {streamer.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default StreamerCard;
