import { Input, Switch } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { FC, useState } from 'react';

type Props = {
  name: string;
  nameError: string;
  onNameChange: (val: string) => void;
};

export const SignUpForm: FC<Props> = ({ name, onNameChange, nameError }) => {
  const fmtMsg = useFmtMsg();

  const switchValues = [fmtMsg('company'), fmtMsg('individual')];
  const [switchValue, setSwitchValue] = useState(switchValues[0]);

  const changeSwitchValue = () => {
    if (switchValue === switchValues[0]) {
      setSwitchValue(switchValues[1]);
      return;
    }
    setSwitchValue(switchValues[0]);
  };

  return (
    <form className="className='flex flex-col gap-5 pb-2'">
      <Switch
        values={switchValues}
        onClick={changeSwitchValue}
        inputValue={switchValue}
      />
      <Input
        label={fmtMsg('name')}
        placeholder={fmtMsg('name')}
        onChange={onNameChange}
        value={name}
        error={nameError}
        type='text'
      />
    </form>
  );
};
