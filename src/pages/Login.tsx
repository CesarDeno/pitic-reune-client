import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Login = ({ setToken }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const iniciarSesion = async () => {
      setError("");
      setSuccess("");

      const url = process.env.REACT_APP_API_URL_TEST?.replace(/\/+$/, "") + "/auth/users/token/";
      const credentials = { username, password };
      try {
         const response = await axios.post(url, credentials, {
            headers: { "Content-Type": "application/json" },
         });

         const token = response.data.user?.token_access;
         if (!token) throw new Error("Token no encontrado en la respuesta");

         localStorage.setItem("AUTH_TOKEN", token);
         setToken(token);
         setSuccess("Inicio de sesión exitoso ✅");
      } catch (e) {
         console.error(e);
         setError("Error al iniciar sesión: " + e.message);
      }
   };

   return (
      <Box
         minWidth={300}
         margin="auto"
         mt={10}
         display="flex"
         flexDirection="column"
         gap={2}
         sx={{ borderRadius: 2, boxShadow: 2, p: 5, bgcolor: "white" }}
      >
         <Typography variant="h5" textAlign="center">
            REDECO
         </Typography>
         <Typography variant="h5" textAlign="center">
            Iniciar Sesión
         </Typography>

         <TextField label="Usuario" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
         <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         {error && <Alert severity="error">{error}</Alert>}
         {success && <Alert severity="success">{success}</Alert>}

         <Button variant="contained" onClick={iniciarSesion} sx={{ bgcolor: "#305e58ff" }}>
            Iniciar sesión
         </Button>
      </Box>
   );
};

export default Login;
