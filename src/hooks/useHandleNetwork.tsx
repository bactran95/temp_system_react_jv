import { useEffect, useState } from 'react';

const useHandleNetwork = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return window.navigator.onLine;
  });

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
};

export default useHandleNetwork;
