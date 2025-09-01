import React, { useState } from 'react';
import './StreamerRequest.css';

interface StreamerRequestProps {
  className?: string;
}

const StreamerRequest: React.FC<StreamerRequestProps> = ({ className = '' }) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSubmitting(true);
    
    // Create GitHub issue URL with pre-filled content
    const issueTitle = encodeURIComponent(`درخواست اضافه کردن استریمر: ${username}`);
    const issueBody = encodeURIComponent(`## 🎯 درخواست اضافه کردن استریمر جدید

**نام کاربری:** \`${username}\`

**لینک پروفایل:** https://kick.com/${username}

**توضیحات اضافی:**
- [ ] استریمر ایرانی است
- [ ] محتوای مناسب تولید می‌کند
- [ ] فعال است

**نکات مهم:**
- لطفاً مطمئن شوید که این استریمر ایرانی است
- فقط استریمرهای فعال و با محتوای مناسب اضافه می‌شوند
- بررسی درخواست ممکن است چند روز طول بکشد

---
*این درخواست توسط فرم سایت ارسال شده است*`);

    const githubUrl = `https://github.com/MB-KING/kick-persian-streams/issues/new?title=${issueTitle}&body=${issueBody}&labels=enhancement,streamer-request`;

    // Open GitHub issue in new tab
    window.open(githubUrl, '_blank');
    
    // Reset form
    setUsername('');
    setIsSubmitting(false);
  };

  const handleDirectLink = () => {
    const githubUrl = 'https://github.com/MB-KING/kick-persian-streams/issues/new?labels=enhancement,streamer-request';
    window.open(githubUrl, '_blank');
  };

  return (
    <div className={`streamer-request ${className}`}>
      <div className="request-header">
        <h3>🎯 درخواست اضافه کردن استریمر جدید</h3>
        <p>اگر استریمر ایرانی فعالی می‌شناسید که در لیست نیست، درخواست اضافه کردن آن را ارسال کنید</p>
      </div>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label htmlFor="username">نام کاربری استریمر در Kick.com:</label>
          <div className="input-wrapper">
            <span className="input-prefix">kick.com/</span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="نام کاربری را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>
          <small className="form-help">
            فقط نام کاربری را وارد کنید (بدون @ یا https://)
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!username.trim() || isSubmitting}
          >
            {isSubmitting ? 'در حال ارسال...' : '📝 ارسال درخواست'}
          </button>
          
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleDirectLink}
          >
            🔗 باز کردن GitHub Issues
          </button>
        </div>
      </form>

      <div className="request-info">
        <h4>📋 نحوه کار:</h4>
        <ol>
          <li>نام کاربری استریمر را در فیلد بالا وارد کنید</li>
          <li>روی "ارسال درخواست" کلیک کنید</li>
          <li>صفحه GitHub Issues باز می‌شود</li>
          <li>درخواست شما به صورت خودکار پر می‌شود</li>
          <li>روی "Submit new issue" کلیک کنید</li>
        </ol>

        <div className="info-box">
          <strong>💡 نکته:</strong> پس از ارسال درخواست، بررسی می‌شود و در صورت تأیید، استریمر به لیست اضافه می‌شود.
        </div>
      </div>
    </div>
  );
};

export default StreamerRequest;
