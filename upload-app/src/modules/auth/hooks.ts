import { useUser } from 'modules/user';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type LoginLocationState = {
  signupSuccess?: boolean;
};

export const useLoginSnackbar = () => {
  const location = useLocation();
  const signupSuccess = ((location.state ?? {}) as LoginLocationState)
    .signupSuccess;
  return useState(signupSuccess);
};

export const useAuthRequired = () => {
  useUser(); // make simple query to check if user is logged in. 401 is handled in global query provider configuaration.
};
