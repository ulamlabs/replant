import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'modules/api';
import { Country } from 'modules/countries/api';

const AUTH_REGISTER_URL = '/auth/register';
const AUTH_REGISTER_TO_ORGANIZATION_URL =
  '/auth/register-to-organization/{code}';

const buildAuthRegisterToOrgKey = (code: string | null) => [
  'GET',
  AUTH_REGISTER_TO_ORGANIZATION_URL,
  code,
];

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

export type RegisterIntoOrganizationError = RegisterError & {
  code?: string[];
};

export type RegisterOrganizationResponse = {
  planting_organization: {
    name: string;
    countries: Country[];
  };
};

export type RegisterOrganizationError = {
  non_field_errors?: string[];
};

const postRegister = (payload: RegisterUser) =>
  post<RegisterResponse, RegisterUser>(AUTH_REGISTER_URL, payload);

const postRegisterIntoOrganization = (payload: RegisterUser, code: string) =>
  post<RegisterResponse, RegisterUser>(
    AUTH_REGISTER_TO_ORGANIZATION_URL.replace('{code}', `${code}`),
    payload
  );

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

export const useRegisterIntoOrganizationMutation = (code: string) => {
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterIntoOrganizationError>,
    RegisterUser
  >({
    mutationFn: (payload) => postRegisterIntoOrganization(payload, code),
  });

  return mutation;
};

const getRegisterOrganization = async (code: string | null) => {
  const response = await get<RegisterOrganizationResponse>(
    AUTH_REGISTER_TO_ORGANIZATION_URL.replace('{code}', `${code}`)
  );
  return response.data;
};

export const useRegisterOrganization = (code: string | null) =>
  useQuery<RegisterOrganizationResponse, AxiosError<RegisterOrganizationError>>(
    {
      queryKey: buildAuthRegisterToOrgKey(code),
      queryFn: () => getRegisterOrganization(code),
    }
  );

export const phoneNumberIsNotValid = (
  errResponseData?: RegisterError | RegisterIntoOrganizationError
) => {
  for (const err of errResponseData?.phone_number || []) {
    const match = err.match(PHONE_NUMBER_IS_NOT_VALID);
    if (match) {
      return match;
    }
  }
  return undefined;
};

export const passwordIsTooSimilarToUsername = (
  errResponseData?: RegisterError | RegisterIntoOrganizationError
) => {
  for (const err of errResponseData?.password || []) {
    const match = err.match(PASSWORD_IS_TOO_SIMILAR_TO_USERNAME);
    if (match) {
      return match;
    }
  }
  return undefined;
};

export const enterValidUsername = (
  errResponseData?: RegisterError | RegisterIntoOrganizationError
) => {
  for (const err of errResponseData?.username || []) {
    const match = err.match(ENTER_VALID_USERNAME);
    if (match) {
      return match;
    }
  }
  return undefined;
};

export const registrationLinkExpired = (
  errResponseData?: RegisterOrganizationError
) => {
  for (const err of errResponseData?.non_field_errors || []) {
    const match = err.match(CODE_HAS_EXPIRED);
    if (match) {
      return match;
    }
  }
  return undefined;
};

const PHONE_NUMBER_IS_NOT_VALID = 'The phone number entered is not valid.';
const PASSWORD_IS_TOO_SIMILAR_TO_USERNAME =
  'The password is too similar to the username.';
const ENTER_VALID_USERNAME = `Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.`;
const CODE_HAS_EXPIRED = 'The code has expired.';
