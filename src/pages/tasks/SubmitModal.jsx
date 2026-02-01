import { useState, useEffect } from 'react';
import { 
  Github, 
  FileArchive, 
  Code, 
  Send, 
  Clock, 
  X, 
  XCircle, 
  CheckCircle,
  UploadCloud 
} from 'lucide-react';

const SubmitModal = ({ isOpen, onClose, taskTitle }) => {
  const [method, setMethod] = useState('github');
  const [status, setStatus] = useState('idle'); // idle, waiting, confirmed
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    let timer;
    if (status === 'waiting' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setStatus('confirmed');
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Modal bağlıdırsa heç nə render etmə
  if (!isOpen) return null;

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = () => {
    setStatus('waiting');
    setTimeLeft(300); // 5 dəqiqəni başlat
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Arxa fonu qaralt və klikləyəndə bağla */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={() => {
            if(status !== 'waiting') onClose(); // Gözləmə rejimindədirsə təsadüfən bağlanmasın
        }}
      ></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Bağlama düyməsi */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 z-10 p-2 hover:bg-slate-50 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          {status === 'waiting' ? (
            <div className="text-center py-6 space-y-6">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <span className="text-xs font-black text-slate-800 tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 italic">Göndərilir...</h2>
              <p className="text-slate-400 text-xs px-6 italic leading-relaxed">
                Tapşırıq müvəqqəti yaddaşdadır. Müəllimə ötürülməsinə 5 dəqiqə qaldı.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className="flex items-center gap-2 mx-auto px-8 py-4 bg-red-50 text-red-600 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-red-100 transition-all"
              >
                <XCircle size={16} /> Ləğv et və redaktəyə qayıt
              </button>
            </div>
          ) : status === 'confirmed' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 italic">Uğurla Göndərildi!</h2>
              <p className="text-slate-400 text-sm">Müəllim tezliklə qiymətləndirəcək.</p>
              <button 
                onClick={onClose} 
                className="mt-4 px-10 py-4 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-black"
              >
                Bağla
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 italic mb-1">{taskTitle || "Tapşırıq Təhvili"}</h2>
                <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              </div>

              {/* Metod seçimi */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  {id:'github', icon:Github, label:'GitHub'}, 
                  {id:'file', icon:FileArchive, label:'ZIP'}, 
                  {id:'code', icon:Code, label:'Kod'}
                ].map(item => (
                  <button 
                    key={item.id} 
                    type="button"
                    onClick={() => setMethod(item.id)} 
                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                      method === item.id 
                      ? 'border-blue-600 bg-blue-50/50 text-blue-600' 
                      : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Input sahələri */}
              <div className="mb-8 h-32">
                {method === 'github' && (
                  <input 
                    type="url" 
                    placeholder="GitHub Repozitoriya Linki" 
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-sm font-mono focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
                )}
                {method === 'file' && (
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center group hover:border-blue-400 transition-all h-full flex flex-col items-center justify-center cursor-pointer">
                        <UploadCloud size={24} className="text-slate-300 group-hover:text-blue-500 mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 italic">Arxiv faylını (ZIP/RAR) bura sürükləyin</p>
                    </div>
                )}
                {method === 'code' && (
                  <textarea 
                    rows="4" 
                    placeholder="// Kodunuzu daxil edin..." 
                    className="w-full p-4 bg-slate-900 text-blue-400 rounded-3xl font-mono text-xs outline-none shadow-inner h-full resize-none"
                  ></textarea>
                )}
              </div>

              <button 
                onClick={handleSend} 
                className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                Göndər <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;