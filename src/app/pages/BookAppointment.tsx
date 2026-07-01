import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { obtenerMedicos } from "../../services/medico.service";
import { crearCita } from "../../services/cita.service";
import { obtenerHorariosDisponibles } from "../../services/cita.service";


export function BookAppointment() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [motivo, setMotivo] = useState("");

  

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {

    const cargarMedicos = async () => {

      try {

        const respuesta =
          await obtenerMedicos();

        setDoctors(respuesta);

      } catch (error) {

        console.error(error);

      }

    };

    cargarMedicos();

  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  useEffect(() => {

    const cargarMedicos = async () => {

      try {

        const medicos =
          await obtenerMedicos();

        setDoctors(medicos);

      } catch (error) {

      console.error(error);

      }

    };

    cargarMedicos();

  }, []);

  useEffect(() => {

    const cargarHorarios = async () => {

      if (!selectedDoctor || !selectedDate)
        return;

      try {

       const fecha =
        selectedDate
          .toISOString()
          .split("T")[0];

        const horarios =
          await obtenerHorariosDisponibles(
            String(selectedDoctor),
            fecha
        );

        console.log(
          "Horarios:",
          horarios
        );

        setAvailableTimes(
          horarios
        );

      } catch (error) {
        
        console.error(error);

      }

    };

    cargarHorarios();

  }, [
    selectedDoctor,
    selectedDate,
  ]);

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

  const esFechaPasada = (fecha: Date) => {
    const comparar = new Date(fecha);
    comparar.setHours(0, 0, 0, 0);

    return comparar < hoy;
  };

  const handleConfirm = async () => {

    if (
      !selectedDoctor ||
      !selectedDate ||
      !selectedTime
    ) return;

    try {

      await crearCita({

        medicoId: selectedDoctor,

        fecha: selectedDate
          .toISOString()
          .split("T")[0],

        hora: selectedTime,

        motivo,

      });

      alert(
        "Cita agendada correctamente."
      );

      navigate("/app/appointments");

    } catch (error: any) {

      alert(

        error.response?.data?.mensaje ??

        "No fue posible agendar la cita."

      );

    }

  };

  const isFormComplete = selectedDate && selectedTime && selectedDoctor && motivo.trim();
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="mb-2">Agendar Cita</h1>
        <p className="text-muted-foreground">Selecciona tu médico, fecha y hora</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selecciona un médico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doctor) => (
              <button
                key={doctor._id}
                onClick={() => setSelectedDoctor(doctor._id)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-200 text-left
                  focus:outline-none focus:ring-4 focus:ring-primary/30
                  ${
                    selectedDoctor === doctor._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">Dr. {doctor.usuarioId.nombre} {doctor.usuarioId.apellido}</h3>
                    <p className="text-muted-foreground">{doctor.especialidad}</p>
                  </div>
                  {selectedDoctor === doctor._id && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Check size={20} className="text-primary-foreground" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>

      </Card>
        <Card>
          <CardHeader>
            <CardTitle>
               Motivo de la consulta
            </CardTitle>
         </CardHeader>

         <CardContent>
            <textarea
              value={motivo}
              onChange={(e) =>
              setMotivo(e.target.value)
              }
              placeholder="Describe brevemente el motivo de tu consulta..."
              className="w-full border rounded-xl p-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selecciona una fecha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="default"
                onClick={handlePreviousMonth}
                aria-label="Mes anterior"
              >
                <ChevronLeft size={28} />
              </Button>
              <h3 className="capitalize">{monthYear}</h3>
              <Button
                variant="ghost"
                size="default"
                onClick={handleNextMonth}
                aria-label="Mes siguiente"
              >
                <ChevronRight size={28} />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="text-center text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day || esFechaPasada(day)}
                  className={`
                    min-h-[56px] rounded-xl transition-all duration-200
                    focus:outline-none focus:ring-4 focus:ring-primary/30
                    ${!day ? "invisible" : ""}
                    ${day && esFechaPasada(day)? "text-muted-foreground/30 cursor-not-allowed": ""}
                    ${
                      day && isSameDay(day, selectedDate)
                        ? "bg-primary text-primary-foreground"
                        : day && !esFechaPasada(day)
                        ? "hover:bg-muted border-2 border-border"
                        : ""
                    }
                  `}
                >
                  {day?.getDate()}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Selecciona una hora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    min-h-[64px] rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-4 focus:ring-primary/30
                    ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }
                  `}
                >
                  <CalendarIcon size={24} className="inline mr-2" />
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="sticky bottom-24 sm:bottom-4 bg-background/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-border">
        <Button
          size="xl"
          className="w-full"
          disabled={!isFormComplete}
          onClick={handleConfirm}
        >
          Confirmar Cita
        </Button>
      </div>
    </div>
  );
}
