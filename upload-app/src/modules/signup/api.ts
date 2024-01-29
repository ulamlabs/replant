import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { post, useFetch } from 'modules/fetch';

const AUTH_REGISTER_URL = '/auth/register';
const AUTH_REGISTER_TO_ORGANIZATION_URL = '/auth/register-to-orgnanization';

export type Country = {
  id: number;
  name: string;
};

export type RegisterUser = {
  username: string;
  phone_number: string;
  country: number;
  password: string;
};

export type RegisterError = {
  username?: string[];
  phone_number?: string[];
  country?: string[];
  password?: string[];
  details?: string[];
};

export type RegisterResponse = {
  username: string;
  phone_number: string;
  country: number;
};

export type FetchResponse<T> = {
  body: T;
  status: string;
};

export type RegisterOrganizationUser = RegisterUser & {
  code: string;
};

export type RegisterOrganizationError = RegisterError & {
  code?: string[];
};

const postRegister = (payload: RegisterUser) =>
  post<RegisterResponse, RegisterUser>(AUTH_REGISTER_URL, payload);

export const useRegisterMutation = () => {
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterError>,
    RegisterUser
  >({
    mutationFn: postRegister,
  });

  return mutation;
};

export const useRegisterToOrganisationMutation = () => {
  const fetch = useFetch();
  const mutation = useMutation<
    RegisterResponse,
    RegisterOrganizationError,
    RegisterOrganizationUser
  >({
    mutationFn: (user: RegisterOrganizationUser) =>
      fetch(AUTH_REGISTER_TO_ORGANIZATION_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(user),
      }).then((res) => res.json()),
  });

  return mutation;
};

export const phoneNumberIsNotValid = (errResponseData?: RegisterError) => {
  for (const err of errResponseData?.phone_number || []) {
    const match = err.match(PHONE_NUMBER_IS_NOT_VALID);
    if (match) {
      return match;
    }
  }
  return undefined;
};

const PHONE_NUMBER_IS_NOT_VALID = 'The phone number entered is not valid.';
