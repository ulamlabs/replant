import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'modules/api';
import { Country } from 'modules/countries';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/register';
const REGISTER_TO_ORGANIZATION_URL = '/auth/register-to-organization/{code}';

const registeredOrganizationQueryKey = (code: string | null) => [
  'GET',
  REGISTER_TO_ORGANIZATION_URL,
  code,
];

export type LoginPayload = {
  password: string;
  username: string;
};

export type LoginError = {
  non_field_errors?: string[];
};

export type LoginResponse = { username: string };

export type RegisterPayload = {
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

export type RegisteredOrganizationResponse = {
  planting_organization: {
    name: string;
    countries: Country[];
  };
};

export type RegisteredOrganizationError = {
  non_field_errors?: string[];
};

const getRegisteredOrganization = async (code: string) => {
  const response = await get<RegisteredOrganizationResponse>(
    REGISTER_TO_ORGANIZATION_URL.replace('{code}', `${code}`)
  );
  return response.data;
};

const postLogin = (payload: LoginPayload) =>
  post<LoginResponse, LoginPayload>(LOGIN_URL, payload);

const postRegister = (payload: RegisterPayload) =>
  post<RegisterResponse, RegisterPayload>(REGISTER_URL, payload);

const postRegisterIntoOrganization = (payload: RegisterPayload, code: string) =>
  post<RegisterResponse, RegisterPayload>(
    REGISTER_TO_ORGANIZATION_URL.replace('{code}', `${code}`),
    payload
  );

export const useLoginMutation = () =>
  useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<LoginError>,
    LoginPayload
  >({
    mutationKey: ['POST', LOGIN_URL],
    mutationFn: postLogin,
  });

export const useRegisterMutation = () => {
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterError>,
    RegisterPayload
  >({
    mutationFn: postRegister,
  });

  return mutation;
};

export const useRegisterIntoOrganizationMutation = (code: string) => {
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterIntoOrganizationError>,
    RegisterPayload
  >({
    mutationFn: (payload) => postRegisterIntoOrganization(payload, code),
  });

  return mutation;
};

export const useRegisteredOrganization = (code: string | null) =>
  useQuery<
    RegisteredOrganizationResponse,
    AxiosError<RegisteredOrganizationError>
  >({
    queryKey: registeredOrganizationQueryKey(code),
    queryFn: () => getRegisteredOrganization(code!),
    enabled: !!code,
  });

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
  errResponseData?: RegisteredOrganizationError
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
