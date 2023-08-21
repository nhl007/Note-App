import { AuthModel } from '../components';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFeatureContext } from '../context/Feature/FeatureContext';

const Authentication = () => {
  const [type, setType] = useState<AuthPropType>('login');

  const navigate = useNavigate();

  const {
    state: { token },
  } = useAuthContext();

  const { setScreen } = useFeatureContext();

  useEffect(() => {
    document.title = 'Notes By Nihal';
    setScreen('auth');
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
