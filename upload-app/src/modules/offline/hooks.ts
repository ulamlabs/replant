import { useEffect } from 'react';
import { useOfflineStore } from './store';

export const useInitOffline = () => {
  const store = useOfflineStore();
  useEffect(() => {
    store.syncTotalCount();
  }, []);
};
