import api from "./api";

export const obtenerMisCitas = async () => {
  const response = await api.get("/citas/mis-citas");
  return response.data.data;
};

export const cancelarCita = async (id: string) => {

  const response = await api.put(
    `/citas/${id}`,
    {
      estado: "CANCELADA",
    }
  );

  return response.data;

};

export const crearCita = async (
  data: any
) => {

  const response =
    await api.post(
      "/citas",
      data
    );

  return response.data.data;

};

export const obtenerHorariosDisponibles = async (
  medicoId: string,
  fecha: string
) => {

  const response = await api.get(
    "/citas/disponibles",
    {
      params: {
        medicoId,
        fecha,
      },
    }
  );

  return response.data.data;

};