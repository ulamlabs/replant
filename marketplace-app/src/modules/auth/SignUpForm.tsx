import { Input, Switch } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { FC } from 'react';

type Props = {
  name: string;
  nameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  switchValues: [string, string];
  switchValue: string;
  changeSwitchValue: () => void;
};

export const SignUpForm: FC<Props> = ({
  name,
  onNameChange,
  nameError,
  email,
  emailError,
  onEmailChange,
  password,
  passwordError,
  onPasswordChange,
  switchValues,
  switchValue,
  changeSwitchValue,
}) => {
  const fmtMsg = useFmtMsg();

  const clientTypeName =
    switchValue === switchValues[0] ? fmtMsg('companyName') : fmtMsg('name');

  return (
    <form className='flex flex-col gap-5 pb-2'>
      <Switch
        values={switchValues}
        onClick={changeSwitchValue}
        inputValue={switchValue}
      />
      <Input
        label={clientTypeName}
        placeholder={clientTypeName}
        onChange={onNameChange}
        value={name}
        error={nameError}
        type='text'
      />
      <Input
        label={fmtMsg('email')}
        placeholder={fmtMsg('email')}
        onChange={onEmailChange}
        value={email}
        error={emailError}
        type='email'
      />
      <Input
        label={fmtMsg('password')}
        placeholder={fmtMsg('password')}
        onChange={onPasswordChange}
        value={password}
        error={passwordError}
        type='password'
      />
    </form>
  );
};