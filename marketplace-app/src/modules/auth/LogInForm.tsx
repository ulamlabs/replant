import { Input } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';
import { useAuthStore } from '.';

export const LogInForm = () => {
  const fmtMsg = useFmtMsg();

  const {
    email,
    setEmail,
    setEmailError,
    password,
    setPassword,
    setPasswordError,
    emailError,
    passwordError,
  } = useAuthStore();

  return (
    <form className='flex flex-col gap-3 md:gap-5 pb-2'>
      <Input
        label={fmtMsg('email')}
        placeholder={fmtMsg('email')}
        onChange={(val) => {
          setEmail(val);
          setEmailError('');
        }}
        value={email}
        error={emailError}
        type='email'
      />
      <Input
        label={fmtMsg('password')}
        placeholder={fmtMsg('password')}
        onChange={(val) => {
          setPassword(val);
          setPasswordError('');
        }}
        value={password}
        error={passwordError}
        type='password'
      />
      <Link
        className='text-xs font-light text-neutral-400 w-full -mt-1 md:-mt-3 hover:opacity-80'
        to={'/forgot-password'}
      >
        {fmtMsg('resetPassword')}
      </Link>
    </form>
  );
};
