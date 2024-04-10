import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'common/components';
import { prettifyError } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogInForm,
  useAuthStore,
  useLoginUser,
  validateEmail,
  validatePassword,
} from '.';

export const LogIn = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginMutation = useLoginUser();
  const store = useAuthStore();

  useEffect(() => {
    store.reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async () => {
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

    if (store.password && store.email) {
      await loginMutation.mutateAsync(
        {
          email: store.email,
          password: store.password,
        },
        {
          onError(error) {
            if (
              error.response?.data.non_field_errors?.includes(
                'Incorrect username or password.'
              )
            ) {
              openSnackbar(fmtMsg('incorrectUsernameOrPassword'), 'error');
            } else {
              openSnackbar(prettifyError(error), 'error');
            }
          },
        }
      );
    }
    queryClient.removeQueries();
    navigate('/');
  };

  return (
    <div className='max-w-md m-auto flex flex-col'>
      <h2 className='text-2xl md:text-4xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('welcomeBack')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-lg font-normal mb-4 md:mb-8'>
        {fmtMsg('logInAndExploreTheReplantWorldsFeatures')}
      </p>
      <LogInForm />
      <div className='flex flex-col gap-3 mt-6 md:mt-8'>
        <Button
          onClick={submit}
          className='md:h-16 max-h-max'
          isLoading={loginMutation.isPending}
        >
          {fmtMsg('logIn')}
        </Button>
        <Link to='/signup'>
          <Button
            type='secondary'
            className='border-none md:h-16 max-h-max w-full'
          >
            {fmtMsg('createAccount')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
