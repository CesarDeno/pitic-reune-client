import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("AUTH_TOKEN");
    setToken(savedToken);
  }, []);

  return token ? <Dashboard /> : <Login setToken={setToken} />;
}

export default App;
