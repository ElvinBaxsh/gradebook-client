import { Home, Calendar, MessageSquare, CheckSquare, BarChart2, Book, PlayCircle, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    // { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: PlayCircle, label: 'Video Dərslər', path: '/videos' },
    // { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Book, label: 'Library', path: '/library' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="w-20 h-screen bg-white border-r border-pink-50 flex flex-col items-center py-8 fixed left-0 top-0 z-50">
      
      {/* Logo Hissəsi */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200 cursor-pointer hover:scale-105 transition-transform">
          <span className="text-white font-black italic text-xl">S</span>
        </div>
      </div>

      {/* Menyu İkonları */}
      <nav className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' 
                : 'text-gray-400 hover:bg-pink-50 hover:text-blue-500'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Hover olanda görünən kiçik yazı (Tooltip) */}
              <span className="absolute left-20 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Alt Hissə: Ayarlar və Çıxış */}
      <div className="flex flex-col gap-4 mt-auto border-t border-gray-50 pt-6">
        <button className="p-3.5 text-gray-400 hover:bg-gray-100 rounded-2xl transition-all">
          <Settings size={22} />
        </button>
        <button 
          onClick={handleLogout}
          className="p-3.5 text-red-400 hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;