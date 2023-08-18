import { AuthModel } from './components';
import { useState, useEffect } from 'react';
import { useAuthContext } from './context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [type, setType] = useState<AuthPropType>('login');

  const navigate = useNavigate();

  const {
    state: { token },
  } = useAuthContext();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  if (token) {
    return null;
  }

  return (
    <>
      <AuthModel type={type} setType={setType} />
    </>
  );
};

export default Authentication;
