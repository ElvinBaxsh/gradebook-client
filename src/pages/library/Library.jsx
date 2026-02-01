import { useState } from 'react';
import Layout from '../../layout/Layout';
import { FileText, Image as ImageIcon, Download, X, Eye, ExternalLink } from 'lucide-react';

const Library = () => {
  const [filter, setFilter] = useState('all');
  const [previewItem, setPreviewItem] = useState(null); // Önizləmə üçün seçilən fayl

  const materials = [
    { id: 1, name: 'JavaScript ES6 Cheat Sheet', type: 'image', size: '1.2 MB', url: 'https://via.placeholder.com/800x1200?text=JS+Cheat+Sheet' },
    { id: 2, name: 'React Hooks Guide', type: 'pdf', size: '3.5 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 3, name: 'Database Design Patterns', type: 'pdf', size: '2.8 MB', url: 'https://www.africau.edu/images/default/sample.pdf' },
    { id: 4, name: 'CSS Flexbox Visual Guide', type: 'image', size: '800 KB', url: 'https://via.placeholder.com/1000x800?text=CSS+Flexbox+Guide' },
  ];

  const filteredMaterials = filter === 'all' ? materials : materials.filter(m => m.type === filter);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto pb-12">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-slate-900">
          <div>
            <h1 className="text-3xl font-black italic tracking-tight">Rəqəmsal Kitabxana</h1>
            <p className="text-slate-500 font-medium italic">Materiallara baxın və ya endirin.</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>Hamısı</button>
            <button onClick={() => setFilter('pdf')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${filter === 'pdf' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>PDF</button>
            <button onClick={() => setFilter('image')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${filter === 'image' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>Şəkillər</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMaterials.map((file) => (
            <div key={file.id} className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-5 cursor-pointer" onClick={() => setPreviewItem(file)}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  {file.type === 'pdf' ? <FileText size={28} /> : <ImageIcon size={28} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{file.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{file.type} • {file.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setPreviewItem(file)} className="p-3 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Bax">
                  <Eye size={20} />
                </button>
                <a href={file.url} download className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="Endir">
                  <Download size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- PREVIEW MODAL --- */}
        {previewItem && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setPreviewItem(null)}></div>
            
            <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${previewItem.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {previewItem.type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
                  </div>
                  <h3 className="font-black text-slate-800 italic">{previewItem.name}</h3>
                </div>
                <div className="flex items-center gap-4">
                    <a href={previewItem.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 p-2"><ExternalLink size={20} /></a>
                    <button onClick={() => setPreviewItem(null)} className="text-slate-400 hover:text-red-500 p-2"><X size={24} /></button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 bg-slate-50 overflow-auto p-4 flex items-center justify-center">
                {previewItem.type === 'image' ? (
                  <img src={previewItem.url} alt={previewItem.name} className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                ) : (
                  <iframe src={`${previewItem.url}#toolbar=0`} className="w-full h-full rounded-lg border-none" title="pdf-preview"></iframe>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Library;