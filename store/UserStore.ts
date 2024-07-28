import { create } from 'zustand';

const useUserStore = create(() => ({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
}));

export default useUserStore;
