import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../assets/constants';
import TextEditor from './TextEditor';
import Dropdown from './Dropdown';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import { Alert } from '.';
import { useAuthContext } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  document.title = 'Create Note';
  const navigate = useNavigate();
  const {
    state: { token },
  } = useAuthContext();

  useEffect(() => {
    if (!token) navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<notePrivacy>('private');
  const [files, setFiles] = useState<noteImages>([]);

  const [noteId, setNoteId] = useState(null);

  const {
    state: { showAlert },
    displayAlert,
  } = useFeatureContext();

  const axiosConfig = {
    withCredentials: true,
  };

  const onSubmit = async () => {
    if (!title || !content || !privacy) {
      return displayAlert(
        'Please provide valid title and content of the note!',
        false
      );
    }
    await axios
      .post(
        `${baseUrl}/notes`,
        {
          title: title,
          content: content,
          images: files,
          privacy: privacy,
          id: noteId,
        },
        axiosConfig
      )
      .then((res) => {
        displayAlert(res.data.message, true);
        setNoteId(() => res.data.note._id);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  if (!token) {
    return null;
  }

  return (
    <section className='flex w-full flex-col justify-start items-start sm:gap-6 gap-4'>
      {showAlert && <Alert />}
      <h1 className=' mt-2 sm:mt-6 text-teal-400 font-semibold'>
        Create A New Note
      </h1>
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

      <TextEditor files={files} setFiles={setFiles} setContent={setContent} />
      <button onClick={onSubmit}>Create</button>
    </section>
  );
};

export default CreateNote;
