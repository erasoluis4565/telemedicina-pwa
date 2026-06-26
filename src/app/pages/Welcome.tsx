import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import logo from "../components/assets/logo.png";
import consulta from "../components/assets/consulta.png";
import agenda from "../components/assets/agenda.png";
import receta from "../components/assets/receta.png";
import cuidado from "../components/assets/cuidado.png";

export function Welcome() {
  const navigate = useNavigate();

  const features = [
  {
    image: consulta,
    title: "Consultas en línea",
    description: "Habla con tu médico desde casa",
  },
  {
    image: agenda,
    title: "Agenda fácil",
    description: "Reserva citas con un solo toque",
  },
  {
    image: receta,
    title: "Recetas digitales",
    description: "Accede a tus recetas cuando las necesites",
  },
  {
    image: cuidado,
    title: "Cuidado personalizado",
    description: "Atención médica pensada para ti",
  },
];
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <img
            src={logo}
            alt="Logo TeleSalud"
            className="w-44 h-44 object-contain"
            />
          </div>
          <h1 className="text-primary">TeleSalud</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tu salud al alcance de tu mano. Consultas médicas simples y seguras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-36 h-36 object-contain"
                />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <Button
            size="xl"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Comenzar
          </Button>
          <p className="text-center text-muted-foreground">
            Atención médica de calidad para adultos mayores
          </p>
        </div>
      </div>
    </div>
  );
}
