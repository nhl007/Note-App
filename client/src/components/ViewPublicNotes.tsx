import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../assets/constants';
import { useFeatureContext } from '../context/Feature/FeatureContext';
// import { Link } from 'react-router-dom';
import { NoteListView } from '.';

const ViewPublicNotes = () => {
  const [notes, setNotes] = useState<NoteMetaData[]>([]);

  const { displayAlert, setIsLoading } = useFeatureContext();

  const axiosConfig = {
    withCredentials: true,
  };

  const loadNotes = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/notes/all`, axiosConfig)
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
  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteListView
      isPrivate={false}
      notes={notes}
      deleteNotes={async (name) => {
        console.log(name);
      }}
    />
  );
};

export default ViewPublicNotes;
