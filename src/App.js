import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useMemo } from "react";

function AppRoutes() {
   const location = useLocation();
   const token = useMemo(
      () => localStorage.getItem("AUTH_TOKEN"),
      // eslint-disable-next-line
      [location]
   );

   return (
      <Routes>
         <Route path="/login" element={!token ? <Login /> : <Navigate to="/inicio" />} />
         <Route path="/inicio" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
   );
}

function App() {
   return (
      <BrowserRouter>
         <AppRoutes />
      </BrowserRouter>
   );
}

export default App;
