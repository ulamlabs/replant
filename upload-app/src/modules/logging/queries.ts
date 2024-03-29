import { useMutation } from '@tanstack/react-query';
import { isOnline } from 'modules/offline';
import * as offlineDb from 'modules/offline/db';
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
    mutationFn: (events) => postUserHistory(events),
  });

// works offline
export const useUserHistoryMutation = () =>
  useMutation<UserHistoryResponse, UserHistoryError, HistoryEvent>({
    mutationKey: ['POST', userHistoryUrl, 'single'],
    mutationFn: (event) => {
      if (isOnline()) {
        return postUserHistory([event]);
      }
      return offlineDb.saveLogEntry(event);
    },
    networkMode: 'always',
  });
