import { useRef, useState } from 'react';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineUndo,
  AiOutlineRedo,
  // AiOutlineFileImage,
  AiOutlineUnderline,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import {
  TbCircleLetterL,
  TbCircleLetterS,
  TbCircleLetterM,
} from 'react-icons/tb';

import { BsCode } from 'react-icons/bs';

type Props = {
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

function TextEditor({ setContent }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<(string | ArrayBuffer | null)[]>([]);
  const textArea = useRef<HTMLDivElement>(null!);

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const setStyles = (command: string, value?: string) => {
    applyFormatting(command, value);
    textArea.current.focus();
  };

  const setTheContent = () => {
    const html = textArea.current.innerHTML!;
    setContent(html);
  };

  const insertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0];
    const fileReader = new FileReader();
    if (fileData) {
      fileReader.readAsDataURL(fileData);
      fileReader.onloadend = () => {
        setFiles([...files, fileReader.result]);
        setStyles('insertImage', fileReader.result as string);
      };
    }
  };

  // const checkFormatting = () => {
  //   const range = window.getSelection()?.getRangeAt(0);

  //   console.log(range);

  //   const node = range?.startContainer;

  //   if (node?.parentElement?.localName === 'b') {
  //     console.log('Cursor is in a bold section.');
  //   } else {
  //     console.log('Cursor is not in a bold section.');
  //   }
  // };

  return (
    <div className='w-full flex flex-col gap-4'>
      <label htmlFor='title' className=' text-xl text-white'>
        Content :
      </label>
      <div className='flex gap-2 justify-center items-center'>
        <button onClick={() => setStyles('bold')}>
          <AiOutlineBold />
        </button>
        <button onClick={() => setStyles('underline')}>
          <AiOutlineUnderline />
        </button>
        <button onClick={() => setStyles('italic')}>
          <AiOutlineItalic />
        </button>
        <button onClick={() => setStyles('fontSize', '3')}>
          <TbCircleLetterS />
        </button>
        <button onClick={() => setStyles('fontSize', '5')}>
          <TbCircleLetterM />
        </button>
        <button onClick={() => setStyles('fontSize', '7')}>
          <TbCircleLetterL />
        </button>
        <button onClick={() => setStyles('justifyLeft')}>
          <AiOutlineAlignLeft />
        </button>
        <button onClick={() => setStyles('justifyCenter')}>
          <AiOutlineAlignCenter />
        </button>
        <button onClick={() => setStyles('justifyRight')}>
          <AiOutlineAlignRight />
        </button>
        <button onClick={() => setStyles('undo')}>
          <AiOutlineUndo />
        </button>
        <button onClick={() => setStyles('redo')}>
          <AiOutlineRedo />
        </button>

        <input
          className=' bg-black text-teal-400 rounded-[8px] max-w-[123px]'
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          onChange={insertImage}
          onClick={(e) => {
            const element = e.target as HTMLInputElement;
            element.value = '';
          }}
        />

        <button onClick={() => setStyles('insertOrderedList')}>
          <AiOutlineOrderedList />
        </button>
        <button onClick={() => setStyles('insertUnorderedList')}>
          <AiOutlineUnorderedList />
        </button>
        <button onClick={() => setStyles('formatBlock', 'pre')}>
          <BsCode />
        </button>
        <input
          onChange={(e) => setStyles('foreColor', `${e.target.value}`)}
          type='color'
          name='color'
        />
      </div>
      <div
        className='text__editor min-w-full min-h-[300px] border-[2px] border-teal-400 p-[10px] whitespace-pre-wrap'
        contentEditable='true'
        ref={textArea}
        // onClick={checkFormatting}
        onInput={setTheContent}
      />
    </div>
  );
}

export default TextEditor;
