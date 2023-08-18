import { Link } from 'react-router-dom';

import { FiDelete } from 'react-icons/fi';
import { FcCalendar } from 'react-icons/fc';
import { AiFillEdit } from 'react-icons/ai';
import { MdPublic } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';

type Props = {
  notes: NoteMetaData[];
  isPrivate: boolean;
  deleteNotes: (id: string) => Promise<void>;
};

function NoteListView({ notes, isPrivate, deleteNotes }: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {notes.length ? (
        notes.map((note) => (
          <div
            className=' w-full  border-teal-400 border-[1px] text-white px-6 py-3 rounded-lg relative'
            key={note._id}
          >
            <div className=' flex items-center gap-6 py-2'>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center bg-teal-400 text-black rounded-[28px] w-14 h-14 text-xl'>
                  {note.userId.image?.url ? (
                    <img
                      className='rounded-[28px] w-14 h-14 object-cover'
                      src={note.userId.image.url}
                      alt='img'
                      width={48}
                      height={48}
                    />
                  ) : (
                    note.userId.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className=' flex flex-col justify-center'>
                  <span className=' flex gap-1 items-center'>
                    {note.userId.name}
                    {note.privacy === 'private' ? (
                      <BsFillPersonFill title='private' />
                    ) : (
                      <MdPublic title='public' />
                    )}
                  </span>

                  <span
                    title='Creation Date'
                    className='flex items-center gap-1 text-sm'
                  >
                    <FcCalendar />
                    {note.createdAt.toString().slice(0, 10)}
                  </span>
                </div>
              </div>
            </div>
            <span>{note.title}</span>
            {isPrivate && (
              <div className=' flex absolute right-4 top-2'>
                <Link
                  title='Edit'
                  to={'/update/' + note._id}
                  className=' text-white py-0 px-2 bg-transparent'
                >
                  <AiFillEdit className='text-yellow-600 w-6 h-6' />
                </Link>

                <button
                  title='Delete'
                  onClick={() => deleteNotes(note._id)}
                  className='text-white py-0 px-2 bg-transparent'
                >
                  <FiDelete className='text-red-600 w-6 h-6' />
                </button>
              </div>
            )}
            <div className=' h-[1px] mt-3 bg-teal-400/20' />
            <div
              className='py-3 mb-2'
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          </div>
        ))
      ) : (
        <p>No notes found !</p>
      )}
    </div>
  );
}

export default NoteListView;
