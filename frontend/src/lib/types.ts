export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role?: string;
}

export interface AuthTokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  description: string;
  summary?: string;
  tags?: string[];
  author: string | User;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

