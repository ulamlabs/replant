import { Button, Header, LoaderBox, Section } from 'common/components';
import { Alert } from 'common/components/Alert';
import { Country, useCountries } from 'modules/countries/api';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import {
  RegisterError,
  enterValidUsername,
  passwordIsTooSimilarToUsername,
  phoneNumberIsNotValid,
  useRegisterMutation,
} from './api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { prettifyError } from 'common/utils';
import { SignupForm } from './SignupForm';
import { validatePassword, validatePhoneNumber } from './utils';

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
    const phoneNumberTrimmed = phoneNumber.trim();

    if (!loginTrimmed) {
      setLoginError(fmtMsg('fieldRequired'));
    }

    if (!phoneNumberTrimmed) {
      setPhoneNumberError(fmtMsg('fieldRequired'));
    }

    if (!country) {
      setCountryError(fmtMsg('fieldRequired'));
    }

    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError(fmtMsg('phoneNumberIsNotValid'));
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

    if (passwordIsTooSimilarToUsername(error.response?.data)) {
      return fmtMsg('passwordIsTooSimilarToUsername');
    }

    if (enterValidUsername(error.response?.data)) {
      return fmtMsg('enterValidUsername');
    }

    return prettifyError(error);
  };

  if (isCountriesLoading || !countries) {
    return <LoaderBox />;
  }

  return (
    <Section
      actions={<Button text={fmtMsg('signup')} size={'big'} onClick={submit} />}
    >
      <div className='flex flex-col gap-5 mb-5'>
        {registerMutation.isError && (
          <Alert
            text={getErrorText(registerMutation.error)}
            severity={'error'}
          />
        )}
        <Header text={fmtMsg('signup')} />
        <label className='text-xs text-black dark:text-white text-center'>
          {fmtMsg('ifYouBelongToPlantingOrganization')}
        </label>
      </div>
      <SignupForm
        login={login}
        phoneNumber={phoneNumber}
        password={password}
        confirmPassword={confirmPassword}
        countries={countries}
        loginError={loginError}
        phoneNumberError={phoneNumberError}
        countryError={countryError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        onLoginChange={(val: string) => {
          setLoginError('');
          setLogin(val);
        }}
        onPhoneNumberChange={(val: string) => {
          setPhoneNumberError('');
          setPhoneNumber(val);
        }}
        onPasswordChange={(val: string) => {
          setPasswordError('');
          setPassword(val);
        }}
        onConfirmPasswordChange={(val: string) => {
          setConfirmPasswordError('');
          setConfirmPassword(val);
        }}
        onCountryChange={(val: Country) => {
          setCountryError('');
          setCountry(val);
        }}
      />
    </Section>
  );
};
