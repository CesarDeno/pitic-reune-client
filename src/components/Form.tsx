import { TextField, Button, Stack, Alert, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import { API_URL_TEST } from "../const/api_urls";
import { useCatalogues } from "../context/CataloguesContext";

const Form = () => {
   const {
      mediosRecepcion,
      nivelesAtencion,
      productos,
      estados,
      causas,
      postalCodes,
      municipalities,
      neighborhoods,
      fetchCausas,
      fetchMunicipalities,
      fetchNeighborhoods,
   } = useCatalogues();

   const mapOptions = (arr) => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item) => {
         const [id, label] = Object.values(item);
         return { id, label };
      });
   };

   const getFirstId = (arr) => (arr?.length ? Object.values(arr[0])[0] : null);

   useEffect(() => {
      fetchCausas(getFirstId(productos) as string);
      fetchMunicipalities("26", "83000");
      fetchNeighborhoods("83000");
   }, []);

   const fieldConfig = useMemo(
      () => ({
         QuejasDenominacion: {
            label: "Denominación o razón social",
            type: "string",
            options: [],
            default: "Pitic Capital, S.A.P.I. de C.V., SOFOM, E.N.R.",
            onChange: () => {},
         },
         QuejasSector: {
            label: "Sector",
            type: "string",
            options: [],
            default: "Sociedades Financieras de Objeto Múltiple E.N.R.",
            onChange: () => {},
         },
         QuejasNoMes: {
            label: "Mes a informar",
            type: "select",
            options: Array.from({ length: 12 }, (_, i) => ({
               id: i + 1,
               label: new Date(0, i).toLocaleString("es-MX", { month: "long" }).replace(/^./, (c) => c.toUpperCase()),
            })),
            default: 1,
            onChange: () => {},
         },

         QuejasNum: { label: "Número de quejas", type: "number", options: [], default: 1, onChange: () => {} },
         QuejasFolio: { label: "Número de folio", type: "string", options: [], default: "", onChange: () => {} },
         QuejasFecRecepcion: {
            label: "Fecha de la queja",
            type: "date",
            options: [],
            default: new Date(),
            onChange: () => {},
         },
         QuejasMedio: {
            label: "Medio de recepción o canal",
            type: "select",
            options: mapOptions(mediosRecepcion),
            default: getFirstId(mediosRecepcion),
            onChange: () => {},
         },
         QuejasNivelAT: {
            label: "Nivel de atención",
            type: "select",
            options: mapOptions(nivelesAtencion),
            default: getFirstId(nivelesAtencion),
            onChange: () => {},
         },
         QuejasProducto: {
            label: "Producto y/o Servicio",
            type: "select",
            options: mapOptions(productos),
            default: getFirstId(productos),
            onChange: (value) => {
               fetchCausas(value);
            },
         },
         QuejasCausa: {
            label: "Causa de la queja",
            type: "select",
            options: mapOptions(causas),
            default: getFirstId(causas),
            onChange: () => {},
         },
         QuejasPORI: {
            label: "PORI",
            type: "select",
            options: [
               { id: "SI", label: "Sí" },
               { id: "NO", label: "No" },
            ],
            default: "SI",
            onChange: () => {},
         },
         QuejasEstatus: {
            label: "Estado",
            type: "select",
            options: [
               { id: 1, label: "Pendiente" },
               { id: 2, label: "Concluido" },
            ],
            default: 1,
            onChange: () => {},
         },
         QuejasEstados: {
            label: "Entidad Federativa",
            type: "select",
            options: mapOptions(estados),
            default: 26,
            onChange: () => {},
         },
         QuejasMunId: {
            label: "Municipio o Alcaldía",
            type: "select",
            options: mapOptions(municipalities),
            default: 30,
            onChange: () => {},
         },
         QuejasLocId: { label: "Localidad", type: "string", options: [], default: null, onChange: () => {} },
         QuejasColId: {
            label: "Colonia",
            type: "select",
            options: mapOptions(neighborhoods),
            default: getFirstId(neighborhoods),
            onChange: () => {},
         },
         QuejasCP: {
            label: "Código Postal",
            type: "string",
            options: [],
            default: 83000,
            onChange: (value) => {
               fetchNeighborhoods(value);
            },
         },
         QuejasTipoPersona: {
            label: "Tipo de persona",
            type: "select",
            options: [
               { id: 1, label: "Física" },
               { id: 2, label: "Moral" },
            ],
            default: 1,
            onChange: () => {},
         },
         QuejasSexo: {
            label: "Sexo",
            type: "select",
            options: [
               { id: "H", label: "Hombre" },
               { id: "M", label: "Mujer" },
            ],
            default: "H",
            onChange: () => {},
         },
         QuejasEdad: { label: "Edad", type: "number", options: [], default: 0, onChange: () => {} },
         QuejasFecResolucion: {
            label: "Fecha de resolución",
            type: "date",
            options: [],
            default: new Date(),
            onChange: () => {},
         },
         QuejasFecNotificacion: {
            label: "Fecha de notificación",
            type: "date",
            options: [],
            default: new Date(),
            onChange: () => {},
         },
         QuejasRespuesta: {
            label: "Sentido de la resolución",
            type: "select",
            options: [
               { id: 1, label: "Totalmente favorable al usuario" },
               { id: 2, label: "Desfavorable al Usuario" },
               { id: 3, label: "Parcialmente favorable al usuario" },
               { id: null, label: "N/A" },
            ],
            default: 1,
            onChange: () => {},
         },
         QuejasNumPenal: {
            label: "Número de penalización",
            type: "number",
            options: [],
            default: 0,
            onChange: () => {},
         },
         QuejasPenalizacion: {
            label: "Tipo de penalización",
            type: "select",
            options: [
               { id: 1, label: "Contractuales - Cancelación del contrato" },
               { id: 2, label: "Contractuales - Reasignación de cartera" },
               { id: 3, label: "Económicas - Multa" },
            ],
            default: 1,
            onChange: () => {},
         },
      }),
      [causas, postalCodes, municipalities, neighborhoods]
   );

   const defaultValues = Object.fromEntries(Object.entries(fieldConfig).map(([key, config]) => [key, config.default]));

   const { control, handleSubmit } = useForm({ defaultValues });

   const [error, setError] = useState("");

   const formatToDDMMYY = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear())
      return `${day}/${month}/${year}`;
   };

   const onSubmit = async (data: any) => {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) return;
      const headers = { Authorization: token };

      try {
         const formattedData = {
            ...data,
            QuejasFecNotificacion: data.QuejasFecNotificacion ? formatToDDMMYY(data.QuejasFecNotificacion) : null,
            QuejasFecRecepcion: data.QuejasFecRecepcion ? formatToDDMMYY(data.QuejasFecRecepcion) : null,
            QuejasFecResolucion: data.QuejasFecResolucion ? formatToDDMMYY(data.QuejasFecResolucion) : null,
         };

         console.log({ formattedData });

         await axios.post(`${API_URL_TEST}/reune/quejas`, formattedData, { headers });
      } catch (err) {
         setError("Error al enviar queja: " + (err?.response?.data?.error || err.message));
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
                                          value={(field.value as Date) || null}
                                          onChange={(date) => field.onChange(date)}
                                          slotProps={{ textField: { size: "small", fullWidth: true } }}
                                          minDate={new Date("2000-01-01")}
                                          maxDate={new Date()}
                                       />
                                    );
                                 case "select":
                                    return (
                                       <FormControl fullWidth>
                                          <InputLabel>{config.label}</InputLabel>
                                          <Controller
                                             name={name}
                                             control={control}
                                             render={({ field }) => (
                                                <Select
                                                   {...field}
                                                   label={fieldConfig[name].label}
                                                   size="small"
                                                   onChange={(e) => {
                                                      field.onChange(e);
                                                      fieldConfig[name]?.onChange?.(e.target.value);
                                                   }}
                                                   MenuProps={{
                                                      PaperProps: {
                                                         style: {
                                                            maxHeight: 300,
                                                            overflow: "auto",
                                                            whiteSpace: "normal",
                                                            wordBreak: "break-word",
                                                         },
                                                      },
                                                   }}
                                                >
                                                   {fieldConfig[name].options.map((option) => (
                                                      <MenuItem key={option.id} value={option.id}>
                                                         {option.label}
                                                      </MenuItem>
                                                   ))}
                                                </Select>
                                             )}
                                          />
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
                                          onChange={(e) => {
                                             field.onChange(e);
                                             config.onChange?.(e.target.value);
                                          }}
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
