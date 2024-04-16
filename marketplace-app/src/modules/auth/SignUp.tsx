import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import { useEffect } from 'react';
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
    reset,
    name,
    setNameError,
    setEmailError,
    setPasswordError,
    email,
    password,
    nameError,
    passwordError,
    emailError,
    switchValue,
  } = useAuthStore();

  useEffect(() => {
    reset();
  }, [reset]);

  const switchLabels: [string, string] = [
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
          type: switchValue ? 'COMPANY' : 'INDIVIDUAL',
        },
        {
          onError(error) {
            if (
              error.response?.data?.email?.includes(
                'A user with that email already exists.'
              )
            ) {
              setEmailError(fmtMsg('userWithThatEmailAlreadyExists'));
            } else if (error.response?.data?.email) {
              setEmailError(fmtMsg('wrongEmailFormat'));
            }
            if (error.response?.data.name) {
              setNameError(fmtMsg('nameIsNotValid'));
            }
            if (error.response?.data.password) {
              setPasswordError(fmtMsg('passwordIsNotValid'));
            }
            if (
              error.response?.data.non_field_error?.includes(
                'Registration is not possible now. Try again later.'
              )
            ) {
              openSnackbar(fmtMsg('registrationIsNotPossibleNow'), 'error');
            }
          },
        }
      );
    }
  };

  return (
    <div className='max-w-md m-auto flex flex-col md:-mt-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('hello')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-base font-normal mb-4 md:mb-6'>
        {fmtMsg('signUpAndExploreTheReplantWorldsMarketplace')}
      </p>
      <SignUpForm switchLabels={switchLabels} />
      <Button
        isLoading={registerMutation.isPending}
        onClick={submit}
        className='mt-6 md:mt-8 py-5 max-h-max text-sm'
      >
        {fmtMsg('signUp')}
      </Button>
    </div>
  );
};
