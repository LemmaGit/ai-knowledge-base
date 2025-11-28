import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../lib/api';
import type { Article } from '../lib/types';

export const useArticles = (searchQuery?: string) => {
  return useQuery({
    queryKey: ['articles', searchQuery],
    queryFn: async () => {
      const { data } = await api.get<Article[]>('/articles', {
        params: searchQuery ? { search: searchQuery } : {},
      });
      return data;
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await api.get<Article>(`/articles/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (articleData: Partial<Article>) => {
      const { data } = await api.post<Article>('/articles', articleData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Article created successfully!');
      navigate(`/articles/${data._id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create article');
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...articleData }: Partial<Article> & { id: string }) => {
      const { data } = await api.put<Article>(`/articles/${id}`, articleData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', data._id] });
      toast.success('Article updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update article');
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/articles/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Article deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete article');
    },
  });
};

