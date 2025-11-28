import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import Layout from '../components/Layout';
import { Search, Loader2 } from 'lucide-react';

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles, isLoading, error } = useArticles(searchQuery);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Articles</h1>

          {/* Search Bar */}
          <div className="form-control mb-8">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-square">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="alert alert-error">
              <span>Failed to load articles. Please try again.</span>
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && !error && (
            <>
              {articles && articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <div key={article._id} className="card bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">
                          {highlightText(article.title, searchQuery)}
                        </h2>
                        <p className="text-sm text-base-content/70 line-clamp-3">
                          {highlightText(
                            article.description || article.content.substring(0, 150),
                            searchQuery
                          )}
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
                        <div className="card-actions justify-end mt-4">
                          <Link
                            to={`/articles/${article._id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-base-content/70">
                    No articles found. {searchQuery && 'Try a different search term.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Articles;

