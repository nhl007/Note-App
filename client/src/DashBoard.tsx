import { useAuthContext } from './context/Auth/AuthContext';
import { useFeatureContext } from './context/Feature/FeatureContext';
import { Alert, ViewPrivateNotes, ViewPublicNotes } from './components';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

const DashBoard = () => {
  document.title = 'Dashboard';
  const {
    state: { user },
  } = useAuthContext();
  const {
    state: { showAlert },
  } = useFeatureContext();

  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    axios
      .get('https://nhl-note-api.vercel.app/')
      .then((response) => {
        response;
      })
      .catch(() => {
        console.log('sss');
      });
  }, []);

  return (
    <section className='flex flex-col justify-start items-start gap-2 sm:gap-6 w-full h-full'>
      {showAlert && <Alert />}
      {user ? (
        <>
          <div className='absolute right-4  sm:right-8 flex gap-4 mt-0 sm:mt-6'>
            <button
              className={`${isPrivate ? 'border-teal-400' : 'border-white'}`}
              onClick={() => setIsPrivate(true)}
            >
              Private
            </button>
            <button
              className={`${isPrivate ? 'border-white' : 'border-teal-400'}`}
              onClick={() => setIsPrivate(false)}
            >
              Discover
            </button>
          </div>
          <h1 className=' text-teal-400 font-semibold sm:mt-8 mt-12 mb-2 '>
            Thank You, <span className='text-red-300'>{user.name}</span> for
            using
            <span className=' text-red-300'> Notes By Nihal </span>
          </h1>
          {isPrivate ? <ViewPrivateNotes /> : <ViewPublicNotes />}
        </>
      ) : (
        <div className=' flex justify-center items-center text-teal-400 font-semibold h-full w-full '>
          <h2 className=' mt-8 text-xl sm:text-[32px] text-red-300'>
            Please
            <Link to='/auth' className='text-teal-400 mx-2'>
              Login
            </Link>
            to use Notes By Nihal
          </h2>
        </div>
      )}
    </section>
  );
};

export default DashBoard;
