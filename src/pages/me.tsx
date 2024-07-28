import React, { useEffect, useState } from 'react';
import useStore from '@/store/UserStore';

const Me = () => {
  const { user, updateMe } = useStore((state) => ({
    user: state.user,
    updateMe: state.updateMe,
  }));

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    updateMe();
  }, [updateMe]);

  if (!hydrated) {
    return null; // 클라이언트에서만 렌더링
  }

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
