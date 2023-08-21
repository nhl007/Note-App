import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Alert, Loading } from '../components';
import { useAuthContext } from '../context/Auth/AuthContext';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import React, { useState } from 'react';
import { baseUrl } from '../assets/constants';
import axios from 'axios';

// type imageObj = {
//   assetId: string;
//   url: string;
// };

const Profile = () => {
  const {
    state: { user },
    update,
  } = useAuthContext();

  document.title = user?.name ?? 'Profile';

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.description);

  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const {
    setIsLoading,
    state: { isLoading },
  } = useFeatureContext();

  const {
    state: { showAlert },
  } = useFeatureContext();

  const axiosConfig = {
    withCredentials: true,
  };
  const uploadImageToCloud = async (file: string) => {
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

      return imageData;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const insertImageAndUpdate = async () => {
    const imageData = await uploadImageToCloud(previewImage as string);
    const data = {
      name: name as string,
      email: email as string,
      description: description,
      image: imageData,
    };
    await update(data);
  };

  const setPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = async () => {
        setPreviewImage(() => fileReader.result);
      };
    }
  };

  const updateInfo = async () => {
    if (previewImage) {
      await insertImageAndUpdate();
    } else {
      const data = {
        name: name as string,
        email: email as string,
        description: description,
      };
      await update(data);
    }
  };

  return (
    <section className='flex flex-col justify-center items-center gap-4'>
      {showAlert && <Alert />}
      {isLoading && <Loading />}

      {user?.image?.url || previewImage ? (
        <img
          className='mt-4 self-center w-[150px] h-[150px] rounded-full flex justify-center items-center bg-teal-400 text-[48px] object-cover'
          src={(previewImage as string) ?? user?.image?.url}
        />
      ) : (
        <span className=''>{user?.name.charAt(0).toUpperCase()}</span>
      )}

      <input type='file' onChange={setPreview} />

      <div className='w-full flex flex-col justify-end gap-2 '>
        <div className=' flex flex-col gap-1 max-w-xs'>
          <label htmlFor='name'>Name : </label>
          <input
            id='name'
            value={name}
            className='border-teal-400 border-2
             text-teal-400 bg-transparent my-1 text-xl px-2 rounded-lg py-2'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className=' flex gap-1 flex-col max-w-xs'>
          <label htmlFor='email'>Email : </label>
          <input
            type='email'
            id='email'
            value={email}
            className='border-teal-400 border-2
             text-teal-400 bg-transparent my-1 text-xl px-2 rounded-lg py-2'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=' flex flex-col gap-1'>
          <label htmlFor='des'>Description : </label>
          <textarea
            value={description}
            id='des'
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Update your description!'
            className='border-teal-400 border-2
             text-teal-400 bg-transparent my-1 text-xl px-2 w-[80%] rounded-lg py-2'
          />
        </div>

        <button
          onClick={updateInfo}
          className=' flex gap-2 justify-center items-center max-w-[150px] border-teal-400 border-[1px] hover:border-red-300'
          type='submit'
        >
          Update
          <AiOutlineCheckCircle color='green' width={30} />
        </button>
      </div>
    </section>
  );
};

export default Profile;
