import { Link } from 'react-router-dom';

type Props = {
  notes: NoteMetaData[];
  isPrivate: boolean;
  deleteNotes: (id: string) => Promise<void>;
};

function NoteListView({ notes, isPrivate, deleteNotes }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {notes.length ? (
        notes.map((note) => (
          <div className=' bg-teal-400 text-black px-4 py-2' key={note._id}>
            <div className='flex gap-4'>
              <p>{note.title}</p>
              {isPrivate && (
                <>
                  <Link
                    to={'/update/' + note._id}
                    className=' text-white py-0 px-2'
                  >
                    🖊
                  </Link>

                  <button
                    onClick={() => deleteNotes(note._id)}
                    className='text-white py-0 px-2'
                  >
                    ❌
                  </button>
                </>
              )}
            </div>
            <p>{note.createdAt.toString().slice(0, 10)}</p>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        ))
      ) : (
        <p>No notes found !</p>
      )}
    </div>
  );
}

export default NoteListView;
