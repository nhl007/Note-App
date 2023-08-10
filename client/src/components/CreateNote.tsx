import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from '../assets/constants';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const axiosConfig = {
    withCredentials: true,
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createNotes = await axios
      .post(
        `${baseUrl}/notes`,
        {
          title: title,
          content: content,
        },
        axiosConfig
      )
      .then((response) => {
        return response.data.notes;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(createNotes);
  };

  return (
    <section className='flex flex-col justify-start items-start gap-2 sm:gap-6'>
      <h1 className=' text-teal-400 font-semibold'>Create A new Note :</h1>
      <form onSubmit={onSubmit}>
        <input
          className=''
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name='title'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit'>Create</button>
      </form>
    </section>
  );
};

export default CreateNote;
