import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../assets/constants';

import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor';
import Dropdown from './Dropdown';

const UpdateNotes = () => {
  document.title = 'Update Notes';

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
        console.log(err);
      });
  };

  useEffect(() => {
    getNoteInfo();
  }, []);

  const onSubmit = async () => {
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
      .then((response) => {
        return response.data.notes;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className='flex w-full flex-col justify-start items-start gap-6'>
      <h1 className=' mt-6 text-teal-400 font-semibold'>Create A New Note</h1>
      <div className=' flex gap-3 relative items-center'>
        <input
          className='border-[2px] min-w-[350px] border-teal-400 bg-transparent placeholder:text-white text-white rounded-[10px] p-[10px]'
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
      <button onClick={onSubmit}>test</button>
    </section>
  );
};

export default UpdateNotes;
