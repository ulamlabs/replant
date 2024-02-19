import { AxiosError } from 'axios';
import { Alert, Button, Header, LoaderBox, Section } from 'common/components';
import { prettifyError } from 'common/utils';
import { Country, useCountries } from 'modules/countries';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SignupForm } from './SignupForm';
import {
  RegisterError,
  RegisteredOrganizationError,
  enterValidUsername,
  passwordIsTooSimilarToUsername,
  phoneNumberIsNotValid,
  registrationLinkExpired,
  useRegisterIntoOrganizationMutation,
  useRegisterMutation,
  useRegisteredOrganization,
} from './api';
import { validatePassword, validatePhoneNumber } from './utils';

export const Signup: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  // if organization code is given, sign the user up into the organization, else sign them up as a regular user
  const signupIntoOrganization = !!code;

  const {
    data: countries,
    error: countriesError,
    isLoading: isCountriesLoading,
  } = useCountries({
    enabled: !signupIntoOrganization,
  });

  const {
    data: organization,
    error: organizationError,
    isLoading: isOrganizationLoading,
  } = useRegisteredOrganization(code);

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

  const registerMutation = useRegisterMutation();

  const registerIntoOrganizationMutation = useRegisterIntoOrganizationMutation(
    code!
  );

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

    if (!validatePhoneNumber(phoneNumberTrimmed)) {
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

    const mutation = signupIntoOrganization
      ? registerIntoOrganizationMutation
      : registerMutation;

    if (country && phoneNumberTrimmed && loginTrimmed && password) {
      mutation.mutate(
        {
          username: loginTrimmed,
          phone_number: phoneNumberTrimmed,
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

  const getWrongCodeErrorText = (
    error: AxiosError<RegisteredOrganizationError> | null
  ) => {
    if (registrationLinkExpired(error?.response?.data)) {
      return fmtMsg('registrationLinkExpired');
    }

    return fmtMsg('registrationLinkIsInvalid');
  };

  if (organizationError || countriesError) {
    return (
      <div className='flex flex-col gap-5 mb-5 w-full'>
        {countriesError && (
          <Alert severity='error' text={fmtMsg('errorWhileFetchingCoutries')} />
        )}
        {organizationError && (
          <>
            <Alert
              text={getWrongCodeErrorText(organizationError)}
              severity={'error'}
            />
            <Button
              text={fmtMsg('goToSignup')}
              onClick={() => navigate('/signup')}
            />
          </>
        )}
      </div>
    );
  }

  if (signupIntoOrganization ? isOrganizationLoading : isCountriesLoading) {
    return <LoaderBox />;
  }

  return (
    <Section
      actions={
        <Button
          isLoading={registerMutation.isPending}
          text={fmtMsg('signUp')}
          onClick={submit}
        />
      }
      className='max-w-xl'
    >
      <div className='flex flex-col gap-5 mb-5'>
        {registerMutation.isError && (
          <Alert
            text={getErrorText(registerMutation.error)}
            severity={'error'}
          />
        )}
        <Header text={fmtMsg('signUp')} />
        {signupIntoOrganization ? (
          <span className='text-lg font-bold text-gray-500 dark:text-gray-500 text-center'>
            {organization!.planting_organization.name}
          </span>
        ) : (
          <span className='text-xs text-black dark:text-white text-center'>
            {fmtMsg('ifYouBelongToPlantingOrganization')}
          </span>
        )}
      </div>
      <SignupForm
        login={login}
        phoneNumber={phoneNumber}
        password={password}
        confirmPassword={confirmPassword}
        countries={
          signupIntoOrganization
            ? organization!.planting_organization.countries!
            : countries!
        }
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
