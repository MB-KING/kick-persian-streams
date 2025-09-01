import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
  totalStreamers: number;
  liveStreamers: number;
  onRequestStreamer: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, totalStreamers, liveStreamers, onRequestStreamer }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <h1 className="logo-text">استریمرهای ایرانی</h1>
          </div>
          <p className="header-subtitle">لیست استریمرهای ایرانی در Kick.com</p>
        </div>
        
        <div className="header-right">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="جستجو در استریمرها..."
                value={searchQuery}
                onChange={handleInputChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
          
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{totalStreamers}</span>
              <span className="stat-label">کل استریمرها</span>
            </div>
            <div className="stat live">
              <span className="stat-number">{liveStreamers}</span>
              <span className="stat-label">زنده</span>
            </div>
          </div>
          
          <button 
            type="button" 
            className="request-streamer-btn"
            onClick={onRequestStreamer}
            title="درخواست اضافه کردن استریمر جدید"
          >
            ➕ درخواست استریمر
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
