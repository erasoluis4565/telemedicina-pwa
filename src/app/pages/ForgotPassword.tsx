import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";

import logo from "../components/assets/logo.png";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      "Si el correo existe, recibirás un enlace para restablecer tu contraseña."
    );

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
            Recuperar Contraseña
          </h1>

          <p className="text-muted-foreground">
            Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.
          </p>

        </div>

        <Card>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              size="xl"
              className="w-full"
            >
              Enviar enlace
            </Button>

          </form>

          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Volver al inicio de sesión
            </button>

          </div>

        </Card>

      </div>

    </div>
  );
}