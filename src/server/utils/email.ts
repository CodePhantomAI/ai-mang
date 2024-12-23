import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'אימות כתובת אימייל',
    html: `
      <div dir="rtl">
        <h1>ברוכים הבאים!</h1>
        <p>תודה שנרשמתם למערכת. נא ללחוץ על הקישור הבא כדי לאמת את כתובת האימייל שלכם:</p>
        <a href="${verificationUrl}">לחצו כאן לאימות האימייל</a>
        <p>הקישור תקף ל-24 שעות.</p>
      </div>
    `
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'איפוס סיסמה',
    html: `
      <div dir="rtl">
        <h1>איפוס סיסמה</h1>
        <p>קיבלנו בקשה לאיפוס הסיסמה שלך. אם לא ביקשת לאפס את הסיסמה, אפשר להתעלם מהודעה זו.</p>
        <p>לאיפוס הסיסמה, לחץ על הקישור הבא:</p>
        <a href="${resetUrl}">לחצו כאן לאיפוס הסיסמה</a>
        <p>הקישור תקף לשעה אחת.</p>
      </div>
    `
  });
};
