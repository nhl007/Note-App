import { useState } from 'react';
import DashBoard from './DashBoard';
import { CreateNote, UpdateNotes, NavBar } from './components';
import Authentication from './Authentication';

function App() {
  const [screen, setScreen] = useState<currentScreen>('home');
  const [updateId, setUpdateId] = useState('');
  return (
    <div id='app' className=''>
      <NavBar screen={screen} setScreen={setScreen} />
      <div className='flex flex-col'>
        {screen === 'home' ? (
          <DashBoard setScreen={setScreen} setUpdateId={setUpdateId} />
        ) : screen === 'create' ? (
          <CreateNote />
        ) : screen === 'update' ? (
          <UpdateNotes id={updateId} />
        ) : (
          <Authentication />
        )}
      </div>
    </div>
  );
}

export default App;
