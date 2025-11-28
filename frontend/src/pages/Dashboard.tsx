import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { Menu, Mail, CheckCircle, XCircle } from 'lucide-react';
import { useVerifyEmail } from '../hooks/useAuth';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setIsResending(true);
    try {
      await api.post('/auth/resend-verification', { email: user.email });
      toast.success('Verification email sent!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-200px)]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            {/* Mobile menu button */}
            <button
              className="btn btn-ghost lg:hidden mb-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

              {/* User Info Card */}
              <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                  <h2 className="card-title">User Information</h2>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Name:</span>
                      <span>{user?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Email:</span>
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Verification Status:</span>
                      {user?.isVerified ? (
                        <span className="flex items-center gap-1 text-success">
                          <CheckCircle className="h-4 w-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-error">
                          <XCircle className="h-4 w-4" />
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {!user?.isVerified && (
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-primary"
                        onClick={handleResendVerification}
                        disabled={isResending}
                      >
                        {isResending ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <>
                            <Mail className="h-4 w-4" />
                            Resend Verification Email
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Total Articles</div>
                  <div className="stat-value text-primary">0</div>
                  <div className="stat-desc">Your published articles</div>
                </div>
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Draft Articles</div>
                  <div className="stat-value text-secondary">0</div>
                  <div className="stat-desc">Articles in progress</div>
                </div>
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Total Views</div>
                  <div className="stat-value text-accent">0</div>
                  <div className="stat-desc">All-time views</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Quick Actions</h2>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <a href="/dashboard/create-article" className="btn btn-primary">
                      Create New Article
                    </a>
                    <a href="/dashboard/my-articles" className="btn btn-outline">
                      View My Articles
                    </a>
                    <a href="/articles" className="btn btn-outline">
                      Browse All Articles
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

