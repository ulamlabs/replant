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
};

export type ResendPayload = {
  email: string;
};
export type VerifyEmailPayload = {
  uid: string;
  token: string;
};
