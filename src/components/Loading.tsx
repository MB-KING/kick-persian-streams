import React from 'react';
import './Loading.css';

interface LoadingProps {
  progress?: { current: number; total: number; failed: number; retrying: number };
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const percentage = progress && progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
  const isProgressVisible = progress && progress.total > 0;
  const hasFailures = progress && progress.failed > 0;
  const isRetrying = progress && progress.retrying > 0;

  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      
      <div className="loading-text">
        {isProgressVisible ? `در حال بارگذاری استریمرها... ${progress.current}/${progress.total}` : 'در حال بارگذاری...'}
      </div>
      
      {isProgressVisible && (
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="progress-text">{percentage}%</div>
        </div>
      )}
      
      {hasFailures && (
        <div className="loading-status failed">
          <span className="status-icon">⚠️</span>
          <span className="status-text">{progress.failed} درخواست ناموفق</span>
        </div>
      )}
      
      {isRetrying && (
        <div className="loading-status retrying">
          <span className="status-icon">🔄</span>
          <span className="status-text">تلاش مجدد برای {progress.retrying} درخواست</span>
        </div>
      )}
      
      <div className="loading-subtext">
        {isProgressVisible 
          ? isRetrying
            ? `تلاش مجدد برای درخواست‌های ناموفق...`
            : hasFailures
              ? `${progress.failed} درخواست ناموفق - در حال تلاش مجدد...`
              : `در حال دریافت اطلاعات ${progress.current} استریمر از ${progress.total}`
          : 'لطفاً صبر کنید...'
        }
      </div>
      
      {isProgressVisible && (
        <div className="loading-details">
          <div className="detail-item">
            <span className="detail-label">موفق:</span>
            <span className="detail-value success">{progress.current}</span>
          </div>
          {hasFailures && (
            <div className="detail-item">
              <span className="detail-label">ناموفق:</span>
              <span className="detail-value failed">{progress.failed}</span>
            </div>
          )}
          {isRetrying && (
            <div className="detail-item">
              <span className="detail-label">در حال تلاش مجدد:</span>
              <span className="detail-value retrying">{progress.retrying}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Loading;
