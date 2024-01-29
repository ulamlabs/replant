import { Button, Header, Input, LoaderBox, Section } from 'common/components';
import { Alert } from 'common/components/Alert';
import { LocationIcon, PadlockeIcon, PhoneIcon, UserIcon } from 'common/icons';
import { CountriesAutocomplete } from 'modules/countries';
import { Country, useCountries } from 'modules/countries/api';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import {
  RegisterError,
  phoneNumberIsNotValid,
  useRegisterMutation,
} from './api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import parsePhoneNumber from 'libphonenumber-js';
import { prettifyError } from 'common/utils';

const validatePassword = (password: string) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export const Signup: React.FC = () => {
  const fmtMsg = useFmtMsg();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState<Country>();

  const [loginError, setLoginError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { data: countries, isLoading: isCountriesLoading } = useCountries();
  const registerMutation = useRegisterMutation();

  const submit = () => {
    const loginTrimmed = login.trim();
    const parseNumber = parsePhoneNumber(phoneNumber);

    if (!loginTrimmed) {
      setLoginError(fmtMsg('fieldRequired'));
    }

    if (!phoneNumber) {
      setPhoneNumberError(fmtMsg('fieldRequired'));
    }

    if (!country) {
      setCountryError(fmtMsg('fieldRequired'));
    }

    if (!(parseNumber?.isPossible() && parseNumber.isValid())) {
      setPhoneNumberError(fmtMsg('phoneNumberIsNotValid'));
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(fmtMsg('passwordsAreNotTheSame'));
      return;
    }

    if (
      loginError ||
      passwordError ||
      confirmPasswordError ||
      phoneNumberError ||
      countryError
    ) {
      return;
    }

    if (country && phoneNumber && loginTrimmed && password) {
      registerMutation.mutate(
        {
          username: loginTrimmed,
          phone_number: phoneNumber,
          country: country?.id,
          password: password,
        },
        {
          onSuccess: () => {
            navigate('/login');
          },
        }
      );
    }
  };

  const getErrorText = (error: AxiosError<RegisterError>) => {
    if (phoneNumberIsNotValid(error.response?.data)) {
      return fmtMsg('phoneNumberIsNotValid');
    }

    return prettifyError(error);
  };

  if (isCountriesLoading || !countries) {
    return <LoaderBox />;
  }

  return (
    <Section
      actions={<Button text={'Sign up'} size={'BIG'} onClick={submit} />}
    >
      <div className='flex flex-col gap-5'>
        {registerMutation.isError && (
          <Alert
            text={getErrorText(registerMutation.error)}
            severity={'error'}
          />
        )}
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
        <CountriesAutocomplete
          label={fmtMsg('countries')}
          placeholder={fmtMsg('countries')}
          icon={<LocationIcon />}
          value={country}
          options={countries}
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
