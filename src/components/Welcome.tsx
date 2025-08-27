import React from 'react';
import './Welcome.css';

interface WelcomeProps {
  name?: string;
}

const Welcome: React.FC<WelcomeProps> = ({ name = 'کاربر' }) => {
  return (
    <div className="welcome-container">
      <h2>خوش آمدید {name}!</h2>
      <p>این یک پروژه React با TypeScript است که با Vite ساخته شده.</p>
      <div className="features">
        <h3>ویژگی‌های پروژه:</h3>
        <ul>
          <li>⚡️ Vite برای build سریع</li>
          <li>⚛️ React 19</li>
          <li>📝 TypeScript برای type safety</li>
          <li>🎨 ESLint برای code quality</li>
          <li>📦 GitHub Pages برای دیپلوی</li>
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
