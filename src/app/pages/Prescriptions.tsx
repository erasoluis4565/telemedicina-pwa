import { Pill, Download, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { obtenerMisRecetas } from "../../services/receta.service";

export function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const obtenerRecetas = async () => {

    try {

      const recetas = await obtenerMisRecetas();

      setPrescriptions(recetas);

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    obtenerRecetas();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground">
          Cargando recetas...
        </p>
      </div>
    );
  }

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
        <h2 className="mb-6">Mis recetas médicas</h2>
        <div className="space-y-4">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <Card key={prescription._id}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <Pill size={32} className="text-secondary" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">
                        Dr. {prescription.medicoId.usuarioId.nombre}{" "}
                        {prescription.medicoId.usuarioId.apellido}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {prescription.medicoId.especialidad}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={20} />
                        <span>
                          {new Date(
                            prescription.citaId.fecha
                          ).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-xl">

                    <h3 className="mb-4">
                      Medicamentos Recetados
                    </h3>

                    <div className="space-y-4">

                      {prescription.medicamentos.map((med: any) => (

                        <div
                          key={med._id}
                          className="border-2 border-border rounded-xl p-4 bg-background"
                        >

                          <h4 className="mb-2">
                            {med.nombre}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <div>
                              <p className="text-muted-foreground">
                                Dosis
                              </p>
                              <p>{med.dosis}</p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">
                                Frecuencia
                              </p>

                              <p className="flex items-center gap-2">
                                <Clock size={18} />
                                {med.frecuencia}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Duración
                              </p>
                              <p>{med.duracion}</p>
                            </div>

                          </div>

                        </div>

                      ))}

                    </div>
                  </div>
                  <div className="border-2 border-border rounded-xl p-4">

                    <h3 className="mb-2">
                      Diagnóstico
                    </h3>

                    <p>
                      {prescription.diagnostico}
                    </p>

                  </div>

                  <div className="border-2 border-border rounded-xl p-4">

                    <h3 className="mb-2">
                      Recomendaciones
                    </h3>

                    <p>
                      {prescription.recomendaciones}
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    size="default"
                    className="w-full"
                    disabled
                  >
                    <Download size={24} />
                    Descarga disponible próximamente
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <Pill size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tienes recetas registradas.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
