import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import {
  useAuthStore,
  useRegisterUser,
  validateEmail,
  validatePassword,
} from '.';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  const fmtMsg = useFmtMsg();

  const {
    name,
    setNameError,
    email,
    setEmailError,
    password,
    setPasswordError,
    nameError,
    emailError,
    passwordError,
    switchValue,
  } = useAuthStore();

  const switchValues: [string, string] = [
    fmtMsg('company'),
    fmtMsg('individual'),
  ];

  const registerMutation = useRegisterUser();

  const submit = () => {
    const nameTrimmed = name.trim();

    if (!nameTrimmed) {
      setNameError(fmtMsg('fieldRequired'));
    }

    if (!email) {
      setEmailError(fmtMsg('fieldRequired'));
    }

    if (!password) {
      setPasswordError(fmtMsg('fieldRequired'));
    }

    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(fmtMsg('wrongEmailFormat'));
      return;
    }

    if (nameError || passwordError || emailError) {
      return;
    }

    if (nameTrimmed && password && email) {
      registerMutation.mutate(
        {
          name: nameTrimmed,
          email: email,
          password: password,
          type: switchValue === switchValues[0] ? 'COMPANY' : 'INDIVIDUAL',
        },
        {
          onError(error) {
            if (error.response?.data.email) {
              if (
                error.response?.data.email.some((value) =>
                  value.match('A user with that email already exists')
                )
              ) {
                setEmailError(fmtMsg('userWithThatEmailAlreadyExists'));
              } else {
                setEmailError(fmtMsg('wrongEmailFormat'));
              }
            }
            if (error.response?.data.name) {
              setNameError(fmtMsg('nameIsNotValid'));
            }
            if (error.response?.data.password) {
              setPasswordError(fmtMsg('passwordIsNotValid'));
            }
          },
        }
      );
    }
  };

  return (
    <div className='max-w-md m-auto flex flex-col'>
      <h2 className='text-2xl md:text-4xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('hello')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-lg font-normal mb-4 md:mb-8'>
        {fmtMsg('signInAndExploreTheReplantWorldsMarketplace')}
      </p>
      <SignUpForm switchValues={switchValues} />
      <Button
        isLoading={registerMutation.isPending}
        onClick={submit}
        className='mt-6 md:mt-8 md:h-16 max-h-max'
      >
        {fmtMsg('signUp')}
      </Button>
    </div>
  );
};
