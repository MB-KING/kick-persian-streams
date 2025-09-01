import React from 'react';
import './ApiInfo.css';

interface ApiInfoProps {
  totalStreamers: number;
  liveStreamers: number;
}

const ApiInfo: React.FC<ApiInfoProps> = ({ 
  totalStreamers, 
  liveStreamers
}) => {

  return (
    <div className="api-info">
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
    </div>
  );
};

export default ApiInfo;
