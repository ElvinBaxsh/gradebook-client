const UpcomingTests = ({ tests }) => {
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 italic">Upcoming Tests</h3>
        <span className="text-xs text-slate-400 font-medium">This Week</span>
      </div>
      <div className="space-y-5">
        {tests.map((test, i) => (
          <div key={i} className="flex justify-between items-center group cursor-pointer">
            <div>
              <p className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{test.subject}</p>
              <p className="text-[10px] text-slate-400 font-medium">{test.topic}</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">{test.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTests;