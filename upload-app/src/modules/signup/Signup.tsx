import {
  Button,
  Header,
  Input,
  Section,
  Autocomplete,
} from 'common/components';
import { Alert } from 'common/components/Alert';
import { LocationIcon, PadlockeIcon, PhoneIcon, UserIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { useCountriesQuery } from './api';

const validatePassword = (password: string) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export const Signup: React.FC = () => {
  const fmtMsg = useFmtMsg();
  const [login, setLogin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');

  const [loginError, setLoginError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const countries = useCountriesQuery();

  const submit = () => {
    const loginTrimmed = login.trim();
    const phoneNumberTrimmed = phoneNumber.trim();
    const countryTrimmed = country.trim();

    if (!loginTrimmed) {
      setLoginError(fmtMsg('fieldRequired'));
    }

    if (!phoneNumberTrimmed) {
      setPhoneNumberError(fmtMsg('fieldRequired'));
    }

    if (!countryTrimmed) {
      setCountryError(fmtMsg('fieldRequired'));
    }

    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(fmtMsg('passwordsAreNotTheSame'));
      return;
    }
  };

  return (
    <Section
      actions={<Button text={'Sign up'} size={'BIG'} onClick={submit} />}
    >
      <div className='flex flex-col gap-5'>
        {/* <Alert text={'halo cos sie stalo elo halo'} severity={'error'} /> */}
        <Header text={'Sign up'} />
        <Input
          label={fmtMsg('login')}
          placeholder={fmtMsg('login')}
          icon={
            <UserIcon pathClassName='fill-gray-500' svgClassName='w-4 h-4' />
          }
          value={login}
          onChange={(val) => {
            setLoginError('');
            setLogin(val);
          }}
          error={loginError}
        />
        <Input
          label={fmtMsg('phoneNumber')}
          placeholder={fmtMsg('phoneNumber')}
          icon={<PhoneIcon />}
          value={phoneNumber}
          onChange={(val) => {
            setPhoneNumberError('');
            setPhoneNumber(val);
          }}
          type='tel'
          error={phoneNumberError}
        />
        <Autocomplete
          label={fmtMsg('countries')}
          placeholder={fmtMsg('countries')}
          icon={<LocationIcon />}
          value={country}
          options={[
            'Firefox',
            'Google Chrome',
            'Microsoft Edge',
            'Safari',
            'Opera',
          ]}
          onChange={(val) => {
            setCountryError('');
            setCountry(val);
          }}
          error={countryError}
        />
        <Input
          label={fmtMsg('password')}
          placeholder={fmtMsg('password')}
          icon={<PadlockeIcon />}
          value={password}
          type='password'
          error={passwordError}
          onChange={(val) => {
            setPasswordError('');
            setPassword(val);
          }}
        />
        <Input
          label={fmtMsg('confirmPassword')}
          placeholder={fmtMsg('confirmPassword')}
          icon={<PadlockeIcon />}
          value={confirmPassword}
          type='password'
          error={confirmPasswordError}
          onChange={(val) => {
            setConfirmPasswordError('');
            setConfirmPassword(val);
          }}
        />
      </div>
    </Section>
  );
};
