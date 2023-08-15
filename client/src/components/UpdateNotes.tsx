import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from '../assets/constants';

interface updateNotesProps {
  id: string;
}

const UpdateNotes = ({ id }: updateNotesProps) => {
  document.title = 'Update Notes';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const axiosConfig = {
    withCredentials: true,
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .patch(
        `${baseUrl}/notes/${id}`,
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
        <button type='submit'>Update</button>
      </form>
    </section>
  );
};

export default UpdateNotes;
