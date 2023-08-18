import { useFeatureContext } from '../context/Feature/FeatureContext';

function Alert() {
  const {
    state: { alertSuccess, alertText },
  } = useFeatureContext();
  return (
    <div
      className={` ${
        alertSuccess ? 'bg-green-500 text-black' : 'bg-red-500'
      } fixed bottom-6 right-6 py-2 px-4 flex justify-center items-center z-[999]`}
    >
      <h2 className='text-xl'>{alertText}</h2>
    </div>
  );
}

export default Alert;
