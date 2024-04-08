import { Input, Switch } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { FC, useEffect } from 'react';
import { useAuthStore } from '.';

type Props = {
  switchValues: [string, string];
};

export const SignUpForm: FC<Props> = ({ switchValues }) => {
  const fmtMsg = useFmtMsg();

  const {
    name,
    setName,
    setNameError,
    email,
    setEmail,
    setEmailError,
    password,
    setPassword,
    setPasswordError,
    nameError,
    emailError,
    passwordError,
    switchValue,
    setSwitchValue,
  } = useAuthStore();

  useEffect(() => {
    setSwitchValue(switchValues[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeSwitchValue = () => {
    if (switchValue === switchValues[0]) {
      setSwitchValue(switchValues[1]);
      return;
    }
    setSwitchValue(switchValues[0]);
  };

  return (
    <form className='flex flex-col gap-3 md:gap-5 pb-2'>
      <Switch
        values={switchValues}
        onClick={changeSwitchValue}
        inputValue={switchValue}
      />
      <Input
        label={fmtMsg('name')}
        placeholder={fmtMsg('name')}
        onChange={(val) => {
          setName(val);
          setNameError('');
        }}
        value={name}
        error={nameError}
        type='text'
      />
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
    </form>
  );
};
