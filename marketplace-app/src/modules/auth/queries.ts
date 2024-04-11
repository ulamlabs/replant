import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  RegisterError,
  RegisterPayload,
  RegisterResponse,
  ResendPayload,
  VERIFY_EMAIL_URL,
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

export const useVerifyEmail = (payload: VerifyEmailPayload) => {
  const query = useQuery({
    queryKey: ['POST', VERIFY_EMAIL_URL],
    queryFn: () => verifyEmail(payload),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return query;
};
