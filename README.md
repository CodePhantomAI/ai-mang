# מערכת ניהול

מערכת ניהול מודרנית הבנויה עם React ו-TypeScript, המאפשרת ניהול לידים, פוסטים ואתרים.

## תכונות עיקריות

- 🔐 מערכת אימות משתמשים מלאה (הרשמה, התחברות, איפוס סיסמה)
- 👥 ניהול לידים
- 📝 עורך תוכן מתקדם
- 🌐 ניהול אתרים
- 📊 דשבורד סטטיסטיקות
- 📱 ממשק מותאם למובייל
- 🎨 עיצוב מודרני ונקי
- 🌐 תמיכה מלאה בעברית ו-RTL

## טכנולוגיות

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - React Hot Toast
  - Lucide Icons

- **Backend:**
  - Node.js
  - Express
  - JWT Authentication
  - Nodemailer

## התקנה

1. התקן את הדרישות המקדימות:
   ```bash
   node -v  # נדרש Node.js v18 ומעלה
   ```

2. שכפל את הפרויקט:
   ```bash
   git clone [repository-url]
   cd project
   ```

3. התקן את החבילות הנדרשות:
   ```bash
   npm install
   ```

4. צור קובץ `.env` והגדר את משתני הסביבה הנדרשים:
   ```env
   # Environment Variables
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your-secret-key-here

   # SMTP Configuration
   SMTP_SENDER_NAME="AI Management System"
   SMTP_SENDER_ADDRESS="no-reply@example.com"
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-specific-password
   ```

5. הרץ את הפרויקט במצב פיתוח:
   ```bash
   npm run dev
   ```

## מבנה הפרויקט

```
project/
├── src/
│   ├── components/      # רכיבי React משותפים
│   ├── contexts/        # Context Providers
│   ├── lib/            # פונקציות עזר ו-API
│   ├── pages/          # דפי האפליקציה
│   └── types/          # הגדרות TypeScript
├── public/             # קבצים סטטיים
└── package.json        # תלויות הפרויקט
```

## רכיבים עיקריים

### Navigation
תפריט ניווט ראשי המציג:
- דשבורד
- עורך תוכן
- ניהול לידים
- ניהול אתרים
- יצירת קשר
- פרטי משתמש והתנתקות

### AuthContext
מנהל את מצב האימות של המשתמש:
- התחברות
- הרשמה
- התנתקות
- איפוס סיסמה

### Dashboard
מציג סטטיסטיקות ונתונים חשובים:
- מספר לידים
- מספר פוסטים
- מספר אתרים פעילים
- נתונים אחרונים

## תרומה לפרויקט

1. צור fork של הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. בצע commit לשינויים שלך (`git commit -m 'Add amazing feature'`)
4. דחוף את ה-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## רישיון

פרויקט זה מופץ תחת רישיון MIT. ראה את קובץ `LICENSE` למידע נוסף.

## יצירת קשר

- **שם** - [אימייל](mailto:email@example.com)
- **אתר** - [example.com](https://example.com)

---    

פותח על ידי (https://github.com/CodePhantomAI)] © 2024 
**https://codephantomai.netlify.app**
