import { Alert, Stack } from "@mui/material";
import { useCatalogues } from "../context/CataloguesContext";
import { useMemo } from "react";
import { TableComponent } from "./Common/TableComponent";

const Catalogues = () => {
   const { mediosRecepcion, nivelesAtencion, productos, estados } = useCatalogues();

   const catalogos = useMemo(
      () => [
         { data: mediosRecepcion, label: "Medios de recepción" },
         { data: nivelesAtencion, label: "Niveles de atención" },
         { data: productos, label: "Productos" },
         { data: estados, label: "Estados" },
      ],
      [mediosRecepcion, nivelesAtencion, productos, estados]
   );

   return (
      <Stack spacing={2}>
         <h2>Catálogos cargados</h2>
         {catalogos.map(({ data, label }) => (
            <Stack key={label} spacing={2}>
               <Alert
                  severity={Array.isArray(Object.values(data)) && Object.values(data).length > 0 ? "success" : "error"}
               >
                  {Object.values(data)?.length || 0}{" "}
                  {Object.values(data)?.length > 0 ? `${label} cargados` : `No se pudo cargar ${label.toLowerCase()}`}
               </Alert>
               <TableComponent data={data} label={label} />
            </Stack>
         ))}
      </Stack>
   );
};

export default Catalogues;
