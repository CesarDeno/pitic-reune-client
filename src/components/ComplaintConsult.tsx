import { useState } from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const meses = [
   "Enero",
   "Febrero",
   "Marzo",
   "Abril",
   "Mayo",
   "Junio",
   "Julio",
   "Agosto",
   "Septiembre",
   "Octubre",
   "Noviembre",
   "Diciembre",
];

const currentYear = new Date().getFullYear();
const años = Array.from({ length: 10 }, (_, i) => currentYear - i);

const ComplaintConsult = () => {
   const [mes, setMes] = useState("Enero");
   const [anio, setAnio] = useState(new Date().getFullYear());
   const [error, setError] = useState("");

   const handleConsultar = async () => {
      try {
         setError("");

         const token = localStorage.getItem("AUTH_TOKEN");
         if (!token) throw new Error("Token no disponible");

         const mesNumero = meses.indexOf(mes) + 1;
         if (mesNumero === 0) throw new Error("Mes inválido");

         const url = `${process.env.REACT_APP_API_URL}/redeco/quejas/?year=${anio}&month=${mesNumero}`;

         const res = await axios.get(url, {
            headers: { Authorization: token },
         });

         console.log("Quejas:", res.data);
      } catch (err: any) {
         setError("Error al consultar quejas: " + err?.response?.data?.error || err.message);
      }
   };

   return (
      <Box display="flex" flexDirection="column" gap={2} mx="auto">
         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl fullWidth sx={{ flex: 2 }}>
               <InputLabel>Mes</InputLabel>
               <Select size="small" value={mes} label="Mes" onChange={(e) => setMes(e.target.value)}>
                  {meses.map((m, index) => {
                     const esAnioActual = anio === new Date().getFullYear();
                     const esMesFuturo = index + 1 > new Date().getMonth() + 1;
                     return (
                        <MenuItem key={m} value={m} disabled={esAnioActual && esMesFuturo}>
                           {m}
                        </MenuItem>
                     );
                  })}
               </Select>
            </FormControl>

            <FormControl fullWidth sx={{ flex: 2 }}>
               <InputLabel>Año</InputLabel>
               <Select size="small" value={anio} label="Año" onChange={(e) => setAnio(Number(e.target.value))}>
                  {años.map((a) => (
                     <MenuItem key={a} value={a} disabled={a > new Date().getFullYear()}>
                        {a}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Button variant="contained" onClick={handleConsultar} sx={{ bgcolor: "#305e58ff", flex: 1 }}>
               Consultar
            </Button>
         </Box>

         {error && <Alert severity="error">{error}</Alert>}
      </Box>
   );
};

export default ComplaintConsult;
