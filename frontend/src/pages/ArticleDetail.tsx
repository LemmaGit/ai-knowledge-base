import { useParams, Link, useNavigate } from 'react-router-dom';
import { useArticle, useDeleteArticle } from '../hooks/useArticles';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Loader2, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import AIChatWidget from '../components/AIChatWidget';
import DeleteModal from '../components/DeleteModal';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, error } = useArticle(id || '');
  const { user } = useAuth();
  const deleteArticle = useDeleteArticle();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAuthor =
    user &&
    article &&
    (typeof article.author === 'string'
      ? article.author === user.id
      : article.author._id === user.id);

  const handleDelete = () => {
    if (id) {
      deleteArticle.mutate(id, {
        onSuccess: () => {
          navigate('/articles');
        },
      });
    }
    setShowDeleteModal(false);
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

  if (error || !article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>Article not found or failed to load.</span>
          </div>
          <Link to="/articles" className="btn btn-primary mt-4">
            Back to Articles
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/articles"
            className="btn btn-ghost btn-sm mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center gap-4 mb-6 text-sm text-base-content/70">
              <span>
                By{' '}
                {typeof article.author === 'object'
                  ? article.author.name
                  : 'Unknown'}
              </span>
              {article.createdAt && (
                <span>
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              )}
              {article.likes !== undefined && (
                <span>{article.likes} likes</span>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {article.summary && (
              <div className="alert alert-info mb-6">
                <div>
                  <h3 className="font-bold">AI Summary</h3>
                  <p>{article.summary}</p>
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="text-lg font-semibold mb-2">Description</p>
              <p className="mb-4">{article.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Content</h2>
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {isAuthor && (
              <div className="flex gap-4 mt-8 pt-8 border-t">
                <Link
                  to={`/dashboard/edit-article/${id}`}
                  className="btn btn-outline"
                >
                  <Edit className="h-4 w-4" />
                  Edit Article
                </Link>
                <button
                  className="btn btn-error"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Article
                </button>
              </div>
            )}
          </article>

          {/* AI Chat Widget */}
          <AIChatWidget articleId={id || ''} />
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        isLoading={deleteArticle.isPending}
      />
    </Layout>
  );
};

export default ArticleDetail;

