import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'common/components';
import { prettifyError } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <>
      <LogInForm />
      <div className='flex flex-col gap-3 mt-6 md:mt-8'>
        <Button
          onClick={submit}
          className='md:h-16 max-h-max text-sm'
          isLoading={loginMutation.isPending}
        >
          {fmtMsg('logIn')}
        </Button>
      </div>
    </>
  );
};
