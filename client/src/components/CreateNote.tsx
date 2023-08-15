// import axios from 'axios';
import { useState } from 'react';
// import { baseUrl } from '../assets/constants';
import TextEditor from './TextEditor';

const CreateNote = () => {
  document.title = 'Create Note';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // const axiosConfig = {
  //   withCredentials: true,
  // };

  // const onSubmit = async () => {
  //   await axios
  //   .post(
  //     `${baseUrl}/notes`,
  //     {
  //         title: title,
  //         content: content,
  //       },
  //       axiosConfig
  //     )
  //     .then((response) => {
  //       return response.data.notes;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   };

  return (
    <section className='flex w-full flex-col justify-start items-start gap-6'>
      <h1 className=' mt-6 text-teal-400 font-semibold'>Create A New Note</h1>
      <label htmlFor='title' className=' text-xl text-white'>
        Title :
      </label>
      <input
        className='border-[2px] min-w-[350px] border-teal-400 bg-transparent text-white rounded-[10px] p-[10px]'
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextEditor setContent={setContent} />
      <button onClick={() => console.log(content)}>test</button>
    </section>
  );
};

export default CreateNote;
