export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'inProgress' | 'contacted' | 'converted' | 'closed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  lastContact: string | null;
}