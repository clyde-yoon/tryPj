import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '@/store/UserStore'; // zustand 스토어 가져오기
import style from '@/styles/login.module.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { actions, isPending } = useStore((state) => ({
    actions: state.actions,
    isPending: state.isPending,
  }));

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;

    try {
      await actions.login({ email, password });

      // 로그인 성공 후 리디렉션
      router.push('/me');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoRegister = () => {
    router.push('/register');
  };

  return (
    <div className={style.LoginContainer}>
      <p className={style.LoginTitle}>로그인</p>
      <form onSubmit={handleSubmit} className={style.LoginForm}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={isPending}>로그인</button>
      </form>
      <p onClick={handleGoRegister}>회원가입</p>
    </div>
  );
};

export default Login;
