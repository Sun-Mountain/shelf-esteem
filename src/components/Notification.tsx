import { toast } from 'react-toastify';

interface NotificationProps {
  autoClose?: number;
  closeOnClick?: boolean;
  draggable?: boolean;
  hideProgressBar?: boolean;
  pauseOnHover?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  type?: 'success' | 'error' | 'info' | 'promise' | 'dismiss' | 'default';
  message?: any;
  toastId?: string;
  promise?: Promise<any>;
}

const Notification = ({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  hideProgressBar = false,
  message,
  pauseOnHover = true,
  position = 'top-center',
  type = 'default',
  toastId,
  promise
}: NotificationProps) => {
  const alertType = (type: string) => {
    switch (type) {
      case 'success':
        return toast.success(message, {
          position,
          autoClose,
          hideProgressBar,
          closeOnClick,
          pauseOnHover,
          draggable,
          toastId,
          progress: undefined,
        });
      case 'error':
        return toast.error(message, {
          position,
          autoClose,
          hideProgressBar,
          closeOnClick,
          pauseOnHover,
          draggable,
          progress: undefined,
        });
      case 'info':
        return toast.info(message, {
          position,
          autoClose,
          hideProgressBar,
          closeOnClick,
          pauseOnHover,
          draggable,
          progress: undefined,
        });
      case 'promise':
        return toast.promise(
          Promise.resolve(promise),
          message,
          {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress: undefined,
            toastId
          }
        );
      case 'dismiss':
        toast.dismiss()
      default:
        return toast(message, {
          position,
          autoClose,
          hideProgressBar,
          closeOnClick,
          pauseOnHover,
          draggable,
          progress: undefined,
        });
    }
  };

  return <>{alertType(type)}</>;
}

export default Notification;