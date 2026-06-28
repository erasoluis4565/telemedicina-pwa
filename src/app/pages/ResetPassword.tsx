import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";

import logo from "../components/assets/logo.png";

export function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("Contraseña actualizada correctamente.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 flex items-center justify-center px-4 py-8">

      <div className="max-w-md w-full space-y-8">

        <div className="text-center space-y-4">

          <div className="flex justify-center">
            <img
              src={logo}
              alt="TeleSalud"
              className="w-40 h-40 object-contain"
            />
          </div>

          <h1 className="text-primary">
            Nueva Contraseña
          </h1>

          <p className="text-muted-foreground">
            Ingresa una nueva contraseña para continuar.
          </p>

        </div>

        <Card>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="relative">

              <Input
                label="Nueva contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[52px]"
              >
                {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
              </button>

            </div>

            <div className="relative">

              <Input
                label="Confirmar contraseña"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-[52px]"
              >
                {showConfirmPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
              </button>

            </div>

            <Button
              type="submit"
              size="xl"
              className="w-full"
            >
              Guardar contraseña
            </Button>

          </form>

        </Card>

      </div>

    </div>
  );
}