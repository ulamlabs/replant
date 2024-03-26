import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  const fmtMsg = useFmtMsg();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  return (
    <div className='max-w-[400px] m-auto flex flex-col'>
      <h2 className=' text-4xl font-bold mb-3 '>Hello!</h2>
      <p className='text-neutral-400 text-lg font-normal mb-8'>
        {fmtMsg('signInAndExploreTheReplantWorldsMarketplace')}
      </p>
      <SignUpForm
        onNameChange={(val) => {
          setNameError('');
          setName(val);
        }}
        name={name}
        nameError={nameError}
      />
    </div>
  );
};
