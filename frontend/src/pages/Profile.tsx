import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

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
              <h1 className="text-4xl font-bold mb-6">Profile</h1>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={user?.name || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered w-full"
                        value={user?.email || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Role</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={user?.role || 'user'}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">
                          Verification Status
                        </span>
                      </label>
                      <div className="badge badge-lg badge-success">
                        {user?.isVerified ? 'Verified' : 'Not Verified'}
                      </div>
                    </div>
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

export default Profile;

