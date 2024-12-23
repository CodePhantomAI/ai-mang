import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Organization } from '../models/Organization';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';
import crypto from 'crypto';

// רישום ארגון ומשתמש ראשי
export const register = async (req: Request, res: Response) => {
  try {
    const { organizationName, email, password, firstName, lastName } = req.body;

    // בדיקה אם הארגון כבר קיים
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ error: 'ארגון עם אימייל זה כבר קיים במערכת' });
    }

    // יצירת ארגון חדש
    const organization = new Organization({
      name: organizationName,
      email
    });
    await organization.save();

    // יצירת משתמש ראשי
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({
      organizationId: organization._id,
      firstName,
      lastName,
      email,
      password,
      role: 'admin',
      emailVerificationToken: verificationToken
    });
    await user.save();

    // שליחת אימייל אימות
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'הארגון והמשתמש נוצרו בהצלחה. נשלח אימייל אימות.' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה ביצירת החשבון' });
  }
};

// התחברות
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'פרטי התחברות שגויים' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'פרטי התחברות שגויים' });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ error: 'נא לאמת את כתובת האימייל' });
    }

    const token = jwt.sign(
      { userId: user._id, organizationId: user.organizationId },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // עדכון תאריך התחברות אחרון
    user.lastLogin = new Date();
    await user.save();

    res.json({ token, user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId
    }});
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בהתחברות' });
  }
};

// אימות אימייל
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'טוקן לא תקין' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ message: 'האימייל אומת בהצלחה' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה באימות האימייל' });
  }
};

// בקשה לאיפוס סיסמה
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'לא נמצא משתמש עם אימייל זה' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // תוקף לשעה
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'נשלח אימייל עם הוראות לאיפוס הסיסמה' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשליחת אימייל איפוס סיסמה' });
  }
};

// איפוס סיסמה
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'טוקן לא תקין או פג תוקף' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'הסיסמה שונתה בהצלחה' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה באיפוס הסיסמה' });
  }
};
