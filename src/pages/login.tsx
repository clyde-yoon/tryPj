import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '@/store/UserStore';
import style from '@/styles/login.module.css';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const { isPending, login } = useStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(values);
      router.push('/me');
    } catch (error) {
      console.error('Login failed:', error);
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
        <button type="submit" disabled={isPending}>
          로그인
        </button>
      </form>
      <p onClick={handleGoRegister}>회원가입</p>
    </div>
  );
};

export default Login;
