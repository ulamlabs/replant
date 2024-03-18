import { AxiosError } from 'axios';
import { Alert, Button, Header, LoaderBox, Section } from 'common/components';
import { prettifyError } from 'common/utils';
import { Country } from 'modules/countries';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  RegisterError,
  RegisteredOrganizationError,
  enterValidUsername,
  passwordIsTooSimilarToUsername,
  phoneNumberIsNotValid,
  registrationLinkExpired,
  useRegisterIntoOrganizationMutation,
  useRegisteredOrganization,
} from '.';
import { SignupForm } from './SignupForm';
import { validatePassword, validatePhoneNumber } from './utils';

export const Signup: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

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

  const registerMutation = useRegisterIntoOrganizationMutation(code!);

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

    if (country && phoneNumberTrimmed && loginTrimmed && password) {
      registerMutation.mutate(
        {
          username: loginTrimmed,
          phone_number: phoneNumberTrimmed,
          country: country?.id,
          password: password,
        },
        {
          onSuccess: () => {
            openSnackbar(fmtMsg('youHaveSuccessfullySignedUp'), 'success');
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

  if (!code || organizationError) {
    return (
      <div className='flex flex-col gap-5 mb-5 w-full'>
        {!code && (
          <Alert
            text={fmtMsg('signupCodeIsMissingFromTheUrl')}
            severity={'error'}
          />
        )}
        {organizationError && (
          <Alert
            text={getWrongCodeErrorText(organizationError)}
            severity={'error'}
          />
        )}
      </div>
    );
  }

  if (isOrganizationLoading) {
    return <LoaderBox />;
  }

  return (
    <Section
      actions={
        <Button isLoading={registerMutation.isPending} onClick={submit}>
          {fmtMsg('signUp')}
        </Button>
      }
    >
      <div className='flex flex-col gap-5 mb-5'>
        {registerMutation.isError && (
          <Alert
            text={getErrorText(registerMutation.error)}
            severity={'error'}
          />
        )}
        <Header text={fmtMsg('signUp')} />
        <span className='text-lg font-bold text-gray-500 dark:text-gray-500 text-center'>
          {organization?.planting_organization.name}
        </span>
      </div>
      <SignupForm
        login={login}
        phoneNumber={phoneNumber}
        password={password}
        confirmPassword={confirmPassword}
        countries={organization?.planting_organization.countries || []}
        loginError={loginError}
        phoneNumberError={phoneNumberError}
        countryError={countryError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        onLoginChange={(val) => {
          setLoginError('');
          setLogin(val);
        }}
        onPhoneNumberChange={(val) => {
          setPhoneNumberError('');
          setPhoneNumber(val);
        }}
        onPasswordChange={(val) => {
          setPasswordError('');
          setPassword(val);
        }}
        onConfirmPasswordChange={(val) => {
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
