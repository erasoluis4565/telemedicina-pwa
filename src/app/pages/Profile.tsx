import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Bell, HelpCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export function Profile() {
  const userInfo = {
    name: "Juan Pérez García",
    email: "juan.perez@email.com",
    phone: "+52 55 1234 5678",
    birthDate: "15 de Marzo de 1955",
    address: "Calle Principal #123, Col. Centro, Ciudad de México",
    bloodType: "O+",
    allergies: "Penicilina",
    emergencyContact: {
      name: "María Pérez",
      relation: "Hija",
      phone: "+52 55 8765 4321",
    },
  };

  const settings = [
    { icon: Bell, label: "Notificaciones", description: "Gestionar alertas y recordatorios" },
    { icon: Shield, label: "Privacidad y Seguridad", description: "Configurar datos privados" },
    { icon: HelpCircle, label: "Ayuda y Soporte", description: "Preguntas frecuentes" },
  ];

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
            <h2 className="mb-2">{userInfo.name}</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail size={20} />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone size={20} />
                <span>{userInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar size={20} />
                <span>{userInfo.birthDate}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="default">
            <Edit size={24} />
            Editar
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Médica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-muted-foreground mb-2">Tipo de Sangre</p>
              <p className="text-destructive">{userInfo.bloodType}</p>
            </div>
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-muted-foreground mb-2">Alergias</p>
              <p className="text-destructive">{userInfo.allergies}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dirección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin size={24} className="flex-shrink-0 mt-1" />
            <p>{userInfo.address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contacto de Emergencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground mb-1">Nombre</p>
              <p>{userInfo.emergencyContact.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Relación</p>
              <p>{userInfo.emergencyContact.relation}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Teléfono</p>
              <p className="flex items-center gap-2">
                <Phone size={20} />
                {userInfo.emergencyContact.phone}
              </p>
            </div>
          </div>
        </CardContent>
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
