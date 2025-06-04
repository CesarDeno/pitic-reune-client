import { TextField, Button, Stack, Alert, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { es } from 'date-fns/locale';

const fieldConfig = {
   QuejasDenominacion: { label: "Denominación o razón social", type: "string", options: [] },
   QuejasSector: { label: "Sector", type: "string", options: [] },
   QuejasNoMes: { label: "Mes a informar", type: "number", options: [] },
   QuejasNum: { label: "Número de quejas", type: "number", options: [] },
   QuejasFolio: { label: "Número de folio", type: "string", options: [] },
   QuejasFecRecepcion: { label: "Fecha de la queja", type: "date", options: [] },
   QuejasMedio: {
      label: "Medio de recepción o canal",
      type: "select",
      options: ["Internet", "Presencial", "Teléfono"],
   },
   QuejasNivelAT: { label: "Nivel de atención o contacto", type: "string", options: [] },
   QuejasProducto: { label: "Producto y/o Servicio", type: "string", options: [] },
   QuejasCausa: { label: "Causa de la queja", type: "string", options: [] },
   QuejasPORI: {
      label: "PORI",
      type: "select",
      options: ["Sí", "No"],
   },
   QuejasEstatus: {
      label: "Estado",
      type: "select",
      options: ["Resuelta", "Pendiente"],
   },
   QuejasEstados: { label: "Entidad Federativa", type: "string", options: [] },
   QuejasMunId: { label: "Municipio o Alcaldía", type: "string", options: [] },
   QuejasLocId: { label: "Localidad", type: "string", options: [] },
   QuejasColId: { label: "Colonia", type: "string", options: [] },
   QuejasCP: { label: "Código Postal", type: "string", options: [] },
   QuejasTipoPersona: {
      label: "Tipo de persona",
      type: "select",
      options: ["Física", "Moral"],
   },
   QuejasSexo: {
      label: "Sexo",
      type: "select",
      options: ["Masculino", "Femenino", "Otro"],
   },
   QuejasEdad: { label: "Edad", type: "number", options: [] },
   QuejasFecResolucion: { label: "Fecha de resolución", type: "date", options: [] },
   QuejasFecNotificacion: { label: "Fecha de notificación", type: "date", options: [] },
   QuejasRespuesta: {
      label: "Sentido de la resolución",
      type: "select",
      options: ["Procedente", "Improcedente", "Parcialmente Procedente"],
   },
   QuejasNumPenal: { label: "Número de penalización", type: "number", options: [] },
   QuejasPenalizacion: {
      label: "Tipo de penalización",
      type: "select",
      options: ["Advertencia", "Multa", "Suspensión"],
   },
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
         await axios.post(`${process.env.REACT_APP_API_URL_TEST}/redeco/quejas`, data, {
            headers,
         });
      } catch (err) {
         setError("Error al enviar queja: " + err?.response?.data?.error || err.message);
      }
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
               <Box
                  sx={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 2,
                  }}
               >
                  {Object.entries(fieldConfig).map(([name, config]) => (
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
                           render={({ field }) => {
                              switch (config.type) {
                                 case "date":
                                    return (
                                       <DatePicker
                                          label={config.label}
                                          value={field.value || null}
                                          onChange={(date) => field.onChange(date)}
                                          slotProps={{ textField: { size: "small", fullWidth: true } }}
                                          minDate={new Date("2000-01-01")}
                                          maxDate={new Date()}
                                       />
                                    );
                                 case "select":
                                    return (
                                       <FormControl fullWidth size="small">
                                          <InputLabel>{config.label}</InputLabel>
                                          <Select {...field} label={config.label}>
                                             {config.options?.map((opt) => (
                                                <MenuItem key={opt} value={opt}>
                                                   {opt}
                                                </MenuItem>
                                             ))}
                                          </Select>
                                       </FormControl>
                                    );
                                 default:
                                    return (
                                       <TextField
                                          {...field}
                                          type={config.type === "number" ? "number" : "text"}
                                          label={config.label}
                                          fullWidth
                                          variant="outlined"
                                          size="small"
                                       />
                                    );
                              }
                           }}
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
      </LocalizationProvider>
   );
};

export default Form;
