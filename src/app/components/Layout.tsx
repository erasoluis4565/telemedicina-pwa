import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Calendar, FileText, User, LogOut } from "lucide-react";
import { Button } from "./Button";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Inicio", path: "/app" },
    { icon: Calendar, label: "Citas", path: "/app/appointments" },
    { icon: FileText, label: "Recetas", path: "/app/prescriptions" },
    { icon: User, label: "Perfil", path: "/app/profile" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="bg-card border-b-2 border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-primary">TeleSalud</h1>
            <Button
              variant="ghost"
              size="default"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              <LogOut size={28} />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <nav className="bg-card border-t-2 border-border shadow-lg sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 py-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl
                  transition-all duration-200 min-h-[72px]
                  focus:outline-none focus:ring-4 focus:ring-primary/30
                  ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted active:scale-95"
                  }
                `}
                aria-label={item.label}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                <item.icon size={32} strokeWidth={2.5} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
