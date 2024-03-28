import { useUserHistoryMutation } from './queries';
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
