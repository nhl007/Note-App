import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../assets/constants';

import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor';
import Dropdown from './Dropdown';

import { BiArrowBack } from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import { Alert } from '.';
import { useAuthContext } from '../context/Auth/AuthContext';

const UpdateNotes = () => {
  document.title = 'Update Notes';

  const navigate = useNavigate();

  const {
    state: { showAlert },
    displayAlert,
    setIsLoading,
    setScreen,
  } = useFeatureContext();

  const {
    state: { token },
  } = useAuthContext();

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<notePrivacy>('private');
  const [files, setFiles] = useState<noteImages>([]);

  const [html, setHtml] = useState('');

  const axiosConfig = {
    withCredentials: true,
  };

  const getNoteInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/notes/${id}`, axiosConfig)
      .then((response) => {
        const { title, content, privacy } = response.data.note;
        setTitle(() => title);
        setContent(() => content);
        setPrivacy(() => privacy);
        setHtml(() => content);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
        navigate('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setScreen('update');
    if (id && token) {
      getNoteInfo();
    } else navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token && !id) {
    return null;
  }

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .patch(
        `${baseUrl}/notes/${id}`,
        {
          title: title,
          content: content,
          privacy: privacy,
          images: files,
        },
        axiosConfig
      )
      .then(() => {
        displayAlert('Note updated !', true);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className='flex w-full flex-col justify-start items-start gap-4 sm:gap-6'>
      {showAlert && <Alert />}
      <div className=' flex gap-2 items-center text-teal-400'>
        <button
          onClick={() => {
            setScreen('home');
            navigate('/');
          }}
          className=' mt-0 sm:mt-4'
        >
          <BiArrowBack />
        </button>
        <h1>Update Note :</h1>
      </div>
      <div className=' flex gap-3 relative items-center'>
        <input
          className='border-[1px] min-w-[220px] sm:min-w-[350px] border-teal-400 bg-transparent placeholder:text-white text-white rounded-md sm:rounded-[10px] p-[5px] sm:p-[10px] text-sm sm:text-lg'
          placeholder='Edit the title of the note!'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Dropdown privacy={privacy} setPrivacy={setPrivacy} />
      </div>

      <TextEditor
        html={html}
        files={files}
        setFiles={setFiles}
        setContent={setContent}
      />
      <button
        className='flex justify-center items-center max-w-[150px] border-teal-400 border-[1px] hover:border-red-300'
        onClick={onSubmit}
      >
        Save
      </button>
    </section>
  );
};

export default UpdateNotes;
