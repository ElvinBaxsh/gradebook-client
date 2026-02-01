import { useState } from 'react';
import Layout from '../../layout/Layout';
import SubmitModal from '../../pages/tasks/SubmitModal';
import { ClipboardList, Calendar, ChevronRight } from 'lucide-react';

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    { id: 1, title: 'React Context API Tapşırığı', deadline: '29 Yanvar', status: 'pending', desc: 'Global state idarəetməsi' },
    { id: 2, title: 'PostgreSQL Gradebook DB', deadline: '30 Yanvar', status: 'pending', desc: 'Cədvəllərin qurulması' },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pb-12">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Tapşırıqlar</h1>
          <p className="text-slate-500 font-medium italic">Aktiv olan proqramlaşdırma tapşırıqlarınız.</p>
        </header>
        
        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between hover:border-blue-200 hover:shadow-xl hover:shadow-slate-100 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{task.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={12} /> {task.deadline}
                    </p>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <p className="text-[10px] font-bold text-slate-400 italic">{task.desc}</p>
                  </div>
                </div>
              </div>

              {/* BU DÜYMƏ MODALI AÇIR */}
              <button 
                onClick={() => {
                    console.log("Klikləndi:", task.title); // Yoxlamaq üçün
                    setSelectedTask(task);
                }}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
              >
                Həll et <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Modal-ı burada çağırırıq */}
        <SubmitModal 
          isOpen={selectedTask !== null} 
          onClose={() => setSelectedTask(null)} 
          taskTitle={selectedTask?.title} 
        />
      </div>
    </Layout>
  );
};

export default Tasks;