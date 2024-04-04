import { AxiosError } from 'axios';
import { Alert, Button, Header, Input, Section } from 'common/components';
import { Lock } from 'common/custom-icons';
import { prettifyError } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import { openSnackbar } from 'modules/snackbar';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordError, useResetPasswordMutation } from '.';
import { validatePassword } from './utils';

export const ResetPassword: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const resetPasswordMutation = useResetPasswordMutation();

  const submit = () => {
    if (!validatePassword(password)) {
      setPasswordError(fmtMsg('wrongPasswordFormat'));
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(fmtMsg('passwordsAreNotTheSame'));
      return;
    }

    resetPasswordMutation.mutate(
      { password, token, uid },
      {
        onSuccess: () => {
          openSnackbar(fmtMsg('passwordChangedSuccessfully'), 'success');
          navigate('/login');
        },
      }
    );
  };

  const getErrorText = (error: AxiosError<ResetPasswordError>) => {
    if (
      error.response?.data.token?.includes('Invalid value.') ||
      error.response?.data.uid?.includes('Invalid value.')
    ) {
      return fmtMsg('linkExpiredOrIncorrect');
    }
    return prettifyError(error);
  };

  return (
    <Section
      actions={
        <Button onClick={submit} isLoading={resetPasswordMutation.isPending}>
          {fmtMsg('reset')}
        </Button>
      }
    >
      <form className='space-y-5'>
        <Header text={fmtMsg('resetPassword')} />
        {resetPasswordMutation.error && (
          <Alert
            text={getErrorText(resetPasswordMutation.error)}
            severity='error'
          />
        )}
        <Input
          Icon={Lock}
          label={fmtMsg('newPassword')}
          placeholder={fmtMsg('newPassword')}
          value={password}
          type='password'
          error={passwordError}
          onChange={(val) => {
            setPasswordError('');
            setPassword(val);
          }}
        />
        <Input
          Icon={Lock}
          label={fmtMsg('confirmNewPassword')}
          placeholder={fmtMsg('confirmNewPassword')}
          value={confirmPassword}
          type='password'
          error={confirmPasswordError}
          onChange={(val) => {
            setConfirmPasswordError('');
            setConfirmPassword(val);
          }}
        />
      </form>
    </Section>
  );
};
