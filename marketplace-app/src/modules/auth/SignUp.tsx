import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { useRegisterUser, validateEmail, validatePassword } from '.';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  const fmtMsg = useFmtMsg();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const registerMutation = useRegisterUser();

  const submit = () => {
    const nameTrimmed = name.trim();

    if (!nameTrimmed) {
      setNameError(fmtMsg('fieldRequired'));
    }

    if (!email) {
      setEmailError(fmtMsg('fieldRequired'));
    }

    if (!password) {
      setPasswordError(fmtMsg('fieldRequired'));
    }

    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(fmtMsg('wrongEmailFormat'));
      return;
    }

    if (nameError || passwordError || emailError) {
      return;
    }

    if (nameTrimmed && password && email) {
      registerMutation.mutate(
        {
          username: nameTrimmed,
          email: email,
          password: password,
        },
        {
          onSuccess: () => {
            //navigate('/login');
          },
        }
      );
    }
  };

  return (
    <div className='max-w-md m-auto flex flex-col'>
      <h2 className=' text-4xl font-bold mb-3 '>{fmtMsg('hello!')}</h2>
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
        email={email}
        emailError={emailError}
        onEmailChange={(val) => {
          setEmailError('');
          setEmail(val);
        }}
        password={password}
        passwordError={passwordError}
        onPasswordChange={(val) => {
          setPasswordError('');
          setPassword(val);
        }}
      />
      <Button
        isLoading={registerMutation.isPending}
        onClick={submit}
        className='mt-8 h-[59px] max-h-max'
      >
        {fmtMsg('signUp')}
      </Button>
    </div>
  );
};
