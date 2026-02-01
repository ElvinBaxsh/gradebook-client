const AttendanceChart = () => {
  const months = [
    { name: 'Jan', val: 40 },
    { name: 'Feb', val: 20 },
    { name: 'Mar', val: 60 },
    { name: 'Apr', val: 10 }
  ];

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-slate-800 italic">Missing Classes</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase">This Semester</span>
      </div>
      <div className="flex justify-between items-end h-32 gap-2">
        {months.map((m, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div 
              style={{ height: `${m.val}%` }} 
              className="w-full bg-slate-100 rounded-t-lg group-hover:bg-blue-500 transition-all duration-300 relative"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100">{m.val/10}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{m.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};