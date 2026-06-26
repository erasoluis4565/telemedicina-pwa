import { Pill, Download, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export function Prescriptions() {
  const prescriptions = [
    {
      id: 1,
      medication: "Losartán 50mg",
      dosage: "1 tableta",
      frequency: "Cada 12 horas",
      duration: "30 días",
      doctor: "Dr. Carlos Ramírez",
      date: "1 Mayo 2026",
      instructions: "Tomar con alimentos. No suspender sin consultar al médico.",
      active: true,
    },
    {
      id: 2,
      medication: "Metformina 850mg",
      dosage: "1 tableta",
      frequency: "Cada 8 horas",
      duration: "60 días",
      doctor: "Dra. Ana Martínez",
      date: "28 Abril 2026",
      instructions: "Tomar después de las comidas principales.",
      active: true,
    },
    {
      id: 3,
      medication: "Omeprazol 20mg",
      dosage: "1 cápsula",
      frequency: "1 vez al día",
      duration: "14 días",
      doctor: "Dr. María González",
      date: "15 Abril 2026",
      instructions: "Tomar en ayunas, 30 minutos antes del desayuno.",
      active: false,
    },
  ];

  const activePrescriptions = prescriptions.filter((p) => p.active);
  const inactivePrescriptions = prescriptions.filter((p) => !p.active);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="mb-2">Mis Recetas</h1>
        <p className="text-muted-foreground">Consulta tus medicamentos recetados</p>
      </div>

      <Card className="bg-accent border-accent">
        <div className="flex items-start gap-4">
          <AlertCircle size={32} className="text-primary flex-shrink-0 mt-1" strokeWidth={2.5} />
          <div>
            <h3 className="mb-2">Recordatorio importante</h3>
            <p className="text-muted-foreground">
              Toma tus medicamentos según las indicaciones. Si tienes dudas, consulta con tu médico.
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="mb-6">Recetas Activas</h2>
        <div className="space-y-4">
          {activePrescriptions.length > 0 ? (
            activePrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <Pill size={32} className="text-secondary" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{prescription.medication}</h3>
                      <p className="text-muted-foreground mb-3">
                        Recetado por {prescription.doctor}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={20} />
                        <span>{prescription.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted rounded-xl">
                    <div>
                      <p className="text-muted-foreground mb-1">Dosis</p>
                      <p>{prescription.dosage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Frecuencia</p>
                      <p className="flex items-center gap-2">
                        <Clock size={20} />
                        {prescription.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Duración</p>
                      <p>{prescription.duration}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-accent rounded-xl">
                    <p className="text-muted-foreground mb-2">Instrucciones:</p>
                    <p>{prescription.instructions}</p>
                  </div>

                  <Button variant="outline" size="default" className="w-full sm:w-auto">
                    <Download size={24} />
                    Descargar receta
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <Pill size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tienes recetas activas</p>
            </Card>
          )}
        </div>
      </div>

      {inactivePrescriptions.length > 0 && (
        <div>
          <h2 className="mb-6">Recetas Anteriores</h2>
          <div className="space-y-4">
            {inactivePrescriptions.map((prescription) => (
              <Card key={prescription.id} className="opacity-60">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                    <Pill size={32} className="text-muted-foreground" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">{prescription.medication}</h3>
                    <p className="text-muted-foreground mb-2">
                      Recetado por {prescription.doctor}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={20} />
                      <span>{prescription.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="default">
                    <Download size={24} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
