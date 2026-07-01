import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import { Button } from "../components/Button";
import { Card } from "../components/Card";
import {
  obtenerMisCitas,
  cancelarCita,
} from "../../services/cita.service";

export function Appointments() {

  const [appointments, setAppointments] = useState<any[]>([]);

  const [activeTab, setActiveTab] =
    useState<"upcoming" | "completed">(
      "upcoming"
    );

  useEffect(() => {

    const cargarCitas = async () => {

      try {

        const citas =
          await obtenerMisCitas();

        setAppointments(citas);

      } catch (error) {

        console.error(error);

      }

    };

    cargarCitas();

  }, []);

  const handleCancel = async (
  id: string
  ) => {

    const confirmar = window.confirm(
    "¿Deseas cancelar esta cita?"
    );

    if (!confirmar) return;

    try {

      await cancelarCita(id);

      const citas =
        await obtenerMisCitas();

      setAppointments(citas);

      alert(
        "Cita cancelada correctamente."
      );

    } catch (error) {

      console.error(error);

      alert(
      "No fue posible cancelar la cita."
      );

   }

  };

  const filteredAppointments =
    appointments.filter((apt) => {

      if (activeTab === "upcoming") {

        return (
          apt.estado === "PENDIENTE" ||
          apt.estado === "CONFIRMADA"
        );

      }

      return apt.estado === "COMPLETADA";

    });

  return (

    <div className="space-y-8 max-w-4xl mx-auto">

      <div>

        <h1 className="mb-2">
          Mis Citas
        </h1>

        <p className="text-muted-foreground">
          Gestiona tus consultas médicas
        </p>

      </div>

      <div className="flex gap-4 border-b-2 border-border pb-1">

        <button
          onClick={() =>
            setActiveTab("upcoming")
          }
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
          onClick={() =>
            setActiveTab("completed")
          }
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

            <Card key={appointment._id}>

              <div className="space-y-4">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4 flex-1">

                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">

                      {appointment.tipoConsulta ===
                      "VIRTUAL" ? (

                        <Video
                          size={32}
                          className="text-primary"
                        />

                      ) : (

                        <MapPin
                          size={32}
                          className="text-secondary"
                        />

                      )}

                    </div>

                    <div className="flex-1">

                      <h3 className="mb-1">

                        Dr.{" "}
                        {
                          appointment
                            .medicoId
                            ?.usuarioId
                            ?.nombre
                        }{" "}
                        {
                          appointment
                            .medicoId
                            ?.usuarioId
                            ?.apellido
                        }

                      </h3>

                      <p className="text-muted-foreground mb-3">

                        {
                          appointment
                            .medicoId
                            ?.especialidad
                        }

                      </p>

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-muted-foreground">

                          <Calendar size={20} />

                          <span>

                            {new Date(
                              appointment.fecha
                            ).toLocaleDateString(
                              "es-EC"
                            )}

                          </span>

                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                          <Clock size={20} />

                          <span>

                            {appointment.hora}

                          </span>

                        </div>

                        <div className="flex items-center gap-2">

                          <strong>
                            Motivo:
                          </strong>

                          <span>
                            {
                              appointment.motivo
                            }
                          </span>

                        </div>

                        <div>

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium
                            ${
                              appointment.estado ===
                              "PENDIENTE"
                                ? "bg-yellow-100 text-yellow-700"
                                : appointment.estado ===
                                  "CONFIRMADA"
                                ? "bg-blue-100 text-blue-700"
                                : appointment.estado ===
                                  "COMPLETADA"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            {
                              appointment.estado
                            }

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {activeTab ===
                  "upcoming" && (

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-border">

                    {appointment.tipoConsulta ===
                    "VIRTUAL" ? (

                      <Button
                        variant="primary"
                        className="flex-1"
                      >

                        <Video
                          size={22}
                        />

                        Unirse a videollamada

                      </Button>

                    ) : (

                      <Button
                        variant="secondary"
                        className="flex-1"
                      >

                        <Phone
                          size={22}
                        />

                        Llamar a clínica

                      </Button>

                    )}

                    <Button
                      variant="outline"
                      onClick={() =>
                        handleCancel(
                          appointment._id
                        )
                      }
                    >

                      <X
                        size={22}
                      />

                      Cancelar

                    </Button>

                  </div>

                )}

              </div>

            </Card>

          ))

        ) : (

          <Card className="text-center py-12">

            <Calendar
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />

            <p className="text-muted-foreground">

              {activeTab ===
              "upcoming"
                ? "No tienes citas próximas"
                : "No hay citas completadas"}

            </p>

          </Card>

        )}

      </div>

    </div>

  );

}