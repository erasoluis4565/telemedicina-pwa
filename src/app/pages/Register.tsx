import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";

import logo from "../components/assets/logo.png";

export function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    fechaNacimiento: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí luego conectaremos el backend

    alert("Cuenta creada correctamente");

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
            Crear Cuenta
          </h1>

          <p className="text-muted-foreground">
            Registra tus datos para comenzar a utilizar TeleSalud
          </p>

        </div>

        <Card>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nombre: e.target.value,
                })
              }
              required
            />

            <Input
              label="Apellido"
              value={formData.apellido}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  apellido: e.target.value,
                })
              }
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telefono: e.target.value,
                })
              }
              required
            />

            <Input
              label="Fecha de nacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fechaNacimiento: e.target.value,
                })
              }
              required
            />

            <Input
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />

            <div className="relative">

              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-[52px]"
              >
                {showPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>

            </div>

            <div className="relative">

              <Input
                label="Confirmar contraseña"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword:
                      e.target.value,
                  })
                }
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-[52px]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>

            </div>

            <Button
              type="submit"
              size="xl"
              className="w-full mt-6"
            >
              Crear Cuenta
            </Button>

          </form>

          <div className="text-center mt-6">

            <button
              className="text-primary hover:underline"
              onClick={() =>
                navigate("/login")
              }
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>

          </div>

        </Card>

      </div>

    </div>
  );
}