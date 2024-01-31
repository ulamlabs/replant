import poptechImg from 'assets/poptech.png';
import { Button, Input, Section } from 'common/components';
import { PadlockIcon, UserIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';

export const Login: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  return (
    <Section
      actions={
        <Button text={fmtMsg('logIn')} size={'big'} onClick={() => {}} />
      }
    >
      <form className='flex flex-col gap-5 h-full items-center justify-end'>
        <img src={poptechImg} className='h-8' />
        <Input
          label={fmtMsg('login')}
          placeholder={fmtMsg('login')}
          icon={
            <UserIcon pathClassName='fill-gray-500' svgClassName='w-4 h-4' />
          }
          value={login}
          onChange={(value) => {
            setLogin(value);
          }}
          error={loginError}
        />
        <Input
          label={fmtMsg('password')}
          placeholder={fmtMsg('password')}
          icon={<PadlockIcon />}
          value={password}
          type='password'
          error={passwordError}
          onChange={(value) => {
            setPassword(value);
          }}
        />
      </form>
    </Section>
  );
};
