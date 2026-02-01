import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // İlkin dəyərləri ehtiyatlı şəkildə oxuyuruq
  user: (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null,

  login: (userData, token) => {
    console.log("Store: Login başladıldı", userData); // Debug üçün
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    set({ user: userData, token: token });
  },

  updateUser: (updatedData) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return { user: newUser };
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));

export default useAuthStore;