import { TextField, Button, Stack, Alert, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const fieldLabels = {
   QuejasDenominacion: "Denominación o razón social",
   QuejasSector: "Sector",
   QuejasNoMes: "Mes a informar",
   QuejasNum: "Número de quejas",
   QuejasFolio: "Número de folio",
   QuejasFecRecepcion: "Fecha de la queja",
   QuejasMedio: "Medio de recepción o canal",
   QuejasNivelAT: "Nivel de atención o contacto",
   QuejasProducto: "Producto y/o Servicio",
   QuejasCausa: "Causa de la queja",
   QuejasPORI: "PORI",
   QuejasEstatus: "Estado",
   QuejasEstados: "Entidad Federativa",
   QuejasMunId: "Municipio o Alcaldía",
   QuejasLocId: "Localidad",
   QuejasColId: "Colonia",
   QuejasCP: "Código Postal",
   QuejasTipoPersona: "Tipo de persona",
   QuejasSexo: "Sexo",
   QuejasEdad: "Edad",
   QuejasFecResolucion: "Fecha de resolución",
   QuejasFecNotificacion: "Fecha de notificación",
   QuejasRespuesta: "Sentido de la resolución",
   QuejasNumPenal: "Número de penalización",
   QuejasPenalizacion: "Tipo de penalización",
};

const Form = () => {
   const { control, handleSubmit } = useForm();
   const [error, setError] = useState("");

   const onSubmit = async (data: any) => {
      console.log("Datos del formulario:", data);
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) return;
      const headers = { Authorization: token };
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/redeco/quejas`, { headers });
      } catch (err) {
         setError("Error al enviar queja: " + err?.response?.data?.error || err.message);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Stack spacing={2}>
            <Box
               sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
               }}
            >
               {Object.entries(fieldLabels).map(([name, label], index) => (
                  <Box
                     key={name}
                     sx={{
                        flex: "1 1 45%",
                        minWidth: "250px",
                     }}
                  >
                     <Controller
                        name={name}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                           <TextField {...field} label={label} fullWidth variant="outlined" size="small" />
                        )}
                     />
                  </Box>
               ))}
            </Box>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#305e58ff" }}>
               Enviar
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
         </Stack>
      </form>
   );
};

export default Form;
