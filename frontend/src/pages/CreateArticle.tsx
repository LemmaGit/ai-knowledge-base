import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateArticle } from '../hooks/useArticles';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const CreateArticle = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const createArticle = useCreateArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  const onSubmit = (data: ArticleFormData) => {
    const tags = data.tags
      ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];
    createArticle.mutate({
      ...data,
      tags,
    });
  };

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
              <h1 className="text-4xl font-bold mb-6">Create Article</h1>

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
                    placeholder="Comma-separated tags (e.g., react, javascript, tutorial)"
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
                  <label className="label">
                    <span className="label-text-alt">
                      You can use HTML tags for formatting
                    </span>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createArticle.isPending}
                  >
                    {createArticle.isPending ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Create Article'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateArticle;

