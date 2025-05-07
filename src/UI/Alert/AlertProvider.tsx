import {
  createContext,
  FC,
  HTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";

interface IAlertNotification {
  title: string;
  message: string | ReactNode;
  delay?: number;
  autoClose?: boolean;
  isCloseBtn?: boolean;
  actions?: {
    text: string;
    callback?: (arg: any) => void;
    props?: HTMLAttributes<HTMLButtonElement>;
  }[];
  type?: "success" | "warn" | "error" | "info";
}

interface IAlertContext {
  alert: (args: IAlertNotification) => void;
  alertShown?: boolean;
  notification?: IAlertNotification;
  close: () => void;
}

export const AlertContext = createContext<IAlertContext>({
  alert: () => {},
  close: () => {},
});

const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alertShown, setAlertShown] = useState(false);
  const [notification, setNotification] = useState<
    IAlertNotification | undefined
  >();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const close = () => {
    setAlertShown(false);
    setNotification(undefined);
    clearTimeout(timerRef.current);
  };

  const alert = (args: IAlertNotification) => {
    setNotification(args);
    setAlertShown(true);

    if (args.autoClose) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        close();
      }, notification?.delay || 3000);
    }

    return notification;
  };

  return (
    <AlertContext.Provider
      value={{
        notification,
        alert,
        alertShown,
        close,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
