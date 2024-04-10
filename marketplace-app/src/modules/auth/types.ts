export type RegisterPayload = {
  type: 'COMPANY' | 'INDIVIDUAL';
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  email: string;
};

export type RegisterError = {
  email?: string[];
  password?: string[];
  name?: string[];
  non_field_error?: string[];
};

export type ResendPayload = {
  email: string;
};
export type VerifyEmailPayload = {
  uid: string;
  token: string;
};

export type LoginResponse = {
  email: string;
};

export type LoginError = {
  non_field_errors?: string[];
  email?: string[];
  password?: string[];
};

export type LoginPayload = {
  password: string;
  email: string;
};
