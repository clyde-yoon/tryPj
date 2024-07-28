import React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const handleButton = () => {
    router.push('/login');
  };
  return (
    <div>
      <button onClick={handleButton}>go login</button>
    </div>
  );
};

export default Index;
