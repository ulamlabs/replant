import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { postRegister } from '.';

export const useRegisterUser = () => {
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<RegisterIntoOrganizationError>,
    RegisterPayload
  >({
    mutationFn: (payload) => postRegister(payload),
  });

  return mutation;
};
