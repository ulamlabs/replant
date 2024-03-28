import { useMutation } from '@tanstack/react-query';
import { isOnline } from 'modules/offline';
import {
  UserHistoryError,
  UserHistoryResponse,
  postUserHistory,
  userHistoryUrl,
} from './api';
import { HistoryEvent } from './types';

// works only online; used to upload logs from offline database
export const useUserHistoryBulkMutation = () =>
  useMutation<UserHistoryResponse, UserHistoryError, HistoryEvent[]>({
    mutationKey: ['POST', userHistoryUrl, 'bulk'],
    mutationFn: (events) => postUserHistory({ history: events }),
  });

// works offline
export const useUserHistoryMutation = () =>
  useMutation<UserHistoryResponse, UserHistoryError, HistoryEvent>({
    mutationKey: ['POST', userHistoryUrl, 'bulk'],
    mutationFn: (event) => {
      if (isOnline()) {
        return postUserHistory({ history: [event] });
      }
      return postUserHistory({ history: [event] }); // make db instead
    },
    networkMode: 'always',
  });
