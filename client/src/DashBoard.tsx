import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './assets/constants';
import { useAuthContext } from './context/Auth/AuthContext';

const DashBoard = () => {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <section className='flex flex-col justify-start items-start gap-2 sm:gap-6'>
      {user ? (
        <>
          <h1 className=' text-teal-400 font-semibold'>
            Thank You, {user.name} for using{' '}
            <span className=' text-red-300'> Notes By Nihal </span>
          </h1>

          <h1 className=' text-teal-400 font-semibold'>Your Notes :</h1>
          <LoadNotes />
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

const LoadNotes = () => {
  const [notes, setNotes] = useState<NoteMetaData[]>([]);
  const axiosConfig = {
    withCredentials: true,
  };

  const loadNotes = async () => {
    await axios
      .get(`${baseUrl}/notes`, axiosConfig)
      .then((response) => setNotes(response.data.notes))
      .catch((err) => {
        console.log(err);
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
          <div className=' bg-teal-400 text-black' key={note._id}>
            <div className='flex gap-4'>
              <p>{note.title}</p>
              <p>{note.createdAt.toString().slice(0, 10)}</p>
            </div>
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
