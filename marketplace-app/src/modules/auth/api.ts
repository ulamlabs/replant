import { post } from 'modules/api';

export const REGISTER_USER_URL = '/auth/register';

export const postRegister = (payload: RegisterPayload) =>
  post<RegisterResponse, RegisterPayload>(REGISTER_USER_URL, payload);
