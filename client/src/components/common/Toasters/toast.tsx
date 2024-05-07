import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ToastProps {
  open: boolean;
  severity: "success" | "error" | "info" | "warning"; // Extend severity types
  message: string;
  onClose: () => void;
}


const Toast: React.FC<ToastProps> = ({ open, severity, message, onClose }) => {
//   const icon =
//     severity === "success" ? (
//       <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" />
//     ) : (
//       <ErrorOutlineIcon sx={{ mr: 1 }} fontSize="small" />
//     );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
