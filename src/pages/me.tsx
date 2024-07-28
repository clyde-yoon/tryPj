import React from 'react';
import useStore from '@/store/UserStore';

const Me = () => {
  const { user } = useStore((state) => ({
    user: state.user,
  }));

  console.log(user);

  if (!user) {
    return <p>로그인하지 않았습니다.</p>;
  }

  return (
    <div>
      <p>안녕하세요, {user.name}님!</p>
    </div>
  );
};

export default Me;
