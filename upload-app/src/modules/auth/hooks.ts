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
