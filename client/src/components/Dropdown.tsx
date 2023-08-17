import { useState } from 'react';

import { IoMdArrowDropdownCircle, IoMdCloseCircle } from 'react-icons/io';

type Props = {
  privacy: notePrivacy;
  setPrivacy: React.Dispatch<React.SetStateAction<notePrivacy>>;
};

function Dropdown({ privacy, setPrivacy }: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className='text-teal-400 focus:border-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2'
        type='button'
      >
        {privacy.toUpperCase()}
        {show ? <IoMdCloseCircle /> : <IoMdArrowDropdownCircle />}
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`z-10 ${
          !show ? 'hidden' : 'flex'
        } bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute right-0 bottom-[-110px]`}
      >
        <div
          className='py-2 px-4 text-md text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownDefaultButton'
        >
          <div
            onClick={() => {
              setPrivacy('private');
              setShow(false);
            }}
          >
            <span className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Private
            </span>
          </div>
          <div
            onClick={() => {
              setPrivacy('public');
              setShow(false);
            }}
          >
            <span className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Public
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
