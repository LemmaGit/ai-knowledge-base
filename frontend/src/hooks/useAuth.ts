import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../lib/api';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import type { LoginCredentials, SignupData, User, AuthTokens } from '../lib/types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<{ user: User; tokens: AuthTokens }>('/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Login failed');
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (signupData: SignupData) => {
      const { data } = await api.post('/signup', signupData);
      return data;
    },
    onSuccess: () => {
      toast.success('Account created! Please check your email to verify.');
      navigate('/verify-email');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Signup failed');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Optionally call logout endpoint
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/login');
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await api.get('/verify-email', { params: { token } });
      return data;
    },
    onSuccess: () => {
      toast.success('Email verified successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Verification failed');
    },
  });
};

