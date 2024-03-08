import { Input } from 'common/components';
import { PadlockIcon, PhoneIcon, UserIcon } from 'common/icons';
import { CountriesAutocomplete, Country } from 'modules/countries';
import { useFmtMsg } from 'modules/intl';

type Props = {
  login: string;
  phoneNumber: string;
  country?: Country;
  password: string;
  confirmPassword: string;
  loginError?: string;
  phoneNumberError?: string;
  countryError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  countries: Country[];
  onLoginChange: (val: string) => void;
  onPhoneNumberChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onCountryChange: (val: Country) => void;
};

export const SignupForm: React.FC<Props> = ({
  phoneNumber,
  login,
  password,
  country,
  confirmPassword,
  loginError,
  phoneNumberError,
  countryError,
  passwordError,
  confirmPasswordError,
  countries,
  onLoginChange,
  onPhoneNumberChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onCountryChange,
}) => {
  const fmtMsg = useFmtMsg();

  return (
    <form className='flex flex-col gap-5 pb-2'>
      <Input
        label={fmtMsg('login')}
        placeholder={fmtMsg('login')}
        icon={<UserIcon pathClassName='fill-gray-500' svgClassName='w-4 h-4' />}
        value={login}
        onChange={onLoginChange}
        error={loginError}
      />
      <Input
        label={fmtMsg('phoneNumber')}
        placeholder={fmtMsg('phoneNumber')}
        icon={<PhoneIcon />}
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        type='tel'
        error={phoneNumberError}
      />
      <CountriesAutocomplete
        value={country}
        options={countries}
        onChange={onCountryChange}
        error={countryError}
      />
      <Input
        label={fmtMsg('password')}
        placeholder={fmtMsg('password')}
        icon={<PadlockIcon />}
        value={password}
        type='password'
        error={passwordError}
        onChange={onPasswordChange}
      />
      <Input
        label={fmtMsg('confirmPassword')}
        placeholder={fmtMsg('confirmPassword')}
        icon={<PadlockIcon />}
        value={confirmPassword}
        type='password'
        error={confirmPasswordError}
        onChange={onConfirmPasswordChange}
      />
    </form>
  );
};
