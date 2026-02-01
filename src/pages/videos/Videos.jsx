import Layout from '../../layout/Layout';
import { Play, Clock, Calendar } from 'lucide-react';

const Videos = () => {
  const videoList = [
    { 
      id: "dQw4w9WgXcQ", // YouTube Video ID
      title: "React-da Component Quruluşu", 
      date: "26 Yanvar", 
      duration: "45 dəq" 
    },
    { 
      id: "SqcY0GlETPk", 
      title: "Tailwind CSS ilə UI Dizayn", 
      date: "24 Yanvar", 
      duration: "38 dəq" 
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Video Dərslər</h1>
          <p className="text-slate-500 font-medium">YouTube üzərindən qeydə alınmış dərslərin arxivi.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoList.map((vid) => (
            <div key={vid.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              {/* YouTube Preview Thumbnail */}
              <div className="aspect-video relative overflow-hidden bg-slate-200">
                <img 
                  src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`} 
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <Play className="text-white fill-current" size={24} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-slate-800 mb-4 leading-tight min-h-[40px]">{vid.title}</h3>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12} /> {vid.duration}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {vid.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Videos;