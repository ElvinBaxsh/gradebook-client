import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/useAuthStore'; // Yaratdığımız store-u import edirik

const Layout = ({ children }) => {
  // Store-dan user məlumatını götürürük. 
  // ProfileSettings-də "updateUser" işə düşən kimi bu hissə avtomatik render olunacaq.
  const user = useAuthStore((state) => state.user);

  // Adın baş hərflərini götürmək üçün köməkçi funksiya
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* 2. ƏSAS SAHƏ */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 z-30 w-full">
          
          {/* SEARCH */}
          <div className="relative hidden md:flex items-center flex-1 max-w-md ml-20">
            <Search className="absolute left-4 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Sistemdə axtarış edin..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Sağ tərəf: Bildirişlər və Profil */}
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="w-px h-8 bg-slate-100 mx-1"></div>

            <Link 
              to="/settings" 
              className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-[20px] transition-all cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                {/* DİNAMİK AD - Zustand-dan gəlir */}
                <p className="text-xs font-black text-slate-900 italic leading-none">
                  {user?.fullName || "Yüklənir..."}
                </p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Tələbə</p>
              </div>
              
              <div className="relative">
                {/* DİNAMİK AVATAR */}
                <div className="w-11 h-11 rounded-[18px] bg-[#0D8ABC] border-2 border-white overflow-hidden shadow-sm group-hover:shadow-md transition-all flex items-center justify-center text-white font-bold text-xs italic">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    getInitials(user?.fullName)
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
            </Link>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;