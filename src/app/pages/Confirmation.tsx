import { useLocation, useNavigate } from "react-router";
import { CheckCircle, Calendar, Clock, User, Home, CalendarPlus } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, date, time } = location.state || {};

  if (!doctor || !date || !time) {
    navigate("/app");
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-280px)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary/10 rounded-full mb-4">
            <CheckCircle size={64} className="text-secondary" strokeWidth={2.5} />
          </div>
          <h1 className="text-secondary">¡Cita Confirmada!</h1>
          <p className="text-muted-foreground">
            Tu cita ha sido agendada exitosamente
          </p>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-background/80 rounded-xl">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User size={32} className="text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Médico</p>
                <h3>{doctor.name}</h3>
                <p className="text-muted-foreground">{doctor.specialty}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-background/80 rounded-xl">
                <Calendar size={32} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                <div>
                  <p className="text-muted-foreground mb-1">Fecha</p>
                  <p>{date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-background/80 rounded-xl">
                <Clock size={32} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                <div>
                  <p className="text-muted-foreground mb-1">Hora</p>
                  <p>{time}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-accent rounded-xl">
              <h3 className="mb-3">Recordatorios importantes:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span>Recibirás un recordatorio 24 horas antes de tu cita</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span>Prepara tus preguntas y síntomas para compartir con el médico</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span>Llega 10 minutos antes si es cita presencial</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="xl"
            onClick={() => navigate("/app")}
          >
            <Home size={28} />
            Ir al Inicio
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={() => navigate("/app/book-appointment")}
          >
            <CalendarPlus size={28} />
            Agendar Otra
          </Button>
        </div>
      </div>
    </div>
  );
}
