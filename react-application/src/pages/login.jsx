import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    setUsername(data.get("userName"));
    setPassword(data.get("password"));
    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post('http://localhost:5001/api/login', {
        "username": username,
        "password": password
      });
      console.log(response.data.token);

      if (response.data.token == "true") {
        navigate("/dashboard");
      }
      else if (response.data.token == "Invalid password") {
        console.log(response.data.token);
        setErrorMessages({ name: "pass"});
      }
      else {
        setErrorMessages({ name: "uname"});
      }

    } catch (error) {
      // Handle login error
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  const renderForm = (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            error={renderErrorMessage("uname")}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={renderErrorMessage("pass")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );

  return (
    <div className="log">
      <div className="login-form">
        {isSubmitted ? (
          navigate("/reportPage")
        ) : (renderForm)}
      </div>
    </div>
  );
};

export default Login;
