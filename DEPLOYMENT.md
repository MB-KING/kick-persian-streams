# راهنمای دیپلوی روی GitHub Pages

## مرحله 1: ایجاد Repository روی GitHub

1. به [GitHub](https://github.com) بروید
2. روی "New repository" کلیک کنید
3. نام repository را `kick-persian-streams` قرار دهید
4. Repository را public کنید
5. روی "Create repository" کلیک کنید

## مرحله 2: Push کردن کد

در ترمینال پروژه، این دستورات را اجرا کنید:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: React TypeScript project with Vite"

# Set main branch
git branch -M main

# Add remote origin (YOUR_USERNAME را با نام کاربری GitHub خود جایگزین کنید)
git remote add origin https://github.com/YOUR_USERNAME/kick-persian-streams.git

# Push to GitHub
git push -u origin main
```

## مرحله 3: دیپلوی

```bash
# Deploy to GitHub Pages
npm run deploy
```

## مرحله 4: تنظیمات GitHub Pages

1. به repository خود روی GitHub بروید
2. به Settings > Pages بروید
3. در بخش "Source"، "Deploy from a branch" را انتخاب کنید
4. Branch را "gh-pages" انتخاب کنید
5. روی "Save" کلیک کنید

## مرحله 5: دسترسی به سایت

بعد از چند دقیقه، سایت شما روی این آدرس قابل دسترسی خواهد بود:
```
https://YOUR_USERNAME.github.io/kick-persian-streams
```

## نکات مهم

- بعد از هر تغییر در کد، `npm run deploy` را اجرا کنید
- ممکن است چند دقیقه طول بکشد تا تغییرات روی سایت اعمال شود
- اگر با خطا مواجه شدید، Actions tab در GitHub را چک کنید

## عیب‌یابی

### مشکل: سایت لود نمی‌شود
- مطمئن شوید که repository public است
- Settings > Pages را چک کنید
- Actions tab را برای خطاها بررسی کنید

### مشکل: تصاویر یا فایل‌های استاتیک لود نمی‌شوند
- مطمئن شوید که `base: '/kick-persian-streams/'` در `vite.config.ts` تنظیم شده
- مسیرهای نسبی را چک کنید

### مشکل: Routing کار نمی‌کند
- برای SPA ها، 404.html redirect نیاز است
- یا از HashRouter استفاده کنید
