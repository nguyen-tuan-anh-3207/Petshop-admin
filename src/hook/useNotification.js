import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useNotification = (error, isSuccess, message) => {
  useEffect(() => {
    if (error) {
      const message = error?.message?.split(':')[0];
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
  }, [error, isSuccess]);
};
