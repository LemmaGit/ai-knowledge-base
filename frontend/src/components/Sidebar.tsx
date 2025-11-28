import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Plus,
  User,
  Settings,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/dashboard/create-article', label: 'Create Article', icon: Plus },
    { path: '/dashboard/my-articles', label: 'My Articles', icon: FileText },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-base-300">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-content'
                      : 'hover:bg-base-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="divider"></div>
            <Link
              to="/articles"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300"
              onClick={onClose}
            >
              <BookOpen className="h-5 w-5" />
              <span>All Articles</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

