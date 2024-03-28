import { AxiosResponse } from 'axios';
import { post } from 'modules/api';
import {
  RegisterPayload,
  RegisterResponse,
  ResendPayload,
  VerifyEmailPayload,
} from '.';

export const REGISTER_USER_URL = '/auth/register-sponsor';
export const RESEND_EMAIL_URL = '/auth/register-sponsor-resend';
export const VERIFY_EMAIL_URL = '/auth/register-sponsor-verify';

export const postRegister = (payload: RegisterPayload) =>
  post<RegisterResponse, RegisterPayload>(REGISTER_USER_URL, payload);

export const resendEmail = (payload: ResendPayload) =>
  post<AxiosResponse, ResendPayload>(RESEND_EMAIL_URL, payload);

export const verifyEmail = (payload: VerifyEmailPayload) =>
  post<AxiosResponse, VerifyEmailPayload>(VERIFY_EMAIL_URL, payload);
