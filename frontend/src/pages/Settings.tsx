import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
              <h1 className="text-4xl font-bold mb-6">Settings</h1>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title mb-4">Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Theme</h3>
                        <p className="text-sm text-base-content/70">
                          Switch between light and dark mode
                        </p>
                      </div>
                      <button
                        className="btn btn-outline"
                        onClick={toggleTheme}
                      >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                      </button>
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

export default Settings;

