import { User, RegisterRequest, ApiResponse } from './types';

// פונקציות עזר לאותנטיקציה
export const generateToken = (user: User): string => {
  // בסביבת פיתוח, נחזיר טוקן פשוט
  return `dev-token-${user.id}-${Date.now()}`;
};

export const validateToken = (token: string): boolean => {
  // בסביבת פיתוח, נאמת טוקן פשוט
  return token.startsWith('dev-token-');
};

// בסביבת פיתוח, נשתמש במשתמש לדוגמה
const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  firstName: 'ישראל',
  lastName: 'ישראלי',
  role: 'user',
  createdAt: new Date(),
};

export const login = async (email: string, password: string): Promise<ApiResponse<User>> => {
  // בסביבת פיתוח, נדמה תהליך התחברות
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'test@example.com' && password === 'password') {
    return {
      success: true,
      data: mockUser,
      message: 'התחברת בהצלחה'
    };
  }

  return {
    success: false,
    error: 'פרטי ההתחברות שגויים'
  };
};

export const register = async (data: RegisterRequest): Promise<ApiResponse<User>> => {
  // בסביבת פיתוח, נדמה תהליך הרשמה
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newUser: User = {
    ...mockUser,
    id: Date.now().toString(),
    firstName: data.firstName,
    lastName: data.lastName,
    createdAt: new Date()
  };

  return {
    success: true,
    data: newUser,
    message: 'נרשמת בהצלחה'
  };
};

export const resetPassword = async (email: string): Promise<ApiResponse<void>> => {
  // בסביבת פיתוח, נדמה תהליך איפוס סיסמה
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'test@example.com') {
    return {
      success: true,
      message: 'הוראות לאיפוס הסיסמה נשלחו לכתובת המייל שלך'
    };
  }

  return {
    success: false,
    error: 'לא נמצא משתמש עם כתובת המייל הזו'
  };
};
