import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import {
  useAuthStore,
  useRegisterUser,
  validateEmail,
  validatePassword,
} from '.';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  const fmtMsg = useFmtMsg();

  const store = useAuthStore();

  const switchLabels: [string, string] = [
    fmtMsg('company'),
    fmtMsg('individual'),
  ];

  const registerMutation = useRegisterUser();

  const submit = () => {
    const nameTrimmed = store.name.trim();

    if (!nameTrimmed) {
      store.setNameError(fmtMsg('fieldRequired'));
    }

    if (!store.email) {
      store.setEmailError(fmtMsg('fieldRequired'));
    }

    if (!store.password) {
      store.setPasswordError(fmtMsg('fieldRequired'));
    }

    if (!validatePassword(store.password)) {
      store.setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (!validateEmail(store.email)) {
      store.setEmailError(fmtMsg('wrongEmailFormat'));
      return;
    }

    if (store.nameError || store.passwordError || store.emailError) {
      return;
    }

    if (nameTrimmed && store.password && store.email) {
      registerMutation.mutate(
        {
          name: nameTrimmed,
          email: store.email,
          password: store.password,
          type: store.switchValue ? 'COMPANY' : 'INDIVIDUAL',
        },
        {
          onError(error) {
            if (
              error.response?.data?.email?.includes(
                'A user with that email already exists.'
              )
            ) {
              store.setEmailError(fmtMsg('userWithThatEmailAlreadyExists'));
            } else if (error.response?.data?.email) {
              store.setEmailError(fmtMsg('wrongEmailFormat'));
            }
            if (error.response?.data.name) {
              store.setNameError(fmtMsg('nameIsNotValid'));
            }
            if (error.response?.data.password) {
              store.setPasswordError(fmtMsg('passwordIsNotValid'));
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
    <div className='max-w-md m-auto flex flex-col'>
      <h2 className='text-2xl md:text-4xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('hello')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-lg font-normal mb-4 md:mb-8'>
        {fmtMsg('signInAndExploreTheReplantWorldsMarketplace')}
      </p>
      <SignUpForm switchLabels={switchLabels} />
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
