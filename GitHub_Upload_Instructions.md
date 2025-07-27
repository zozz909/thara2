# 🚀 تعليمات رفع مشروع Thara على GitHub

## الطريقة الأولى: استخدام Git Command Line

### 1️⃣ تثبيت Git (إذا لم يكن مثبتاً)

**تحميل Git:**
- اذهب إلى: https://git-scm.com/download/win
- حمل وثبت "Git for Windows"
- أعد تشغيل Command Prompt أو PowerShell

### 2️⃣ تشغيل الأوامر

افتح Command Prompt أو PowerShell في مجلد المشروع وشغل:

```bash
# إنشاء مستودع Git محلي
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "first commit - Thara Hospitality Website"

# تغيير اسم الفرع إلى main
git branch -M main

# ربط المستودع بـ GitHub
git remote add origin https://github.com/zozz909/thara2.git

# رفع الملفات
git push -u origin main
```

### 3️⃣ استخدام الملف المساعد

يمكنك استخدام الملف `upload-to-github.bat` الذي أنشأته:
1. انقر نقرة مزدوجة على `upload-to-github.bat`
2. سيتم تنفيذ جميع الأوامر تلقائياً

---

## الطريقة الثانية: استخدام GitHub Desktop

### 1️⃣ تحميل GitHub Desktop
- اذهب إلى: https://desktop.github.com/
- حمل وثبت GitHub Desktop

### 2️⃣ الخطوات:
1. افتح GitHub Desktop
2. اختر "Add an Existing Repository from your Hard Drive"
3. اختر مجلد المشروع
4. اختر "Create a repository"
5. املأ البيانات:
   - **Name**: thara2
   - **Description**: Thara Hospitality Website
6. انقر "Create Repository"
7. انقر "Publish Repository"
8. تأكد من أن الاسم `thara2` والمستخدم `zozz909`
9. انقر "Publish Repository"

---

## الطريقة الثالثة: استخدام VS Code

### 1️⃣ إذا كان VS Code مثبتاً:
1. افتح المشروع في VS Code
2. اذهب إلى Source Control (Ctrl+Shift+G)
3. انقر "Initialize Repository"
4. اكتب رسالة commit: "first commit"
5. انقر "Commit"
6. انقر "Publish to GitHub"
7. اختر "thara2" كاسم للمستودع

---

## 🔧 إعداد Git (أول مرة)

إذا كانت هذه أول مرة تستخدم Git:

```bash
git config --global user.name "zozz909"
git config --global user.email "your-email@example.com"
```

---

## 📁 الملفات المهمة

تأكد من وجود هذه الملفات قبل الرفع:
- ✅ `README.md` - وصف المشروع
- ✅ `.gitignore` - تجاهل الملفات غير المطلوبة
- ✅ `package.json` - معلومات المشروع
- ✅ `src/` - مجلد الكود المصدري
- ✅ `public/` - الملفات العامة

---

## 🌐 بعد الرفع

بعد رفع المشروع بنجاح:
1. **رابط المستودع**: https://github.com/zozz909/thara2
2. **رفع التحديثات المستقبلية**:
   ```bash
   git add .
   git commit -m "وصف التحديث"
   git push
   ```

---

## ❗ حل المشاكل الشائعة

### إذا ظهرت رسالة خطأ "repository already exists":
```bash
git remote remove origin
git remote add origin https://github.com/zozz909/thara2.git
git push -u origin main
```

### إذا طُلب منك تسجيل الدخول:
- استخدم اسم المستخدم: `zozz909`
- استخدم Personal Access Token بدلاً من كلمة المرور

---

**🎉 بعد اتباع أي من الطرق أعلاه، سيكون مشروعك متاحاً على GitHub!**
