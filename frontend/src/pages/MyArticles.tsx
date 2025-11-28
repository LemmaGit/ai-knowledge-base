import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Menu, Edit, Trash2, Loader2 } from 'lucide-react';
import { useDeleteArticle } from '../hooks/useArticles';
import DeleteModal from '../components/DeleteModal';

const MyArticles = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { user } = useAuth();
  const { data: articles, isLoading } = useArticles();
  const deleteArticle = useDeleteArticle();

  const myArticles =
    articles?.filter((article) =>
      typeof article.author === 'string'
        ? article.author === user?.id
        : article.author._id === user?.id
    ) || [];

  const handleDelete = (id: string) => {
    deleteArticle.mutate(id);
    setDeleteId(null);
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

            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">My Articles</h1>
                <Link to="/dashboard/create-article" className="btn btn-primary">
                  Create New Article
                </Link>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : myArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-base-content/70 mb-4">
                    You haven't created any articles yet.
                  </p>
                  <Link to="/dashboard/create-article" className="btn btn-primary">
                    Create Your First Article
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myArticles.map((article) => (
                    <div key={article._id} className="card bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">{article.title}</h2>
                        <p className="text-sm text-base-content/70 line-clamp-3">
                          {article.description || article.content.substring(0, 150)}
                        </p>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {article.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="badge badge-outline badge-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="card-actions justify-end mt-4 gap-2">
                          <Link
                            to={`/articles/${article._id}`}
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </Link>
                          <Link
                            to={`/dashboard/edit-article/${article._id}`}
                            className="btn btn-outline btn-sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => setDeleteId(article._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        isLoading={deleteArticle.isPending}
      />
    </Layout>
  );
};

export default MyArticles;

