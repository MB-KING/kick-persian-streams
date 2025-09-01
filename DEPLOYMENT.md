# 🚀 راهنمای Deploy روی GitHub Pages

## 📋 مراحل Deploy

### 1. آماده‌سازی پروژه
```bash
# Build کردن پروژه
npm run build

# بررسی فایل‌های تولید شده
ls dist/
```

### 2. تنظیمات Git
```bash
# اضافه کردن همه تغییرات
git add .

# Commit کردن تغییرات
git commit -m "feat: Add Persian streamers list with real-time data"

# Push کردن به GitHub
git push origin main
```

### 3. فعال‌سازی GitHub Pages

1. به repository خود در GitHub بروید
2. روی **Settings** کلیک کنید
3. از منوی سمت چپ **Pages** را انتخاب کنید
4. در بخش **Source**:
   - **Deploy from a branch** را انتخاب کنید
   - **Branch** را `main` انتخاب کنید
   - **Folder** را `/ (root)` انتخاب کنید
5. روی **Save** کلیک کنید

### 4. تنظیمات Vite

فایل `vite.config.ts` باید شامل تنظیمات زیر باشد:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/kick-persian-streams/', // نام repository شما
  // ... سایر تنظیمات
})
```

### 5. بررسی Deploy

- چند دقیقه صبر کنید تا GitHub Pages فعال شود
- آدرس سایت شما: `https://mb-king.github.io/kick-persian-streams/`

## 🔧 عیب‌یابی

### مشکل: صفحه سفید نمایش داده می‌شود
**راه حل**: بررسی کنید که `base` در `vite.config.ts` درست تنظیم شده باشد

### مشکل: فونت‌ها لود نمی‌شوند
**راه حل**: فونت وزیر از Google Fonts لود می‌شود، اتصال اینترنت را بررسی کنید

### مشکل: API کار نمی‌کند
**راه حل**: در production، CORS ممکن است مشکل ایجاد کند. از proxy استفاده کنید

## 📱 تست Responsive

پس از deploy، روی دستگاه‌های مختلف تست کنید:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🎯 بهینه‌سازی

### Performance
- فایل‌های CSS و JS فشرده شده‌اند
- تصاویر بهینه شده‌اند
- Lazy loading برای کارت‌ها

### SEO
- Meta tags فارسی و انگلیسی
- Open Graph tags
- Structured data

## 🔄 به‌روزرسانی

برای به‌روزرسانی سایت:
```bash
npm run build
git add .
git commit -m "update: New features and improvements"
git push origin main
```

GitHub Pages به صورت خودکار به‌روزرسانی می‌شود.

---

# 🚀 GitHub Pages Deployment Guide

## 📋 Deployment Steps

### 1. Project Preparation
```bash
# Build project
npm run build

# Check generated files
ls dist/
```

### 2. Git Setup
```bash
# Add all changes
git add .

# Commit changes
git commit -m "feat: Add Persian streamers list with real-time data"

# Push to GitHub
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Select **Pages** from left menu
4. In **Source** section:
   - Select **Deploy from a branch**
   - Choose **Branch** as `main`
   - Choose **Folder** as `/ (root)`
5. Click **Save**

### 4. Vite Configuration

Your `vite.config.ts` should include:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/kick-persian-streams/', // Your repository name
  // ... other configs
})
```

### 5. Check Deployment

- Wait a few minutes for GitHub Pages to activate
- Your site URL: `https://mb-king.github.io/kick-persian-streams/`

## 🔧 Troubleshooting

### Issue: White page
**Solution**: Check that `base` in `vite.config.ts` is correctly set

### Issue: Fonts not loading
**Solution**: Vazirmatn font loads from Google Fonts, check internet connection

### Issue: API not working
**Solution**: In production, CORS might cause issues. Use proxy

## 📱 Responsive Testing

After deployment, test on different devices:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🎯 Optimization

### Performance
- CSS and JS files are minified
- Images are optimized
- Lazy loading for cards

### SEO
- Persian and English meta tags
- Open Graph tags
- Structured data

## 🔄 Updates

To update the site:
```bash
npm run build
git add .
git commit -m "update: New features and improvements"
git push origin main
```

GitHub Pages updates automatically.
