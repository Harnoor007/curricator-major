import React, { useState } from "react";
import Toast from "./toast";

interface UseToastReturnType {
  showToast: (type: "success" | "error", message: string) => void;
  ToastComponent: React.FC;
}

const useToast = (): UseToastReturnType => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const showToast = (type: "success" | "error", msg: string) => {
    setSeverity(type);
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ToastComponent: React.FC = () => (
    <Toast
      open={open}
      severity={severity}
      message={message}
      onClose={handleClose}
    />
  );

  return { showToast, ToastComponent };
};

export default useToast;
