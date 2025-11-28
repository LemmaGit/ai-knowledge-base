import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import { BookOpen, Search, Bot } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="hero min-h-[calc(100vh-200px)] bg-base-200 font-sans">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              AI Knowledge Base Platform
            </h1>
            <p className="text-xl mb-8 text-base-content/70 font-inter">
              Discover, create, and share knowledge with AI-powered insights and
              intelligent search.
            </p>
            <div className="flex gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Go to Dashboard
                  </Link>
                  <Link to="/articles" className="btn btn-outline btn-lg">
                    Browse Articles
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="card-title">Rich Articles</h3>
                <p>
                  Create and share comprehensive articles with rich text
                  formatting and organization.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Search className="h-12 w-12 text-primary mb-4" />
                <h3 className="card-title">Smart Search</h3>
                <p>
                  Find exactly what you're looking for with intelligent search
                  and keyword highlighting.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Bot className="h-12 w-12 text-primary mb-4" />
                <h3 className="card-title">AI Assistant</h3>
                <p>
                  Get instant answers and insights with our AI-powered Q&A
                  assistant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
