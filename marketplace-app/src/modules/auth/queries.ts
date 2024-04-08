import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  RegisterError,
  RegisterPayload,
  RegisterResponse,
  ResendPayload,
  VerifyEmailPayload,
  postRegister,
  resendEmail,
  verifyEmail,
} from '.';

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterError>,
    RegisterPayload
  >({
    mutationFn: (payload) => postRegister(payload),
    onSuccess: (data) => {
      navigate('/signup-success', { state: { email: data.data.email } });
    },
  });

  return mutation;
};

export const useResendEmail = () => {
  const mutation = useMutation<AxiosResponse, AxiosError, ResendPayload>({
    mutationFn: (payload) => resendEmail(payload),
  });

  return mutation;
};

export const useVerifyEmail = () => {
  const mutation = useMutation<AxiosResponse, AxiosError, VerifyEmailPayload>({
    mutationFn: (payload) => verifyEmail(payload),
  });

  return mutation;
};
