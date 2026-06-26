import { useState } from "react";
import { Calendar, Clock, Video, MapPin, Phone, X } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. María González",
      specialty: "Medicina General",
      date: "15 Mayo 2026",
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Ramírez",
      specialty: "Cardiología",
      date: "20 Mayo 2026",
      time: "3:00 PM",
      type: "presencial",
      location: "Clínica Central, Consultorio 205",
      status: "upcoming",
    },
    {
      id: 3,
      doctor: "Dra. Ana Martínez",
      specialty: "Geriatría",
      date: "5 Mayo 2026",
      time: "11:00 AM",
      type: "video",
      status: "completed",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");

  const handleCancel = (id: number) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      setAppointments(appointments.filter((apt) => apt.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) => apt.status === activeTab
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="mb-2">Mis Citas</h1>
        <p className="text-muted-foreground">Gestiona tus consultas médicas</p>
      </div>

      <div className="flex gap-4 border-b-2 border-border pb-1">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`
            px-6 py-4 rounded-t-xl transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-primary/30
            ${
              activeTab === "upcoming"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }
          `}
        >
          Próximas
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`
            px-6 py-4 rounded-t-xl transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-primary/30
            ${
              activeTab === "completed"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }
          `}
        >
          Completadas
        </button>
      </div>

      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      {appointment.type === "video" ? (
                        <Video size={32} className="text-primary" strokeWidth={2.5} />
                      ) : (
                        <MapPin size={32} className="text-secondary" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{appointment.doctor}</h3>
                      <p className="text-muted-foreground mb-3">{appointment.specialty}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={20} />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock size={20} />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin size={20} />
                            <span>{appointment.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {appointment.status === "upcoming" && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-border">
                    {appointment.type === "video" && (
                      <Button variant="primary" size="default" className="flex-1">
                        <Video size={24} />
                        Unirse a videollamada
                      </Button>
                    )}
                    {appointment.type === "presencial" && (
                      <Button variant="secondary" size="default" className="flex-1">
                        <Phone size={24} />
                        Llamar a clínica
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => handleCancel(appointment.id)}
                      className="sm:w-auto"
                    >
                      <X size={24} />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <Calendar size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {activeTab === "upcoming"
                ? "No tienes citas próximas"
                : "No hay citas completadas"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
