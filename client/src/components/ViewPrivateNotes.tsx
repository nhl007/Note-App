import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../assets/constants';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import { NoteListView } from '.';

const ViewPrivateNotes = () => {
  const [notes, setNotes] = useState<NoteMetaData[]>([]);

  const { displayAlert, setIsLoading } = useFeatureContext();

  const axiosConfig = {
    withCredentials: true,
  };

  const loadNotes = async () => {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteNotes = async (id: string) => {
    setIsLoading(true);
    await axios
      .delete(`${baseUrl}/notes/${id}`, axiosConfig)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        displayAlert('Note deleted successfully!', true);
      })
      .catch(() => {
        displayAlert('Error Occurred! Try again', true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteListView notes={notes} isPrivate={true} deleteNotes={deleteNotes} />
  );
};

export default ViewPrivateNotes;
