import { useContext } from "react";
import AlertProvider, { AlertContext } from "./AlertProvider";
import Alert from "./Alert";

export const useAlert = () => useContext(AlertContext);

const AlertContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AlertProvider>
      <Alert />
      {children}
    </AlertProvider>
  );
};

export default AlertContainer;
