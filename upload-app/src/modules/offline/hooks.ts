import { useCallback, useEffect, useState } from 'react';
import { useOfflineStore } from './store';

export const useInitOffline = () => {
  const store = useOfflineStore();
  useEffect(() => {
    store.syncTotalCount();
  }, []);
};

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const handleOnline = useCallback(() => setIsOnline(true), []);
  const handleOffline = useCallback(() => setIsOnline(false), []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
