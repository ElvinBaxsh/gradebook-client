import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { User, Mail, Lock, Camera, Save, Globe } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore'; // Store-u import edirik

const ProfileSettings = () => {
  // Zustand store-dan istifadəçi məlumatlarını və yeniləmə funksiyasını götürürük
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatar: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // 1. Məlumatları ilkin olaraq Store-dan yükləyirik
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        avatar: user.avatar || ''
      }));
    }
  }, [user]);

  // 2. Yeniləmə funksiyası
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return alert("Şifrələr üst-üstə düşmür!");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Yalnız lazım olan sahələri backend-ə göndəririk
      const updatePayload = {
        fullName: formData.fullName,
        avatar: formData.avatar,
        password: formData.password
      };

      const res = await axios.put('http://localhost:5000/api/auth/update-profile', updatePayload, { 
        headers: { Authorization: `Bearer ${token}` }
      });

      // ZUSTAND STORE-u yeniləyirik. 
      // Bu funksiya həm localStorage-ı yeniləyəcək, həm də Layout-u anında dəyişəcək.
      updateUser(res.data.user);
      
      alert("Profil uğurla yeniləndi!");
      
      // Şifrə sahələrini təmizləyirik
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      
    } catch (err) {
      alert(err.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-20">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Profil Tənzimləmələri</h1>
          <p className="text-slate-500 font-medium italic">Hesab məlumatlarınızı buradan yeniləyin.</p>
        </header>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <form onSubmit={handleUpdate}>
            {/* Üst hissə - Avatar */}
            <div className="bg-slate-50 p-10 flex flex-col items-center border-b border-slate-100">
              <div className="relative">
                <img 
                  src={formData.avatar || 'https://ui-avatars.com/api/?name=' + formData.fullName} 
                  className="w-32 h-32 rounded-[40px] object-cover border-4 border-white shadow-xl" 
                  alt="Profile" 
                />
                <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600 transition-all shadow-lg">
                  <Camera size={20} />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            {/* Giriş Sahələri */}
            <div className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                    <User size={12} /> Tam Adınız
                  </label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-700"
                  />
                </div>
                <div className="space-y-2 text-opacity-50">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                    <Mail size={12} /> Email Ünvanı (Dəyişdirilə bilməz)
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="w-full p-4 bg-slate-200 rounded-2xl border border-slate-100 outline-none cursor-not-allowed font-bold text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                  <Globe size={12} /> Avatar URL
                </label>
                <input 
                  type="text" 
                  value={formData.avatar}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-50 font-mono text-xs"
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-6">
                <h3 className="text-sm font-black text-slate-800 italic uppercase tracking-wider flex items-center gap-2">
                  <Lock size={16} className="text-blue-600" /> Şifrəni Dəyiş
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="password" 
                    placeholder="Yeni şifrə" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-50 text-sm"
                  />
                  <input 
                    type="password" 
                    placeholder="Şifrənin təkrarı" 
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-50 text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] shadow-xl shadow-slate-100 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Yadda saxlanılır..." : "Yadda Saxla"} <Save size={20} className="group-hover:translate-y-[-2px] transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;