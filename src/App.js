import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
   const [token, setToken] = useState(null);

   useEffect(() => {
      const savedToken = localStorage.getItem("AUTH_TOKEN");
      setToken(savedToken);
   }, []);

   return (
      <Container
         maxWidth={false}
         disableGutters
         sx={{
            bgcolor: "whitesmoke",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         {token ? <Dashboard setToken={setToken} /> : <Login setToken={setToken} />}
      </Container>
   );
}

export default App;
