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
import axios from 'axios';
import { baseUrl } from '../assets/constants';
import { rgbToHex } from '../utils/rgbToHex';
import { useFeatureContext } from '../context/Feature/FeatureContext';

type Props = {
  html?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  files: noteImages;
  setFiles: React.Dispatch<React.SetStateAction<noteImages>>;
};

interface elementWithSize extends HTMLElement {
  size: string;
}
interface elementWithColor extends HTMLElement {
  color: string;
}

type tagButtons = {
  b: boolean;
  i: boolean;
  u: boolean;
  ol: boolean;
  ul: boolean;
};

function TextEditor({ html, setContent, setFiles, files }: Props) {
  const {
    setIsLoading,
    displayAlert,
    state: { isLoading },
  } = useFeatureContext();

  const textArea = useRef<HTMLDivElement>(null!);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
    checkFormatting();
  };

  const axiosConfig = {
    withCredentials: true,
  };

  const uploadToCloud = async (file: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/notes/image`,
        {
          data: file,
        },
        axiosConfig
      );
      const imageData = response.data.data;
      // console.log(response.data.data);
      return imageData;
    } catch (error) {
      displayAlert('Server Error! Try Again', false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const insertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0];
    const fileReader = new FileReader();
    if (fileData) {
      fileReader.readAsDataURL(fileData);
      fileReader.onloadend = async () => {
        const imageData = await uploadToCloud(fileReader.result as string);
        setFiles([...files, imageData]);
        setStyles('insertImage', imageData.url);
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
      // console.log(range.startContainer.parentNode);

      ['b', 'i', 'u', 'ol', 'ul', 'font', 'div', 'pre', 'img', 'span'].forEach(
        (tag) => {
          setTagButtons((prev) => ({ ...prev, [tag]: hasParent }));

          const { hasParent, element } = closest(startContainer, tag);
          // console.log(hasParent, tag);

          if (tag === 'font' && element) {
            const color = (element as elementWithColor).color;
            if (color) {
              setColor(() => color);
            } else {
              setColor(() => '#ffffff');
            }
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
            setColor(() => '#ffffff');

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

          if (tag === 'span' && hasParent) {
            const color = element?.style.backgroundColor as string;
            const hex = rgbToHex(color);
            setHiliteColor(() => hex);
          } else {
            setHiliteColor('#1c1c1c');
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
        }
      );
    } else {
      console.log('No range selected.');
    }
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      {isLoading && (
        <div className=' flex justify-center items-center absolute inset-0 w-screen h-screen bg-transparent'>
          <img src='/loader.svg' width={60} height={60} alt='loader' />
        </div>
      )}
      <div className='flex gap-2 justify-center items-center flex-wrap'>
        <button
          title='Bold'
          className={`${tagButtons.b && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, b: true }));
            setStyles('bold');
          }}
        >
          <AiOutlineBold />
        </button>
        <button
          title='Underline'
          className={`${tagButtons.u && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, u: true }));
            setStyles('underline');
          }}
        >
          <AiOutlineUnderline />
        </button>
        <button
          title='Italic'
          className={`${tagButtons.i && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, i: true }));
            setStyles('italic');
          }}
        >
          <AiOutlineItalic />
        </button>
        <button
          title='Font-Small'
          className={`${fontSize.s && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setFontSize(() => ({ l: false, m: false, s: true }));
            setStyles('fontSize', '3');
          }}
        >
          <TbCircleLetterS />
        </button>
        <button
          title='Font-Medium'
          className={`${fontSize.m && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setFontSize(() => ({ l: false, m: true, s: false }));
            setStyles('fontSize', '5');
          }}
        >
          <TbCircleLetterM />
        </button>
        <button
          title='Font-Large'
          className={`${fontSize.l && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setFontSize(() => ({ l: true, m: false, s: false }));
            setStyles('fontSize', '7');
          }}
        >
          <TbCircleLetterL />
        </button>
        <button
          title='Align-Left'
          className={`${textAlign.l && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTextAlign(() => ({ r: false, c: false, l: true }));
            setStyles('justifyLeft');
          }}
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          title='Align-Center'
          className={`${textAlign.c && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTextAlign(() => ({ r: false, c: true, l: false }));
            setStyles('justifyCenter');
          }}
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          title='Align-Right'
          className={`${textAlign.r && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTextAlign(() => ({ r: true, c: false, l: false }));
            setStyles('justifyRight');
          }}
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
          title='Ordered-List'
          className={`${tagButtons.ol && 'border-teal-400 hover:border-white'}`}
          onClick={() => {
            setTagButtons((prev) => ({ ...prev, ol: true, ul: false }));
            setStyles('insertOrderedList');
          }}
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
          className=' bg-black text-teal-400 rounded-[8px] max-w-[88px] sm:max-w-[123px]'
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
        className='text__editor min-w-full min-h-[300px] border-[1px] border-teal-400 p-[10px] whitespace-pre-wrap rounded-md sm:rounded-[10px]'
        contentEditable='true'
        ref={textArea}
        onClick={checkFormatting}
        onInput={setTheContent}
        dangerouslySetInnerHTML={{
          __html: html ?? '<p>Edit your content here!</p>',
        }}
      />
    </div>
  );
}

export default TextEditor;
