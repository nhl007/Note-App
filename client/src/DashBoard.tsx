import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './assets/constants';
import { useAuthContext } from './context/Auth/AuthContext';
import { useFeatureContext } from './context/Feature/FeatureContext';
import { Alert } from './components';

interface DashboardComponentProps {
  setScreen: React.Dispatch<React.SetStateAction<currentScreen>>;
  setUpdateId: React.Dispatch<React.SetStateAction<string>>;
}

const DashBoard = ({ setScreen, setUpdateId }: DashboardComponentProps) => {
  document.title = 'Dashboard';
  const {
    state: { user },
  } = useAuthContext();
  const {
    displayAlert,
    state: { showAlert },
  } = useFeatureContext();

  return (
    <section className='flex flex-col justify-start items-start gap-2 sm:gap-6'>
      {showAlert && <Alert />}
      {user ? (
        <>
          <h1 className=' text-teal-400 font-semibold'>
            Thank You, {user.name} for using{' '}
            <span className=' text-red-300'> Notes By Nihal </span>
          </h1>

          <h1 className=' text-teal-400 font-semibold'>Your Notes :</h1>
          <LoadNotes
            setUpdateId={setUpdateId}
            setScreen={setScreen}
            displayAlert={displayAlert}
          />
        </>
      ) : (
        <h1 className=' text-teal-400 font-semibold'>
          Please Login to use
          <span className=' text-red-300'> Notes By Nihal </span>
        </h1>
      )}
    </section>
  );
};

export default DashBoard;

interface LoadNotesProps extends DashboardComponentProps {
  displayAlert: (alertText: string, Success: boolean) => void;
}

const LoadNotes = ({
  displayAlert,
  setScreen,
  setUpdateId,
}: LoadNotesProps) => {
  const [notes, setNotes] = useState<NoteMetaData[]>([]);
  const axiosConfig = {
    withCredentials: true,
  };

  const loadNotes = async () => {
    await axios
      .get(`${baseUrl}/notes`, axiosConfig)
      .then((response) => {
        if (response.data.notes.length) {
          setNotes(response.data.notes);
          displayAlert('Notes Loaded!', true);
        } else displayAlert('No notes found!', false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNotes = async (id: string) => {
    await axios
      .delete(`${baseUrl}/notes/${id}`, axiosConfig)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        displayAlert('Note deleted successfully!', true);
      })
      .catch(() => {
        displayAlert('Error Occurred! Try again', true);
      });
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {notes.length ? (
        notes.map((note) => (
          <div className=' bg-teal-400 text-black px-4 py-2' key={note._id}>
            <div className='flex gap-4'>
              <p>{note.title}</p>
              <button
                onClick={() => {
                  setUpdateId(note._id);
                  setScreen('update');
                }}
                className=' text-white py-0 px-2'
              >
                🖊
              </button>
              <button
                onClick={() => deleteNotes(note._id)}
                className='text-white py-0 px-2'
              >
                ❌
              </button>
            </div>
            <p>{note.createdAt.toString().slice(0, 10)}</p>
            <div>
              <p>{note.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No notes found !</p>
      )}
    </div>
  );
};
