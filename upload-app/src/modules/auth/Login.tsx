import poptechImg from 'assets/poptech.png';
import { Alert, Button, Input, Section } from 'common/components';
import { PadlockIcon, UserIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { LoginError, useLoginMutation } from './api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { prettifyError } from 'common/utils';

export const Login: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginMutation = useLoginMutation();

  const logIn = async () => {
    const loginTrimmed = login.trim();
    const passwordTrimmed = password.trim();

    let loginError = '';
    let passwordError = '';

    if (!login.trim()) {
      loginError = fmtMsg('fieldRequired');
    }

    if (!password.trim()) {
      passwordError = fmtMsg('fieldRequired');
    }

    setLoginError(loginError);
    setPasswordError(passwordError);

    if (loginError || passwordError) {
      return;
    }

    await loginMutation.mutateAsync({
      password: passwordTrimmed,
      username: loginTrimmed,
    });
    navigate('/');
  };

  const getErrorText = (error: AxiosError<LoginError>) => {
    if (
      error.response?.data.non_field_errors?.includes(
        'Incorrect username or password.'
      )
    ) {
      return fmtMsg('incorrectLoginOrPassword');
    }
    return prettifyError(error);
  };

  return (
    <Section
      actions={
        <Button
          isLoading={loginMutation.isPending}
          size={'big'}
          text={fmtMsg('logIn')}
          onClick={logIn}
        />
      }
    >
      <form className='flex flex-col gap-5 h-full items-center justify-end'>
        <img src={poptechImg} className='h-8' />
        {loginMutation.isError && (
          <Alert severity='error' text={getErrorText(loginMutation.error)} />
        )}
        <Input
          label={fmtMsg('login')}
          placeholder={fmtMsg('login')}
          icon={
            <UserIcon pathClassName='fill-gray-500' svgClassName='w-4 h-4' />
          }
          value={login}
          onChange={(value) => {
            setLoginError('');
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
            setPasswordError('');
            setPassword(value);
          }}
        />
      </form>
    </Section>
  );
};
