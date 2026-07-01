export const TOKEN_KEY = "token";
export const USER_KEY = "usuario";

export const guardarSesion = (
  token: string,
  usuario: any
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(usuario)
  );
};

export const obtenerToken = () => {
  return localStorage.getItem(
    TOKEN_KEY
  );
};

export const obtenerUsuario = () => {

  const usuario =
    localStorage.getItem(USER_KEY);

  return usuario
    ? JSON.parse(usuario)
    : null;

};

export const cerrarSesion = () => {

  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(USER_KEY);

};

export const estaAutenticado = () => {
  return !!obtenerToken();
};