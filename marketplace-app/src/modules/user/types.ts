export type UserType = {
  username?: string;
  email: string;
  phone_number: string;
  country?: string;
  planting_organization?: string;
  sponsor: { type: 'COMPANY' | 'INDIVIDUAL'; name: string };
};
