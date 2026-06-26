import { useNavigate } from "react-router";
import { WifiOff, RefreshCw, Phone } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function Offline() {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate("/app");
    } else {
      alert("Aún no hay conexión a Internet. Por favor, verifica tu conexión.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-4">
            <WifiOff size={64} className="text-muted-foreground" strokeWidth={2.5} />
          </div>
          <h1>Sin Conexión</h1>
          <p className="text-muted-foreground">
            No se puede conectar a Internet en este momento
          </p>
        </div>

        <Card>
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <h3>¿Qué puedes hacer?</h3>
              <ul className="space-y-4 text-left text-muted-foreground">
                <li className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-foreground mb-1">Verifica tu conexión WiFi</p>
                    <p className="text-sm">Asegúrate de estar conectado a una red WiFi</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-foreground mb-1">Verifica tus datos móviles</p>
                    <p className="text-sm">Activa los datos móviles si no tienes WiFi</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-foreground mb-1">Reinicia tu dispositivo</p>
                    <p className="text-sm">A veces un reinicio puede solucionar problemas de conexión</p>
                  </div>
                </li>
              </ul>
            </div>

            <Button
              size="xl"
              className="w-full"
              onClick={handleRetry}
            >
              <RefreshCw size={28} />
              Intentar de Nuevo
            </Button>
          </div>
        </Card>

        <Card className="bg-accent border-accent">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
              <Phone size={32} className="text-secondary" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="mb-2">¿Necesitas ayuda urgente?</h3>
              <p className="text-muted-foreground mb-4">
                Puedes llamar directamente a nuestra línea de atención
              </p>
              <Button variant="secondary" size="large">
                <Phone size={24} />
                Llamar: 55 1234 5678
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-muted-foreground text-sm">
          Esta aplicación requiere conexión a Internet para funcionar correctamente
        </p>
      </div>
    </div>
  );
}
