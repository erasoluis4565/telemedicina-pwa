import api  from "./api";

export const obtenerPerfil = async () => {

    const response = await api.get(
        "/usuarios/perfil"
    );

    return response.data.data;

};