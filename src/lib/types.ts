// טיפוסים בסיסיים למערכת
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt?: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  source?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  author: User;
  published: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'maintenance';
  owner: User;
  lastChecked?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

// טיפוסים לסטטיסטיקות
export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  totalPosts: number;
  activeWebsites: number;
}

// טיפוסים לתגובות מהשרת
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// טיפוסים לבקשות
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  firstName?: string;
  lastName?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
  token: string;
}
