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

interface elementWithSize extends HTMLElement {
  size: string;
}

type tagButtons = {
  b: boolean;
  i: boolean;
  u: boolean;
  ol: boolean;
  ul: boolean;
};

function TextEditor({ setContent }: Props) {
  const textArea = useRef<HTMLDivElement>(null!);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<(string | ArrayBuffer | null)[]>([]);

  const [tagButtons, setTagButtons] = useState<tagButtons>({
    b: false,
    i: false,
    u: false,
    ol: false,
    ul: false,
  });

  const [fontSize, setFontSize] = useState({
    s: true,
    m: false,
    l: false,
  });

  const [textAlign, setTextAlign] = useState({
    l: true,
    c: false,
    r: false,
  });

  const [color, setColor] = useState('#ffffff');
  const [hiliteColor, setHiliteColor] = useState('#1a1a1a');
  const [IsPre, setIsPre] = useState(false);

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

  const closest = (
    element: Node | null,
    selector: string
  ): { hasParent: boolean; element: HTMLElement | null } => {
    if (!element) return { hasParent: false, element: null };

    if (element instanceof Element && element.matches(selector)) {
      return { hasParent: true, element: element as HTMLElement };
    }

    return closest(element.parentNode, selector);
  };

  const checkFormatting = () => {
    const range = window.getSelection()?.getRangeAt(0);

    if (range) {
      const startContainer = range.startContainer;
      ['b', 'i', 'u', 'ol', 'ul', 'font', 'div', 'pre'].forEach((tag) => {
        setTagButtons((prev) => ({ ...prev, [tag]: hasParent }));

        const { hasParent, element } = closest(startContainer, tag);
        // console.log(hasParent, tag);
        if (tag === 'font' && element) {
          const size = (element as elementWithSize).size;
          size === '5'
            ? setFontSize(() => ({
                m: true,
                s: false,
                l: false,
              }))
            : size === '7'
            ? setFontSize(() => ({
                l: true,
                m: false,
                s: false,
              }))
            : setFontSize(() => ({
                s: true,
                m: false,
                l: false,
              }));
        }

        if (!hasParent && tag === 'font') {
          setFontSize((prev) => ({
            ...prev,
            s: true,
            m: false,
            l: false,
          }));
        }

        if (tag === 'div' && element) {
          const align = element.style.textAlign;

          align === 'right'
            ? setTextAlign(() => ({
                l: false,
                c: false,
                r: true,
              }))
            : align === 'center'
            ? setTextAlign(() => ({
                l: false,
                c: true,
                r: false,
              }))
            : setTextAlign(() => ({
                l: true,
                c: false,
                r: false,
              }));
        }

        if (!hasParent && tag === 'div') {
          setTextAlign(() => ({
            l: true,
            c: false,
            r: false,
          }));
        }

        if (tag === 'pre' && element) {
          setIsPre(true);
        }

        if (!hasParent && tag === 'pre') {
          setIsPre(false);
        }
      });
    } else {
      console.log('No range selected.');
    }
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <label htmlFor='title' className=' text-xl text-white'>
        Content :
      </label>
      <div className='flex gap-2 justify-center items-center'>
        <button
          className={`${tagButtons.b && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('bold')}
        >
          <AiOutlineBold />
        </button>
        <button
          className={`${tagButtons.u && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('underline')}
        >
          <AiOutlineUnderline />
        </button>
        <button
          className={`${tagButtons.i && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('italic')}
        >
          <AiOutlineItalic />
        </button>
        <button
          className={`${fontSize.s && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('fontSize', '3')}
        >
          <TbCircleLetterS />
        </button>
        <button
          className={`${fontSize.m && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('fontSize', '5')}
        >
          <TbCircleLetterM />
        </button>
        <button
          className={`${fontSize.l && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('fontSize', '7')}
        >
          <TbCircleLetterL />
        </button>
        <button
          className={`${textAlign.l && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('justifyLeft')}
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          className={`${textAlign.c && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('justifyCenter')}
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          className={`${textAlign.r && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('justifyRight')}
        >
          <AiOutlineAlignRight />
        </button>
        <button onClick={() => setStyles('undo')}>
          <AiOutlineUndo />
        </button>
        <button onClick={() => setStyles('redo')}>
          <AiOutlineRedo />
        </button>

        <button
          className={`${tagButtons.ol && 'border-teal-400 hover:border-white'}`}
          onClick={() => setStyles('insertOrderedList')}
        >
          <AiOutlineOrderedList />
        </button>
        <button
          title='Unordered-List'
          className={`${tagButtons.ul && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, ol: false, ul: true }));
            setStyles('insertUnorderedList');
          }}
        >
          <AiOutlineUnorderedList />
        </button>
        <button
          title='Pre-Formatted Text'
          className={`${IsPre && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setIsPre(true);
            setStyles('formatBlock', 'pre');
          }}
        >
          <BsCode />
        </button>
        <input
          title='Text Color'
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setStyles('foreColor', `${e.target.value}`);
          }}
          type='color'
          name='color'
        />
        <input
          title='Highlight Color'
          onChange={(e) => {
            setHiliteColor(e.target.value);
            setStyles('hiliteColor', `${e.target.value}`);
          }}
          type='color'
          value={hiliteColor}
          name='backColor'
        />
        <input
          title='Upload Image'
          className=' bg-black text-teal-400 rounded-[8px] max-w-[123px]'
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          onChange={insertImage}
          onClick={(e) => {
            const element = e.target as HTMLInputElement;
            element.value = '';
          }}
        />
      </div>
      <div
        className='text__editor min-w-full min-h-[300px] border-[2px] border-teal-400 p-[10px] whitespace-pre-wrap'
        contentEditable='true'
        ref={textArea}
        onClick={checkFormatting}
        onInput={setTheContent}
      />
    </div>
  );
}

export default TextEditor;
