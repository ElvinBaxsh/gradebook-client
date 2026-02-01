import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import useAuthStore from '../../store/useAuthStore'; 
import { getFormattedDate, getWeekday } from '../../utils/dateHelpers';
import { 
  BookOpen, Video, CheckCircle, Award, 
  TrendingUp, Clock, ChevronRight, Upload, Calendar
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  
  // Zustand store-dan user məlumatını götürürük
  const user = useAuthStore((state) => state.user);



  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/dashboard/summary', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data))
    .catch(err => {
      console.error("Xəta:", err);
      if (err.response?.status === 401) navigate('/login');
    });
  }, [navigate]);

  if (!data || !user) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-pulse flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold italic text-xs uppercase tracking-widest">Gradebook Yüklənir</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        
        {/* Üst Başlıq - Dinamik Tarix İlə */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 italic tracking-tight">
              Xoş gəldin, {user.fullName}! 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" /> Bugün üçün olan akademik vəziyyətin
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 hidden md:block">
  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
    {getFormattedDate()}
  </p>
  <p className="text-slate-900 font-bold italic">
    {getWeekday()}
  </p>
</div>
        </header>

        <div className="grid grid-cols-12 gap-8 items-stretch">
          
          {/* 1. BUGÜNKÜ CƏDVƏL */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-black text-slate-800 italic uppercase tracking-tight">Bugünkü Dərslər</h2>
                <div className="p-2 bg-slate-50 rounded-lg"><Clock size={18} className="text-slate-400" /></div>
              </div>
              
              <div className="space-y-6">
                {data.lessons && data.lessons.length > 0 ? (
                  data.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
                        <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
                      </div>
                      <div className="pb-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tabular-nums">{lesson.startTime}</p>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{lesson.topic || lesson.title}</h4>
                        <p className="text-[10px] text-slate-500 font-bold mt-1 italic">{lesson.roomNumber}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm italic">Bugün üçün dərs tapılmadı.</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. STATİSTİKALAR */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between h-48">
                <div>
                  <h3 className="font-black text-slate-800 italic mb-1">Tapşırıqlar</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Həftəlik Hesabat</p>
                  <div className="flex gap-6">
                    <div><p className="text-xl font-black text-slate-900">12</p><p className="text-[9px] text-slate-400 font-bold uppercase">Bitib</p></div>
                    <div><p className="text-xl font-black text-blue-600">3</p><p className="text-[9px] text-slate-400 font-bold uppercase">Gözləyir</p></div>
                  </div>
                </div>
                <div className="w-24 h-24">
                  <CircularProgressbar 
                    value={80} text={`80%`}
                    styles={buildStyles({ pathColor: '#2563eb', textColor: '#1e293b', trailColor: '#f1f5f9' })}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[40px] shadow-xl shadow-slate-200 flex flex-col justify-between h-48 relative overflow-hidden group">
                <div className="flex justify-between items-start z-10">
                  <Video className="text-blue-400" size={32} />
                  <span className="text-[9px] font-black text-blue-400 border border-blue-400/30 px-2 py-1 rounded-lg uppercase tracking-widest">Yeni Video</span>
                </div>
                <div className="z-10">
                  <h3 className="text-white font-black italic text-lg leading-tight">Dərs Yazıları</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-medium italic">Son yüklənən: React Hooks</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center h-44">
                  <CheckCircle className="text-emerald-500 mb-2" size={28} />
                  <p className="text-2xl font-black text-slate-900">94%</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Davamiyyət</p>
               </div>

               <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center h-44">
                  <Award className="text-amber-500 mb-2" size={28} />
                  <p className="text-sm font-black text-slate-800 italic uppercase tracking-widest">Həftənin Ulduzu</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tighter">Senior.az Nailiyyət</p>
               </div>

               <div className="bg-blue-600 p-6 rounded-[32px] shadow-lg shadow-blue-100 flex flex-col justify-between items-start group cursor-pointer hover:bg-blue-700 transition-all h-44">
                  <Upload className="text-white group-hover:-translate-y-1 transition-transform" size={24} />
                  <h3 className="text-white font-black italic text-md leading-tight">Tapşırığını<br/>Yüklə</h3>
               </div>
            </div>

            {/* İmtahanlar Kartı */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-slate-800 italic uppercase text-xs tracking-[0.2em]">Yaxınlaşan İmtahanlar</h3>
                    <TrendingUp size={18} className="text-slate-300" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {data.stats.upcomingTests && data.stats.upcomingTests.map((test, i) => (
                     <div key={i} className="flex justify-between items-center p-5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white transition-all group">
                        <span className="text-xs font-bold text-slate-700 italic group-hover:text-blue-600">{test.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase">{test.date}</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600" />
                        </div>
                     </div>
                   ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;