import { Input } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';
import { useAuthStore } from '.';

export const LogInForm = () => {
  const fmtMsg = useFmtMsg();

  const store = useAuthStore();

  return (
    <form className='flex flex-col gap-3 md:gap-5 pb-2'>
      <Input
        label={fmtMsg('email')}
        placeholder={fmtMsg('email')}
        onChange={(val) => {
          store.setEmail(val);
          store.setEmailError('');
        }}
        value={store.email}
        error={store.emailError}
        type='email'
      />
      <Input
        label={fmtMsg('password')}
        placeholder={fmtMsg('password')}
        onChange={(val) => {
          store.setPassword(val);
          store.setPasswordError('');
        }}
        value={store.password}
        error={store.passwordError}
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
