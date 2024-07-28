import React from 'react';
import style from '@/styles/login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from '@/lib/axios';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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
    const { name, email, password, passwordConfirmation } = values;
    try {
      const res = await axios.post('/auth/signUp', {
        name,
        email,
        password,
        passwordConfirmation,
      });
      console.log(res);
    } catch {
      console.log('오류입니다');
    }
    router.push('/login');
  };

  const router = useRouter();
  const handleButton = () => {
    router.push('/login');
  };
  return (
    <div className={style.RegisterContainer}>
      <p className={style.LoginTitle}>회원가입</p>
      <form className={style.LoginForm} onSubmit={handleSubmit}>
        <label htmlFor="">이름</label>
        <input
          type="text"
          name="name"
          value={values.name}
          placeholder="이름을 입력해 주세요"
          onChange={handleChange}
        />
        <label htmlFor="">이메일</label>
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="이메일을 입력해 주세요"
          onChange={handleChange}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleChange}
        />
        <label htmlFor="">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          placeholder="비밀번호를 다시 한번 입력해 주세요"
          onChange={handleChange}
        />
        <button>가입하기</button>
      </form>
      <div>
        <p>이미 회원이신가요?</p>
        <p onClick={handleButton}>로그인 하기</p>
      </div>
    </div>
  );
};

export default Register;
