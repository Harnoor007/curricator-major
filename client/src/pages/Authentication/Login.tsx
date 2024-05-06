import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Define API URL based on environment variables


// Define type for Login component state
interface Credentials {
  username: string;
  password: string;
  name: any;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
    name: undefined
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {



      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log(json)
      if (json.success) {
        alert("Success")
        const authToken = json.authToken;
        console.log(authToken)
        localStorage.setItem('authToken', authToken);
        setLoading(false);
        navigate('/home')
      }
      else {
        alert("Fail")
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const validateField = (fieldName: keyof Credentials, value: string) => {
    switch (fieldName) {
      case "password":
        return value.length >= 8
          ? ""
          : "Password must be at least 8 characters long";
      default:
        return "";
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: "100px" }}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username/username"
            name="username"
            placeholder="1234567"
            value={credentials.username}
            onChange={handleChange}
            autoFocus
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={credentials.password}
            type={showPassword ? "text" : "password"} // Show password text if showPassword is true
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>

        </Box>
      </Box>
    </Container>
  );


}