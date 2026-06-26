import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import logo from "../components/assets/logo.png";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <img
              src={logo}
              alt="Logo TeleSalud"
              className="w-40 h-40 object-contain"
            />
          </div>
          <h1 className="text-primary">Iniciar Sesión</h1>
          <p className="text-muted-foreground">
            Ingresa tus datos para acceder
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[52px] text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
              </button>
            </div>

            <Button type="submit" size="xl" className="w-full mt-8">
              Ingresar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">¿No tienes cuenta?</p>
          <button
            type="button"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
