import { useNavigate } from "react-router";
import { Calendar, FileText, Video, Clock, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export function Dashboard() {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. María González",
      specialty: "Medicina General",
      date: "15 Mayo 2026",
      time: "10:00 AM",
      type: "Video consulta",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Ramírez",
      specialty: "Cardiología",
      date: "20 Mayo 2026",
      time: "3:00 PM",
      type: "Presencial",
    },
  ];

  const quickActions = [
    {
      icon: Calendar,
      label: "Agendar Cita",
      description: "Reserva una nueva consulta",
      color: "bg-primary",
      onClick: () => navigate("/app/book-appointment"),
    },
    {
      icon: FileText,
      label: "Mis Recetas",
      description: "Ver recetas médicas",
      color: "bg-secondary",
      onClick: () => navigate("/app/prescriptions"),
    },
    {
      icon: Clock,
      label: "Mis Citas",
      description: "Ver todas las citas",
      color: "bg-accent",
      textColor: "text-accent-foreground",
      onClick: () => navigate("/app/appointments"),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Bienvenido</h1>
        <p className="text-muted-foreground">¿Cómo podemos ayudarte hoy?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Card
            key={action.label}
            interactive
            onClick={action.onClick}
            className="text-center"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 ${action.color} ${action.textColor || 'text-white'} rounded-2xl mb-4`}>
              <action.icon size={32} strokeWidth={2.5} />
            </div>
            <h3 className="mb-2">{action.label}</h3>
            <p className="text-muted-foreground">{action.description}</p>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2>Próximas Citas</h2>
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate("/app/appointments")}
          >
            Ver todas
          </Button>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Video size={32} className="text-primary" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">{appointment.doctor}</h3>
                    <p className="text-muted-foreground mb-3">{appointment.specialty}</p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={20} />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="default">
                    Unirse
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <AlertCircle size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">No tienes citas próximas</p>
            <Button onClick={() => navigate("/app/book-appointment")}>
              Agendar una cita
            </Button>
          </Card>
        )}
      </div>

      <Card className="bg-accent border-accent">
        <CardHeader>
          <CardTitle>Recordatorio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Recuerda tomar tus medicamentos según las indicaciones de tu médico.
          </p>
          <Button variant="outline" onClick={() => navigate("/app/prescriptions")}>
            Ver mis recetas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
