import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import {
  Calendar,
  FileText,
  Video,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Button } from "../components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/Card";

import { obtenerUsuario } from "../../utils/auth";
import { obtenerMisCitas } from "../../services/cita.service";

export function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();
  const usuario = obtenerUsuario();

  const [upcomingAppointments, setUpcomingAppointments] =
    useState<any[]>([]);

  const cargarCitas = async () => {

    try {

      const citas = await obtenerMisCitas();

      const proximas = citas.filter((cita: any) =>
        cita.estado !== "CANCELADA" &&
        cita.estado !== "COMPLETADA"
      );

      setUpcomingAppointments(proximas);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    cargarCitas();

  }, []);

  useEffect(() => {

    cargarCitas();

  }, [location.pathname]);

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
        <h1 className="mb-2">
          Bienvenido, {usuario?.nombre}
        </h1>

        <p className="text-muted-foreground">
          Nos alegra verte nuevamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (

          <Card
            key={action.label}
            interactive
            onClick={action.onClick}
            className="text-center"
          >

            <div
              className={`inline-flex items-center justify-center w-16 h-16 ${action.color} ${action.textColor || "text-white"} rounded-2xl mb-4`}
            >
              <action.icon
                size={32}
                strokeWidth={2.5}
              />
            </div>

            <h3 className="mb-2">
              {action.label}
            </h3>

            <p className="text-muted-foreground">
              {action.description}
            </p>

          </Card>

        ))}
      </div>

      <div>

        <div className="flex items-center justify-between mb-6">

          <h2>Próximas Citas</h2>

          <Button
            variant="ghost"
            onClick={() =>
              navigate("/app/appointments")
            }
          >
            Ver todas
          </Button>

        </div>

        {upcomingAppointments.length > 0 ? (

          <div className="space-y-4">

            {upcomingAppointments.map((appointment) => (

              <Card key={appointment._id}>

                <div className="flex items-start gap-4">

                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Video
                      size={32}
                      className="text-primary"
                    />
                  </div>

                  <div className="flex-1">

                    <h3 className="mb-1">
                      Dr.{" "}
                      {appointment.medicoId?.usuarioId?.nombre}{" "}
                      {appointment.medicoId?.usuarioId?.apellido}
                    </h3>

                    <p className="text-muted-foreground mb-2">
                      {appointment.medicoId?.especialidad}
                    </p>

                    <p className="mb-3">
                      <strong>Motivo:</strong>{" "}
                      {appointment.motivo}
                    </p>

                    <div className="flex flex-wrap gap-4 text-muted-foreground">

                      <div className="flex items-center gap-2">
                        <Calendar size={18} />

                        <span>
                          {new Date(
                            appointment.fecha
                          ).toLocaleDateString("es-EC")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={18} />

                        <span>
                          {appointment.hora}
                        </span>
                      </div>

                    </div>

                  </div>

                  <Button
                    variant="primary"
                    size="default"
                  >
                    Ver
                  </Button>

                </div>

              </Card>

            ))}

          </div>

        ) : (

          <Card className="text-center py-12">

            <AlertCircle
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />

            <p className="text-muted-foreground mb-6">
              No tienes citas registradas.
            </p>

            <Button
              onClick={() =>
                navigate("/app/book-appointment")
              }
            >
              Agendar una cita
            </Button>

          </Card>

        )}

      </div>

      <Card className="bg-accent border-accent">

        <CardHeader>
          <CardTitle>
            Recordatorio
          </CardTitle>
        </CardHeader>

        <CardContent>

          <p className="text-muted-foreground mb-4">
            Recuerda tomar tus medicamentos según las indicaciones de tu médico.
          </p>

          <Button
            variant="outline"
            onClick={() =>
              navigate("/app/prescriptions")
            }
          >
            Ver mis recetas
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}
