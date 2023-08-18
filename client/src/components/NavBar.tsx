import { useState } from 'react';
import { useAuthContext } from '../context/Auth/AuthContext';
import NavButtons from './NavButtons';

import { useNavigate } from 'react-router-dom';

type screens = 'home' | 'create' | 'login' | 'profile';

const NavBar = () => {
  const navigate = useNavigate();
  const {
    state: { token, user },
    logout,
  } = useAuthContext();
  const [screen, setScreen] = useState<screens>('home');
  return (
    <nav className='w-full flex justify-between items-center'>
      <img
        src='/vite.svg'
        alt='logo'
        className='w-7 h-7 sm:w-10 sm:h-10'
        width={28}
        height={28}
      />
      <div className=' flex gap-4'>
        <NavButtons
          to='/'
          name='Home'
          active={screen === 'home' ? true : false}
          onClick={() => setScreen('home')}
        />
        {token ? (
          <>
            <NavButtons
              name='Create Note'
              to='/create'
              active={screen === 'create' ? true : false}
              onClick={() => setScreen('create')}
            />
            <div
              onClick={() => {
                setScreen('profile');
                navigate('/profile');
              }}
              className=' cursor-pointer flex justify-center items-center bg-teal-400 text-black rounded-[28px] w-11 h-11 text-xl'
            >
              {user?.image?.url ? (
                <img
                  className='rounded-[22px] w-11 h-11 object-cover'
                  src={user.image.url}
                  alt='img'
                  width={40}
                  height={40}
                />
              ) : (
                user?.name.charAt(0).toUpperCase()
              )}
            </div>

            <NavButtons
              to='/auth'
              name='Logout'
              active={false}
              onClick={logout}
            />
          </>
        ) : (
          <NavButtons
            to='/auth'
            name='Login'
            active={screen === 'login' ? true : false}
            onClick={() => setScreen('home')}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
