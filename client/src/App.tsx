import { useState } from 'react';
import DashBoard from './DashBoard';
import { CreateNote, DeleteNotes, UpdateNotes, NavBar } from './components';
import Authentication from './Authentication';

function App() {
  const [screen, setScreen] = useState<currentScreen>('home');
  return (
    <div id='app' className=''>
      <NavBar screen={screen} setScreen={setScreen} />
      <div className='flex flex-col'>
        {screen === 'home' ? (
          <DashBoard />
        ) : screen === 'create' ? (
          <CreateNote />
        ) : screen === 'delete' ? (
          <DeleteNotes />
        ) : screen === 'update' ? (
          <UpdateNotes />
        ) : (
          <Authentication />
        )}
      </div>
    </div>
  );
}

export default App;
