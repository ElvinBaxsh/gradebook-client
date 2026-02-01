import { Award, TrendingUp } from 'lucide-react';

const Achievements = () => {
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
      <div className="flex justify-between w-full mb-4">
        <h3 className="font-bold text-slate-800 italic">Achievements</h3>
        <TrendingUp size={18} className="text-blue-500" />
      </div>
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-inner">
        <Award size={48} className="text-yellow-500" />
      </div>
      <p className="font-bold text-slate-700 text-sm">20 Assignments Done</p>
      <p className="text-[10px] text-slate-400 font-medium">in Two Weeks</p>
      <button className="mt-6 text-xs font-bold text-blue-600 hover:underline">View All</button>
    </div>
  );
};

export default Achievements;