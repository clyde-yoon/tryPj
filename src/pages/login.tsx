import React from 'react';
import style from '@/styles/login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from '@/lib/axios';

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=None`;
};

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    try {
      const res = await axios.post('/auth/signIn', {
        email,
        password,
      });

      // 응답 본문에서 쿠키 추출
      const { accessToken, refreshToken } = res.data;

      // 쿠키 저장
      setCookie('accessToken', accessToken, 7); // 7일 동안 유효
      setCookie('refreshToken', refreshToken, 7); // 7일 동안 유효

      console.log('Login successful:', res.data);

      // 로그인 성공 후 리디렉션
      router.push('/me');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const router = useRouter();
  const handleGoRegister = () => {
    router.push('/register');
  };
  return (
    <div className={style.LoginContainer}>
      <p className={style.LoginTitle}>로그인</p>
      <form onSubmit={handleSubmit} className={style.LoginForm}>
        <label htmlFor="">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button>로그인</button>
      </form>
      <p onClick={handleGoRegister}>회원가입</p>
    </div>
  );
};

export default Login;
