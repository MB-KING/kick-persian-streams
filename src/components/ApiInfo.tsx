import React from 'react';
import './ApiInfo.css';

interface ApiInfoProps {
  totalStreamers: number;
  liveStreamers: number;
  lastUpdated: Date;
  apiStatus: 'loading' | 'success' | 'error';
}

const ApiInfo: React.FC<ApiInfoProps> = ({ 
  totalStreamers, 
  liveStreamers, 
  lastUpdated, 
  apiStatus 
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'loading': return '#ffaa00';
      case 'success': return '#00ff88';
      case 'error': return '#ff4444';
      default: return '#888888';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'loading': return 'در حال بارگذاری';
      case 'success': return 'متصل';
      case 'error': return 'خطا';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="api-info">
      <div className="api-status">
        <div 
          className="status-indicator" 
          style={{ backgroundColor: getStatusColor() }}
        ></div>
        <span className="status-text">{getStatusText()}</span>
      </div>
      
      <div className="api-stats">
        <div className="stat">
          <span className="stat-number">{totalStreamers}</span>
          <span className="stat-label">کل استریمرها</span>
        </div>
        <div className="stat">
          <span className="stat-number">{liveStreamers}</span>
          <span className="stat-label">زنده</span>
        </div>
      </div>
      
      <div className="last-updated">
        <span className="update-label">آخرین به‌روزرسانی:</span>
        <span className="update-time">{formatTime(lastUpdated)}</span>
      </div>
      
      <div className="api-source">
        <span className="source-icon">🔗</span>
        <span className="source-text">Kick.com API</span>
      </div>
    </div>
  );
};

export default ApiInfo;
