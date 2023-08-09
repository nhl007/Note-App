import { AuthModel } from './components';
import { useState } from 'react';

const Authentication = () => {
  const [type, setType] = useState<AuthPropType>('login');
  return (
    <>
      <AuthModel type={type} setType={setType} />
    </>
  );
};

export default Authentication;
