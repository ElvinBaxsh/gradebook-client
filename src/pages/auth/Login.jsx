import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore'; // Store-u import edirik

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login); // Store-dan login funksiyasını götürürük
  const logoutStore = useAuthStore((state) => state.logout); // Store-dan logout funksiyasını götürürük

  // 1. Səhifə yüklənəndə köhnə qalıqları təmizləyirik (Store vasitəsilə)
  useEffect(() => {
    logoutStore();
  }, [logoutStore]);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    if (res.data.token) {
      // 1. Store-u yenilə
      loginStore(res.data.user, res.data.token);
      
      console.log("LocalStorage yoxlanılır:", localStorage.getItem('token'));

      // 2. Əgər navigate hələ də ilişirsə, səhifəni tam yeniləyərək keç:
      // Bu, React state-nin "donub qalmasını" 100% həll edir.
      window.location.href = '/dashboard'; 
    }
  } catch (err) {
    alert(err.response?.data?.message || "Xəta!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d5d5d5] p-4">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-pink-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-2xl mb-4 shadow-lg shadow-pink-200 text-white text-3xl font-bold italic">S</div>
          <h1 className="text-3xl font-extrabold text-gray-800">Xoş Gəlmisiniz!</h1>
          <p className="text-gray-400 mt-2">Senior.az Tələbə Kabineti</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-200 rounded-2xl py-3.5 pl-12 pr-12 outline-none transition-all"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Gözləyin..." : "Daxil Ol"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 font-medium text-sm">
          Hesabınız yoxdur?{' '}
          <Link to="/register" className="text-pink-500 font-bold hover:underline">Qeydiyyatdan keçin</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;