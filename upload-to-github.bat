@echo off
echo ========================================
echo رفع مشروع Thara إلى GitHub
echo ========================================

echo الخطوة 1: إنشاء مستودع Git محلي...
git init

echo الخطوة 2: إضافة جميع الملفات...
git add .

echo الخطوة 3: إنشاء أول commit...
git commit -m "first commit - Thara Hospitality Website"

echo الخطوة 4: تغيير اسم الفرع إلى main...
git branch -M main

echo الخطوة 5: ربط المستودع المحلي بـ GitHub...
git remote add origin https://github.com/zozz909/thara2.git

echo الخطوة 6: رفع الملفات إلى GitHub...
git push -u origin main

echo ========================================
echo تم رفع المشروع بنجاح! 🎉
echo يمكنك الآن زيارة: https://github.com/zozz909/thara2
echo ========================================
pause
