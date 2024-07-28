import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '@/lib/axios'; // Axios 인스턴스 가져오기
import { setCookie, deleteCookie } from 'cookies-next'; // 쿠키 처리 라이브러리

interface User {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: string | null;
  email: string;
}

interface UserStore {
  isPending: boolean;
  user: User | null;
  accessToken: string;
  refreshToken: string;
  actions: {
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    updateMe: () => Promise<void>;
  };
}

const useStore = create<UserStore>(
  persist(
    (set) => ({
      isPending: false,
      user: null,
      accessToken: '',
      refreshToken: '',
      actions: {
        login: async (credentials) => {
          set({ isPending: true });

          try {
            const response = await axios.post('/auth/signIn', credentials);
            const { data } = response;

            // 상태 업데이트
            set({
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              isPending: false,
            });

            // 쿠키에 저장
            setCookie('accessToken', data.accessToken, { path: '/', maxAge: 7 * 24 * 60 * 60 }); // 7일 동안 유효
            setCookie('refreshToken', data.refreshToken, { path: '/', maxAge: 7 * 24 * 60 * 60 }); // 7일 동안 유효
          } catch (error) {
            console.error('Login error:', error);
            set({ isPending: false });
          }
        },
        logout: () => {
          set({
            user: null,
            accessToken: '',
            refreshToken: '',
          });

          // 쿠키 삭제
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        },
        updateMe: async () => {
          // 유저 정보를 업데이트하는 로직
        },
      },
    }),
    {
      name: 'user-store', // 스토어 이름
      getStorage: () => localStorage, // 로컬 스토리지 설정
    }
  )
);

export default useStore;
