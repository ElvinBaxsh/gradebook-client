import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Camera, Link as LinkIcon, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    avatar: ''
  });
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lokal fayldan şəkil seçimi
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Şəkil çox böyükdür! Maksimum 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Link vasitəsilə şəkil seçimi
  const handleUrlChange = (url) => {
    setFormData({ ...formData, avatar: url });
    setAvatarPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Real Backend Müraciəti aktivləşdirildi
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      console.log("Backend Cavabı:", res.data);
      alert("Qeydiyyat uğurludur! Giriş səhifəsinə yönləndirilirsiniz.");
      
      // Uğurlu qeydiyyatdan sonra login-ə yönləndir
      navigate('/login');
    } catch (err) {
      console.error("Qeydiyyat xətası:", err.response?.data || err.message);
      // Backend-dən gələn xəta mesajını istifadəçiyə göstər (Məs: "Email artıq istifadə olunur")
      alert(err.response?.data?.message || "Qeydiyyat zamanı xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-[450px] w-full bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-10 border border-slate-50">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter">Senior.az</h1>
          <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">Yeni Hesab Yarat</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Avatar Bölməsi */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[32px] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center transition-all group-hover:border-blue-400">
                {avatarPreview ? (
                  <img src={avatarPreview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <User className="text-slate-300" size={32} />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl cursor-pointer shadow-lg hover:bg-slate-900 transition-all active:scale-90">
                <Camera size={16} />
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            
            <div className="mt-4 w-full relative">
              <LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Və ya şəkil URL-i yapışdırın" 
                className="w-full pl-9 pr-4 py-2.5 text-[10px] bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-50 transition-all font-medium"
                onChange={(e) => handleUrlChange(e.target.value)}
              />
            </div>
          </div>

          {/* Ad Soyad */}
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              required
              type="text" 
              placeholder="Tam Adınız"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 text-sm"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="Email ünvanınız"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Şifrə */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              required
              type="password" 
              placeholder="Şifrə təyin edin"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 text-sm"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Gözləyin..." : "Qeydiyyatı Tamamla"} 
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-slate-400 text-xs font-bold">
            Artıq hesabınız var?{' '}
            <Link to="/login" className="text-blue-600 hover:underline ml-1">Daxil olun</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;