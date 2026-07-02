import api  from "./api";

export const obtenerPerfil = async () => {

    const response = await api.get(
        "/usuarios/perfil"
    );

    return response.data.data;

};

export const actualizarPerfil = async (
  data: any
) => {

  const response = await api.put(
    "/usuarios/perfil",
    data
  );

  return response.data.data;

};

export const cambiarPassword = async (data: {
  passwordActual: string;
  passwordNueva: string;
}) => {

  const response = await api.put(
    "/usuarios/password",
    data
  );

  return response.data;

};