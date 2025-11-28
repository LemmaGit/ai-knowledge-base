import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useArticle, useUpdateArticle } from '../hooks/useArticles';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { Menu, Loader2 } from 'lucide-react';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: article, isLoading } = useArticle(id || '');
  const updateArticle = useUpdateArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        content: article.content,
        tags: article.tags?.join(', ') || '',
      });
    }
  }, [article, reset]);

  const onSubmit = (data: ArticleFormData) => {
    if (!id) return;
    const tags = data.tags
      ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];
    updateArticle.mutate(
      {
        id,
        ...data,
        tags,
      },
      {
        onSuccess: () => {
          navigate(`/articles/${id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>Article not found.</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-200px)]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            <button
              className="btn btn-ghost lg:hidden mb-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Edit Article</h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Article title"
                    className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
                    {...register('title')}
                  />
                  {errors.title && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.title.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description *</span>
                  </label>
                  <textarea
                    placeholder="Brief description of the article"
                    className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                    {...register('description')}
                  />
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Comma-separated tags"
                    className="input input-bordered"
                    {...register('tags')}
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      Separate multiple tags with commas
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content *</span>
                  </label>
                  <textarea
                    placeholder="Article content (supports HTML)"
                    className={`textarea textarea-bordered h-64 ${errors.content ? 'textarea-error' : ''}`}
                    {...register('content')}
                  />
                  {errors.content && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.content.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control mt-6">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => navigate(`/articles/${id}`)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={updateArticle.isPending}
                    >
                      {updateArticle.isPending ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        'Update Article'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditArticle;

