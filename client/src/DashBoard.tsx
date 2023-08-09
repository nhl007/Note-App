import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './assets/constants';

const DashBoard = () => {
  // const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    await axios
      .get(`${baseUrl}/notes`)
      .then((response) => console.log(response.data));
  };

  useEffect(() => {
    loadNotes();
    return () => {
      console.log(' return effect hello');
    };
  }, []);

  return (
    <section className='flex flex-col justify-start items-start gap-2 sm:gap-6'>
      <h1 className=' text-teal-400 font-semibold'>Your Notes</h1>
    </section>
  );
};

export default DashBoard;
