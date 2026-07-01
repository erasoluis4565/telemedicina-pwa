import api from "./api";

export const obtenerMedicos = async () => {

  const response =
    await api.get("/medicos");

  return response.data.data;

};