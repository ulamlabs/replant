import { Input, Switch } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { FC } from 'react';
import { useAuthStore } from '.';

type Props = {
  switchLabels: [string, string];
};

export const SignUpForm: FC<Props> = ({ switchLabels }) => {
  const fmtMsg = useFmtMsg();

  const store = useAuthStore();

  return (
    <form className='flex flex-col gap-3 md:gap-5 pb-2'>
      <Switch
        values={switchLabels}
        onClick={store.toggleSwitchValue}
        inputValue={store.switchValue}
      />
      <Input
        label={fmtMsg('name')}
        placeholder={fmtMsg('name')}
        onChange={(val) => {
          store.setName(val);
          store.setNameError('');
        }}
        value={store.name}
        error={store.nameError}
        type='text'
      />
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
    </form>
  );
};
