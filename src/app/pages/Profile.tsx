import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Bell, HelpCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { useEffect, useState } from "react";
import { obtenerPerfil, actualizarPerfil, cambiarPassword, } from "../../services/usuario.service";
import { Input } from "../components/Input";

export function Profile() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editando, setEditando] =
    useState(false);

  const [formData, setFormData] =
    useState({

      nombre: "",

      apellido: "",

      telefono: "",

      fechaNacimiento: "",

    });

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const [passwordData, setPasswordData] =
    useState({
      passwordActual: "",
      passwordNueva: "",
      confirmarPassword: "",
    });

  const cargarPerfil = async () => {

    try {

      const usuario = await obtenerPerfil();

      setUserInfo(usuario);

      setFormData({

        nombre: usuario.nombre,

        apellido: usuario.apellido,

        telefono: usuario.telefono,

        fechaNacimiento: usuario.fechaNacimiento
          ? usuario.fechaNacimiento.substring(0, 10)
          : "",

      });

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false);
    }

  };

  const guardarPerfil = async () => {

    try {

      const usuarioActualizado =
        await actualizarPerfil(formData);

      setUserInfo(usuarioActualizado);

      setFormData({
        nombre: usuarioActualizado.nombre,
        apellido: usuarioActualizado.apellido,
        telefono: usuarioActualizado.telefono,
        fechaNacimiento: usuarioActualizado.fechaNacimiento
          ? usuarioActualizado.fechaNacimiento.substring(0, 10)
          : "",
      });

      setEditando(false);

      alert(
        "Perfil actualizado correctamente."
      );

    } catch (error) {

      console.error(error);

      alert(
        "No fue posible actualizar el perfil."
      );

    }

  };

  const guardarPassword = async () => {

    if (
      passwordData.passwordNueva !==
      passwordData.confirmarPassword
    ) {

      alert("Las contraseñas no coinciden.");

      return;

    }

    try {

      await cambiarPassword({

        passwordActual:
          passwordData.passwordActual,

        passwordNueva:
          passwordData.passwordNueva,

      });

      alert(
        "Contraseña actualizada correctamente."
      );

      setMostrarPassword(false);

      setPasswordData({
        passwordActual: "",
        passwordNueva: "",
        confirmarPassword: "",
      });

    } catch (error: any) {

      alert(

        error.response?.data?.mensaje ??

        "No fue posible actualizar la contraseña."

      );

    }

  };

  useEffect(() => {

    cargarPerfil();

  }, []);

  if (!userInfo) {

    return null;

  }

  const settings = [
    { icon: Bell, label: "Notificaciones", description: "Gestionar alertas y recordatorios" },
    { icon: Shield, label: "Privacidad y Seguridad", description: "Configurar datos privados" },
    { icon: HelpCircle, label: "Ayuda y Soporte", description: "Preguntas frecuentes" },
  ];

  if (loading) {

    return (

      <div className="flex justify-center items-center py-20">

        <p className="text-muted-foreground">
          Cargando perfil...
        </p>

      </div>

    );

  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Información personal y configuración
          </p>
        </div>
      </div>

      <Card>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
            <User
              size={56}
              className="text-primary"
              strokeWidth={2.5}
            />
          </div>

          <div className="flex-1 text-center sm:text-left">

            {editando ? (

              <div className="space-y-3 mb-4">

                <Input
                  label="Nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nombre: e.target.value,
                    })
                  }
                />

                <Input
                  label="Apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apellido: e.target.value,
                    })
                  }
                />

              </div>

            ) : (

              <h2 className="mb-2">
                {userInfo.nombre} {userInfo.apellido}
              </h2>

            )}

            <div className="space-y-4 text-muted-foreground">

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail size={20} />
                <span>{userInfo.email}</span>
              </div>

              {editando ? (

                <Input
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefono: e.target.value,
                    })
                  }
                />

              ) : (

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone size={20} />
                  <span>{userInfo.telefono}</span>
                </div>

              )}

              {editando ? (

                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fechaNacimiento: e.target.value,
                    })
                  }
                />

              ) : (

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Calendar size={20} />
                  <span>
                    {new Date(
                      userInfo.fechaNacimiento
                    ).toLocaleDateString("es-ES")}
                  </span>
                </div>

              )}

            </div>

          </div>

          <div className="flex flex-col gap-3">

            <Button
              variant="outline"
              size="default"
              onClick={() => {

                if (editando) {

                  guardarPerfil();

                } else {

                  setEditando(true);

                }

              }}
            >
              <Edit size={20} />
              {editando ? "Guardar" : "Editar"}
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }
            >
              Cambiar contraseña
            </Button>

          </div>

        </div>

      </Card>

      {mostrarPassword && (

        <Card>

          <div className="space-y-4">

            <h2>Cambiar contraseña</h2>

            <Input
              label="Contraseña actual"
              type="password"
              value={passwordData.passwordActual}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  passwordActual: e.target.value,
                })
              }
            />

            <Input
              label="Nueva contraseña"
              type="password"
              value={passwordData.passwordNueva}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  passwordNueva: e.target.value,
                })
              }
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              value={passwordData.confirmarPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmarPassword: e.target.value,
                })
              }
            />

            <Button
              onClick={guardarPassword}
            >
              Guardar contraseña
            </Button>

          </div>

        </Card>

      )}

      <div>

        <h2 className="mb-6">
          Configuración
        </h2>

        <div className="space-y-4">

          {settings.map((setting) => (

            <Card
              key={setting.label}
              interactive
            >

              <div className="flex items-center gap-4">

                <div className="flex-shrink-0 w-14 h-14 bg-accent rounded-2xl flex items-center justify-center">

                  <setting.icon
                    size={28}
                    className="text-primary"
                    strokeWidth={2.5}
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <h3 className="mb-1">
                    {setting.label}
                  </h3>

                  <p className="text-muted-foreground">
                    {setting.description}
                  </p>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>

    </div>
  );
}
