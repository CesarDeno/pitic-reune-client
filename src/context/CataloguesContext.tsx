import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type CatalogueContextType = {
   mediosRecepcion: any[];
   nivelesAtencion: any[];
   productos: any[];
};

export const CataloguesContext = createContext<CatalogueContextType>({
   mediosRecepcion: [],
   nivelesAtencion: [],
   productos: [],
});

export const useCatalogues = () => useContext(CataloguesContext);

export const CataloguesProvider = ({ children }) => {
   const [mediosRecepcion, setMediosRecepcion] = useState([]);
   const [nivelesAtencion, setNivelesAtencion] = useState([]);
   const [productos, setProductos] = useState([]);

   useEffect(() => {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) return;

      const headers = { Authorization: token };

      const fetchData = async () => {
         try {
            const [medios, niveles, prods] = await Promise.all([
               axios.get(`${process.env.REACT_APP_API_URL_TEST}/catalogos/medio-recepcion`, { headers }),
               axios.get(`${process.env.REACT_APP_API_URL_TEST}/catalogos/niveles-atencion`, { headers }),
               axios.get(`${process.env.REACT_APP_API_URL_TEST}/catalogos/products-list`, { headers }),
            ]);

            setMediosRecepcion(medios.data);
            setNivelesAtencion(niveles.data);
            setProductos(prods.data);
         } catch (error) {
            console.error("Error cargando catálogos", error);
         }
      };

      fetchData();
   }, []);

   return (
      <CataloguesContext.Provider
         value={{
            mediosRecepcion,
            nivelesAtencion,
            productos,
         }}
      >
         {children}
      </CataloguesContext.Provider>
   );
};
