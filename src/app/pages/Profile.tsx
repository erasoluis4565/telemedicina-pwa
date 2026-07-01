import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Bell, HelpCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { useEffect, useState } from "react";
import { obtenerPerfil } from "../../services/usuario.service";

export function Profile() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const cargarPerfil = async () => {

    try {

      const usuario = await obtenerPerfil();

      setUserInfo(usuario);

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false);
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
          <p className="text-muted-foreground">Información personal y configuración</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
            <User size={56} className="text-primary" strokeWidth={2.5} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="mb-2">{userInfo.nombre} {userInfo.apellido}</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail size={20} />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone size={20} />
                <span>{userInfo.telefono}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar size={20} />
                <span>{new Date(
                  userInfo.fechaNacimiento
                ).toLocaleDateString("es-ES")}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="default">
            <Edit size={24} />
            Editar
          </Button>
        </div>
      </Card>

      <div>
        <h2 className="mb-6">Configuración</h2>
        <div className="space-y-4">
          {settings.map((setting) => (
            <Card key={setting.label} interactive>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-accent rounded-2xl flex items-center justify-center">
                  <setting.icon size={28} className="text-primary" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{setting.label}</h3>
                  <p className="text-muted-foreground">{setting.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
