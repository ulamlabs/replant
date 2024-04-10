import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN_USER_URL,
  LOGOUT_USER_URL,
  LoginError,
  LoginPayload,
  LoginResponse,
  RegisterError,
  RegisterPayload,
  RegisterResponse,
  ResendPayload,
  VERIFY_EMAIL_URL,
  VerifyEmailPayload,
  postLogin,
  postLogout,
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

export const useLoginUser = () => {
  const mutation = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<LoginError>,
    LoginPayload
  >({
    mutationKey: ['POST', LOGIN_USER_URL],
    mutationFn: (payload) => postLogin(payload),
  });
  return mutation;
};

export const useLogoutUser = () =>
  useMutation<
    AxiosResponse<Record<string, never>>,
    AxiosError<{ detail: string }>,
    Record<string, never>
  >({
    mutationKey: ['POST', LOGOUT_USER_URL],
    mutationFn: postLogout,
  });
