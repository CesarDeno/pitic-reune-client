import { Alert, Stack } from "@mui/material";
import { useCatalogues } from "../context/CataloguesContext";

const Catalogues = () => {
   const { mediosRecepcion, nivelesAtencion, productos } = useCatalogues();

   const catalogos = [
      { data: mediosRecepcion, label: "Medios de recepción" },
      { data: nivelesAtencion, label: "Niveles de atención" },
      { data: productos, label: "Productos" },
   ];

   return (
      <Stack spacing={2}>
         <h2>Catálogos cargados</h2>
         {catalogos.map(({ data, label }) => (
            <Alert key={label} severity={data.length > 0 ? "success" : "error"}>
               {data.length > 0 ? `${label} cargados` : `No se pudo cargar ${label.toLowerCase()}`}
            </Alert>
         ))}
      </Stack>
   );
};

export default Catalogues;
