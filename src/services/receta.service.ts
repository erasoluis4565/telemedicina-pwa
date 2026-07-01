import api from "./api";

export const obtenerMisRecetas = async () => {

  const response = await api.get(
    "/recetas/mis-recetas"
  );

  return response.data.data;

};