import { FormEvent, useState } from 'react';
import { useFeatureContext } from '../context/Feature/FeatureContext';
import { Alert, Loading } from '.';
import { useAuthContext } from '../context/Auth/AuthContext';

const AuthModel = ({ type, setType }: AuthenticationProps) => {
  const {
    state: { showAlert, isLoading },
    displayAlert,
  } = useFeatureContext();

  const { register, login } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (type === 'register') {
      if (!name || !password || !email || !password_confirmation) {
        displayAlert('Please provide all the required fields', false);
      } else if (password !== password_confirmation) {
        displayAlert('Password does not match!', false);
      } else {
        await register(name, email, password);
      }
    } else {
      if (!password || !email) {
        displayAlert('Please provide all the required fields', false);
      } else {
        await login(email, password);
      }
    }
  };

  return (
    <>
      {showAlert && <Alert />}
      {isLoading && <Loading />}
      <div className=' flex justify-center items-center px-4'>
        <div className=' flex justify-center items-center flex-col '>
          <h1 className=' text-[28px] leading-[42px] text-teal-400 font-semibold'>
            {type === 'register'
              ? 'Create an account.'
              : 'Login to your account'}
          </h1>

          <div className=' mb-[24px]'></div>

          <form onSubmit={onSubmit} className=' flex flex-col gap-4 w-full'>
            {type === 'register' ? (
              <div className=' flex flex-col gap-[6px]'>
                <label htmlFor='name'>
                  Name <span className=' text-red-400'>*</span>
                </label>
                <input
                  autoComplete='true'
                  onChange={(e) => setName(e.target.value)}
                  name='name'
                  type='text'
                  maxLength={40}
                  className=' h-[48px] w-full px-4 py-[12px] border-[1px] border-teal-400 bg-transparent text-white rounded-[8px] focus:outline-none text-[16px] leading-[24px] '
                />
              </div>
            ) : (
              ''
            )}
            <div className=' flex flex-col gap-[6px]'>
              <label htmlFor='email'>
                Email <span className=' text-red-400'>*</span>
              </label>
              <input
                autoComplete='true'
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                type='text'
                maxLength={40}
                className=' h-[48px] px-4 py-[12px] border-[1px] border-teal-400 bg-transparent text-white rounded-[8px]  focus:outline-none text-[16px] leading-[24px] '
              />
            </div>
            <div className=' flex flex-col gap-[6px]'>
              <label htmlFor='password'>
                Password <span className=' text-red-400'>*</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='true'
                name='password'
                type='password'
                maxLength={40}
                className=' h-[48px] px-4 py-[12px] border-[1px] border-teal-400 bg-transparent text-white rounded-[8px] focus:outline-none text-[16px] leading-[24px] '
              />
            </div>
            {type === 'register' ? (
              <div className=' flex flex-col gap-[6px]'>
                <label htmlFor='password_confirmation'>
                  Password <span className=' text-red-400'>*</span>
                </label>
                <input
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  autoComplete='true'
                  name='password_confirmation'
                  type='password'
                  maxLength={40}
                  className=' h-[48px] px-4 py-[12px] border-[1px] border-teal-400 bg-transparent text-white rounded-[8px] focus:outline-none text-[16px] leading-[24px] '
                />
              </div>
            ) : (
              ''
            )}
            <button className=' flex justify-center items-center py-3 leading-6 mt-[16px]'>
              {type === 'register' ? 'Sign up' : 'Sign In'}
            </button>
            <p className='text-slate-400 leading-[24px] mb-9'>
              {type === 'register' ? (
                <span onClick={() => setType('login')}>
                  Already have an account?
                  <span className='text-blue-400 cursor-pointer'>
                    {' '}
                    Login here.
                  </span>
                </span>
              ) : (
                <span onClick={() => setType('register')}>
                  Create an account?
                  <span className=' text-blue-400 cursor-pointer'>
                    {' '}
                    SignUp here.
                  </span>
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default AuthModel;
