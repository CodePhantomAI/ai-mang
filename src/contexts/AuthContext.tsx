import React, { createContext, useContext, useState } from 'react';
import { User, RegisterRequest } from '../lib/types';
import { login as authLogin, register as authRegister, resetPassword as authResetPassword } from '../lib/auth';
import { toast } from 'react-hot-toast';

interface Organization {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  currentOrganization: Organization | null;
  userOrganizations: Organization[];
  switchOrganization: (orgId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [userOrganizations] = useState<Organization[]>([
    { id: '1', name: 'ארגון לדוגמה' }
  ]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authLogin(email, password);
      if (response.success && response.data) {
        setUser(response.data);
        toast.success('התחברת בהצלחה!');
      } else {
        toast.error(response.error || 'שגיאה בהתחברות');
      }
    } catch (error) {
      toast.error('שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await authRegister(data);
      if (response.success && response.data) {
        setUser(response.data);
        toast.success('נרשמת בהצלחה!');
      } else {
        toast.error(response.error || 'שגיאה בהרשמה');
      }
    } catch (error) {
      toast.error('שגיאה בהרשמה');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await authResetPassword(email);
      if (response.success) {
        toast.success(response.message || 'הוראות לאיפוס הסיסמה נשלחו לאימייל שלך');
      } else {
        toast.error(response.error || 'שגיאה בשליחת המייל');
      }
    } catch (error) {
      toast.error('שגיאה בשליחת המייל');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setCurrentOrganization(null);
    toast.success('התנתקת בהצלחה!');
  };

  const switchOrganization = (orgId: string) => {
    const org = userOrganizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      toast.success(`עברת לארגון: ${org.name}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        resetPassword,
        currentOrganization,
        userOrganizations,
        switchOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
