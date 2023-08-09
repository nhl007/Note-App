import NavButtons from './NavButtons';

type navProps = {
  screen: currentScreen;
  setScreen: React.Dispatch<React.SetStateAction<currentScreen>>;
};

const NavBar = ({ screen, setScreen }: navProps) => {
  const onClickScreen = (name: currentScreen) => {
    if (name === screen) {
      return;
    }
    setScreen(name);
  };
  return (
    <nav className='w-full flex justify-between items-center'>
      <img
        src='/vite.svg'
        alt='logo'
        className='w-7 h-7 sm:w-10 sm:h-10'
        width={28}
        height={28}
      />
      <div className=' flex gap-3'>
        <NavButtons
          name='Home'
          active={screen === 'home' ? true : false}
          onClick={() => onClickScreen('home')}
        />
        <NavButtons
          name='Create Note'
          active={screen === 'create' ? true : false}
          onClick={() => onClickScreen('create')}
        />
        {/* <NavButtons
          name='Update Notes'
          active={screen === 'update' ? true : false}
          onClick={() => onClickScreen('update')}
        /> */}
        {/* <NavButtons
          name='Delete Notes'
          active={screen === 'delete' ? true : false}
          onClick={() => onClickScreen('delete')}
        /> */}
        <NavButtons
          name='Login'
          active={screen === 'login' ? true : false}
          onClick={() => onClickScreen('login')}
        />
      </div>
    </nav>
  );
};

export default NavBar;
