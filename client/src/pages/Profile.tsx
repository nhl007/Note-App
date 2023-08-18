import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Alert } from '../components';
import { useAuthContext } from '../context/Auth/AuthContext';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import React, { useState } from 'react';
import { baseUrl } from '../assets/constants';
import axios from 'axios';

type imageObj = {
  assetId: string;
  url: string;
};

const Profile = () => {
  const {
    state: { user },
    update,
  } = useAuthContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.description);
  // const [image, setImage] = useState<imageObj | null>(null);

  const [file, setFile] = useState<File | undefined>(undefined);

  const {
    state: { showAlert },
  } = useFeatureContext();

  const axiosConfig = {
    withCredentials: true,
  };
  const uploadImageToCloud = async (file: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/notes/image`,
        {
          data: file,
        },
        axiosConfig
      );
      const imageData = response.data.data;
      console.log(response.data.data);
      return imageData;
    } catch (error) {
      return null;
    }
  };

  const insertImage = async () => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = async () => {
        const imageData = await uploadImageToCloud(fileReader.result as string);
        const data = {
          name: name as string,
          email: email as string,
          description: description,
          image: imageData,
        };
        await update(data);
      };
    }
  };

  const updateInfo = async () => {
    await insertImage();
    // console.log(image);
    // if (file) {
    //   await insertImage();
    //   console.log(image)

    // const data = {
    //   name: name as string,
    //   email: email as string,
    //   description: description,
    //   image: image as imageObj,
    // };
    //   await update(data);
    // } else {
    //   const data = {
    //     name: name as string,
    //     email: email as string,
    //     description: description,
    //   };
    //   await update(data);
    // }
  };

  return (
    <section className='flex flex-col justify-center items-center gap-4'>
      {showAlert && <Alert />}

      {user?.image?.url ? (
        <img
          className='mt-4 self-center w-[150px] h-[150px] rounded-full flex justify-center items-center bg-teal-400 text-[48px] object-cover'
          src={user.image.url}
        />
      ) : (
        <span className=''>{user?.name.charAt(0).toUpperCase()}</span>
      )}

      <input
        type='file'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFile(e.target.files[0])
        }
      />

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
          className=' flex gap-2 justify-center items-center max-w-[150px]'
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
