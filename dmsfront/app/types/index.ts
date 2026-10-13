export type Language = 'en' | 'si' | 'ta';

export type UserRole = 'Officer' | 'Reviewer' | 'Approver' | 'Administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatarUrl?: string;
}

export interface Dictionary {
  title: string;
  subTitle: string;
  deptNameEn: string;
  deptNameSi: string;
  deptNameTa: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loginButton: string;
  welcomeMessage: string;
}
