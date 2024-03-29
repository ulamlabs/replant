import { isOnline } from 'modules/offline';
import * as offlineDb from 'modules/offline/db';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserHistoryBulkMutation, useUserHistoryMutation } from './queries';
import { HistoryEvent } from './types';
import { getUserAgent } from './user-agent';

export const useLogLocationFailed = () => {
  const mutation = useUserHistoryMutation();

  const logLocationFailed = async (error: Error) => {
    const userAgent = await getUserAgent();
    const event: HistoryEvent = {
      created_at: new Date().toISOString(),
      error_name: error.name,
      error_message: error.message,
      event_type: 'LOCATION_FAILED',
      ...userAgent,
    };
    return mutation.mutate(event);
  };

  return logLocationFailed;
};

export const useLogLocationSucceeded = () => {
  const mutation = useUserHistoryMutation();

  const logLocationSucceeded = async (accuracy: number) => {
    const userAgent = await getUserAgent();
    const event: HistoryEvent = {
      accuracy,
      created_at: new Date().toISOString(),
      event_type: 'LOCATION_SUCCEEDED',
      ...userAgent,
    };
    return mutation.mutate(event);
  };

  return logLocationSucceeded;
};

const SLICE_SIZE = 100;

const slicedArray = <T = any>(array: T[], sliceSize: number): T[][] => {
  let slices: T[][] = [];
  for (let i = 0; i <= array.length; i += sliceSize) {
    slices.push(array.slice(i, i + sliceSize));
  }
  return slices;
};

export const useUploadLogWhenOnline = () => {
  const mutation = useUserHistoryBulkMutation();

  const uploadLog = useCallback(async () => {
    const log = await offlineDb.loadAllLogEntries();
    const logSlices = slicedArray(log, SLICE_SIZE);
    for (const slice of logSlices) {
      await mutation.mutateAsync(slice);
      await offlineDb.deleteLogEntries(slice.map((item) => item.created_at));
    }
  }, []);

  const location = useLocation();
  const isLoggedIn = [
    '/dashboard',
    '/new-plant',
    '/user',
    '/submissions',
  ].includes(location.pathname); // VERY primitive solution, hopefully temporary

  // initial upload on app startup
  useEffect(() => {
    if (isOnline() && isLoggedIn) {
      uploadLog();
    }
  }, [isLoggedIn]);

  const handleOnline = useCallback(() => {
    if (!isLoggedIn) {
      return;
    }
    uploadLog();
  }, [isLoggedIn, uploadLog]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [handleOnline]);
};
