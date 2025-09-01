# 🤝 راهنمای مشارکت

## 📋 نحوه مشارکت

مشارکت‌های شما در بهبود این پروژه بسیار ارزشمند است! لطفاً این راهنما را مطالعه کنید.

## 🚀 شروع کار

### 1. Fork کردن پروژه
1. به [repository اصلی](https://github.com/mb-king/kick-persian-streams) بروید
2. روی دکمه **Fork** کلیک کنید
3. repository را به حساب GitHub خود fork کنید

### 2. Clone کردن
```bash
git clone https://github.com/YOUR_USERNAME/kick-persian-streams.git
cd kick-persian-streams
```

### 3. نصب dependencies
```bash
npm install
```

### 4. اجرای پروژه
```bash
npm run dev
```

## 🔧 توسعه

### ساختار پروژه
```
src/
├── components/          # کامپوننت‌های React
├── services/            # سرویس‌های API
├── types/               # تعاریف TypeScript
├── data/                # داده‌های استاتیک
└── styles/              # فایل‌های CSS
```

### قوانین کدنویسی
- از **TypeScript** استفاده کنید
- از **فونت وزیر** برای متن‌های فارسی استفاده کنید
- **RTL** را برای زبان فارسی رعایت کنید
- از **ESLint** پیروی کنید

### کامیت کردن
```bash
git add .
git commit -m "feat: Add new feature description"
git push origin main
```

## 🐛 گزارش باگ

### قبل از گزارش
1. مطمئن شوید که باگ در آخرین نسخه وجود دارد
2. issue های مشابه را بررسی کنید
3. مراحل تولید باگ را مستند کنید

### قالب گزارش باگ
```markdown
## شرح باگ
توضیح کوتاه و واضح از مشکل

## مراحل تولید
1. به صفحه ... بروید
2. روی ... کلیک کنید
3. خطا رخ می‌دهد

## رفتار مورد انتظار
توضیح اینکه چه اتفاقی باید می‌افتاد

## اطلاعات سیستم
- مرورگر: Chrome 120
- سیستم عامل: Windows 11
- نسخه: 1.0.0
```

## ✨ درخواست ویژگی

### قبل از درخواست
1. ایده خود را با تیم در میان بگذارید
2. بررسی کنید که آیا قبلاً درخواست شده یا نه
3. ارزش و کاربرد ویژگی را توضیح دهید

### قالب درخواست ویژگی
```markdown
## خلاصه
توضیح کوتاه از ویژگی درخواستی

## مشکل
توضیح مشکل‌ای که این ویژگی حل می‌کند

## راه حل پیشنهادی
توضیح راه حل یا ویژگی

## جایگزین‌ها
راه حل‌های جایگزین (اگر وجود دارد)

## اطلاعات اضافی
عکس‌ها، نمونه‌ها یا اطلاعات بیشتر
```

## 🔄 Pull Request

### قبل از ارسال PR
1. کد خود را تست کنید
2. از ESLint پیروی کنید
3. تست‌های لازم را اضافه کنید
4. مستندات را به‌روزرسانی کنید

### قالب Pull Request
```markdown
## تغییرات
توضیح تغییرات انجام شده

## نوع تغییر
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## تست
- [ ] کد در محیط local تست شده
- [ ] تست‌های جدید اضافه شده
- [ ] تست‌های موجود شکسته نشده

## چک‌لیست
- [ ] کد از ESLint پیروی می‌کند
- [ ] مستندات به‌روزرسانی شده
- [ ] تغییرات breaking در changelog ذکر شده
```

## 📚 مستندات

### به‌روزرسانی README
- تغییرات API را مستند کنید
- مثال‌های جدید اضافه کنید
- تصاویر و نمودارها را به‌روزرسانی کنید

### کامنت‌گذاری کد
```typescript
/**
 * دریافت اطلاعات استریمر از Kick.com API
 * @param username نام کاربری استریمر
 * @returns Promise<Streamer | null>
 */
async getStreamerInfo(username: string): Promise<Streamer | null> {
  // کد...
}
```

## 🎯 اولویت‌های توسعه

### اولویت بالا
- [ ] بهبود عملکرد API
- [ ] اضافه کردن تست‌ها
- [ ] بهینه‌سازی SEO

### اولویت متوسط
- [ ] اضافه کردن ویژگی‌های جدید
- [ ] بهبود UI/UX
- [ ] پشتیبانی از زبان‌های بیشتر

### اولویت پایین
- [ ] اضافه کردن انیمیشن‌ها
- [ ] تم‌های مختلف
- [ ] ویژگی‌های پیشرفته

## 📞 تماس

- **Issues**: [GitHub Issues](https://github.com/mb-king/kick-persian-streams/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mb-king/kick-persian-streams/discussions)
- **Email**: [mb-king@github.com](mailto:mb-king@github.com)

## 🙏 تشکر

از مشارکت شما در بهبود این پروژه متشکریم! هر کمک کوچکی ارزشمند است.

---

# 🤝 Contributing Guide

## 📋 How to Contribute

Your contributions to improving this project are highly valuable! Please read this guide.

## 🚀 Getting Started

### 1. Fork the Project
1. Go to the [main repository](https://github.com/mb-king/kick-persian-streams)
2. Click the **Fork** button
3. Fork the repository to your GitHub account

### 2. Clone
```bash
git clone https://github.com/YOUR_USERNAME/kick-persian-streams.git
cd kick-persian-streams
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Project
```bash
npm run dev
```

## 🔧 Development

### Project Structure
```
src/
├── components/          # React Components
├── services/            # API Services
├── types/               # TypeScript Definitions
├── data/                # Static Data
└── styles/              # CSS Files
```

### Coding Standards
- Use **TypeScript**
- Use **Vazirmatn font** for Persian text
- Follow **RTL** for Persian language
- Follow **ESLint** rules

### Committing
```bash
git add .
git commit -m "feat: Add new feature description"
git push origin main
```

## 🐛 Bug Reports

### Before Reporting
1. Ensure the bug exists in the latest version
2. Check for similar issues
3. Document the steps to reproduce

### Bug Report Template
```markdown
## Bug Description
Brief and clear description of the issue

## Steps to Reproduce
1. Go to page ...
2. Click on ...
3. Error occurs

## Expected Behavior
Description of what should happen

## System Information
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0
```

## ✨ Feature Requests

### Before Requesting
1. Discuss your idea with the team
2. Check if it has been requested before
3. Explain the value and use case

### Feature Request Template
```markdown
## Summary
Brief description of requested feature

## Problem
Description of the problem this feature solves

## Proposed Solution
Description of solution or feature

## Alternatives
Alternative solutions (if any)

## Additional Information
Screenshots, examples, or additional info
```

## 🔄 Pull Request

### Before Submitting PR
1. Test your code
2. Follow ESLint rules
3. Add necessary tests
4. Update documentation

### Pull Request Template
```markdown
## Changes
Description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Code tested locally
- [ ] New tests added
- [ ] Existing tests not broken

## Checklist
- [ ] Code follows ESLint
- [ ] Documentation updated
- [ ] Breaking changes noted in changelog
```

## 📚 Documentation

### Updating README
- Document API changes
- Add new examples
- Update images and diagrams

### Code Comments
```typescript
/**
 * Get streamer information from Kick.com API
 * @param username Streamer username
 * @returns Promise<Streamer | null>
 */
async getStreamerInfo(username: string): Promise<Streamer | null> {
  // code...
}
```

## 🎯 Development Priorities

### High Priority
- [ ] Improve API performance
- [ ] Add tests
- [ ] Optimize SEO

### Medium Priority
- [ ] Add new features
- [ ] Improve UI/UX
- [ ] Support more languages

### Low Priority
- [ ] Add animations
- [ ] Different themes
- [ ] Advanced features

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/mb-king/kick-persian-streams/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mb-king/kick-persian-streams/discussions)
- **Email**: [mb-king@github.com](mailto:mb-king@github.com)

## 🙏 Thank You

Thank you for contributing to improving this project! Every little help is valuable.
