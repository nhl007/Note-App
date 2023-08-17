import { useState } from 'react';
import { useAuthContext } from '../context/Auth/AuthContext';
import NavButtons from './NavButtons';

// type navProps = {
//   screen: currentScreen;
//   setScreen: React.Dispatch<React.SetStateAction<currentScreen>>;
// };

type screens = 'home' | 'create' | 'login';

const NavBar = () => {
  const {
    state: { token },
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
