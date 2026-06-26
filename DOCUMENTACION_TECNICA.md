# Documentación Técnica — TeleSalud
> Estado actual del proyecto · Generada el 26 de junio de 2026

---

## 1. Información General

| Campo | Valor |
|---|---|
| **Nombre del proyecto** | TeleSalud |
| **Nombre del paquete** | `@figma/my-make-file` |
| **Versión** | 0.0.1 |
| **Framework** | React 18.3.1 |
| **Lenguaje** | TypeScript |
| **Bundler / Dev Server** | Vite 6.3.5 |
| **Estilos** | Tailwind CSS v4.1.12 |
| **Gestor de paquetes recomendado** | pnpm (incluye `pnpm-workspace.yaml`) |
| **Gestor alternativo** | npm (incluye `package-lock.json`) |
| **Sistema de componentes UI** | shadcn/ui (sobre Radix UI) |
| **Routing** | React Router v7.13.0 |
| **Tipo de módulos** | ES Modules (`"type": "module"`) |

### Descripción del proyecto

Aplicación web de telemedicina orientada a adultos mayores. Permite visualizar y agendar citas médicas, consultar recetas digitales y gestionar el perfil de salud del usuario. La interfaz prioriza la accesibilidad: tipografía grande (18 px base), botones amplios (mínimo 56 px de alto) y alto contraste.

---

## 2. Árbol del Proyecto

```
Proyecto de telemedicina accesible/
├── index.html                  # Punto de entrada HTML de Vite
├── package.json                # Dependencias y scripts
├── pnpm-workspace.yaml         # Configuración de workspace pnpm
├── postcss.config.mjs          # Configuración PostCSS
├── default_shadcn_theme.css    # Tema shadcn base de referencia
├── ATTRIBUTIONS.md             # Atribuciones de recursos
├── README.md                   # Documentación básica del repo
├── guidelines/
│   └── Guidelines.md           # Guías de diseño del proyecto
└── src/
    ├── main.tsx                # Punto de entrada de React
    ├── vite-env.d.ts           # Tipos de entorno Vite
    ├── styles/
    │   ├── index.css           # Importador central de estilos
    │   ├── tailwind.css        # Directivas de Tailwind
    │   ├── theme.css           # Variables CSS del sistema de diseño
    │   ├── fonts.css           # Declaraciones de fuentes (vacío actualmente)
    │   └── globals.css         # Estilos globales (vacío actualmente)
    └── app/
        ├── App.tsx             # Raíz de la aplicación (RouterProvider)
        ├── routes.tsx          # Definición de todas las rutas
        ├── lib/
        │   └── utils.ts        # Utilidad `cn()` (clsx + tailwind-merge)
        ├── components/
        │   ├── Button.tsx      # Botón reutilizable
        │   ├── Card.tsx        # Tarjeta reutilizable (+ CardHeader, CardTitle, CardContent)
        │   ├── Input.tsx       # Campo de entrada reutilizable
        │   ├── Layout.tsx      # Layout principal con header y nav inferior
        │   ├── assets/         # Imágenes estáticas del proyecto
        │   │   ├── logo.png
        │   │   ├── consulta.png
        │   │   ├── agenda.png
        │   │   ├── receta.png
        │   │   └── cuidado.png
        │   ├── figma/
        │   │   └── ImageWithFallback.tsx  # Imagen con manejo de error
        │   └── ui/             # Componentes shadcn/ui (Radix UI wrappers)
        │       └── [46 archivos .tsx / .ts]
        └── pages/
            ├── Welcome.tsx
            ├── Login.tsx
            ├── Dashboard.tsx
            ├── Appointments.tsx
            ├── BookAppointment.tsx
            ├── Confirmation.tsx
            ├── Prescriptions.tsx
            ├── Profile.tsx
            └── Offline.tsx
```

### Función de cada carpeta

| Carpeta | Función |
|---|---|
| `src/styles/` | Configuración visual global: Tailwind, tema de colores y tipografía |
| `src/app/` | Código fuente principal de la aplicación |
| `src/app/lib/` | Utilidades compartidas |
| `src/app/components/` | Componentes reutilizables propios del proyecto |
| `src/app/components/assets/` | Recursos gráficos (imágenes PNG) |
| `src/app/components/figma/` | Componentes generados o adaptados desde Figma |
| `src/app/components/ui/` | Biblioteca de componentes shadcn/ui |
| `src/app/pages/` | Pantallas / vistas de la aplicación |

---

## 3. Arquitectura

### Organización general

El proyecto sigue una **arquitectura por características / capas** simple, adecuada para una SPA de tamaño mediano:

```
Entrada → App (RouterProvider) → Layout (outlet) → Pages → Componentes reutilizables
```

### Patrones y técnicas utilizados

| Patrón | ¿Está presente? | Detalle |
|---|---|---|
| Componentes reutilizables | ✅ | `Button`, `Card`, `Input`, `Layout`, `ImageWithFallback` |
| Atomic Design | ⚠️ Parcial | `ui/` contiene átomos shadcn; no hay moléculas/organismos explícitos |
| Routing declarativo | ✅ | `createBrowserRouter` de React Router v7 en `routes.tsx` |
| Layout con `<Outlet>` | ✅ | `Layout.tsx` envuelve todas las rutas protegidas bajo `/app` |
| Hooks personalizados | ❌ | No existen hooks propios (`src/app/lib/` solo tiene `utils.ts`) |
| Context / Providers | ❌ | No hay Context API ni Zustand/Redux |
| Estado global | ❌ | Estado únicamente local con `useState` por página |
| Formularios controlados | ✅ | `Login.tsx` maneja el formulario con `useState` |
| Navegación programática | ✅ | Uso extensivo de `useNavigate()` de React Router |
| Paso de estado entre rutas | ✅ | `BookAppointment → Confirmation` usa `location.state` |
| Tema / Design tokens | ✅ | Variables CSS en `theme.css` consumidas vía Tailwind |
| Soporte dark mode | ⚠️ Parcial | Variables `.dark` definidas en `theme.css`, pero sin toggle implementado |
| Accesibilidad (a11y) | ✅ Parcial | `aria-label`, `aria-current`, `focus:ring` en componentes clave |

---

## 4. Rutas

Definidas en `src/app/routes.tsx` usando `createBrowserRouter`.

| Ruta | Componente | Layout | Descripción |
|---|---|---|---|
| `/` | `Welcome` | Sin layout | Pantalla de bienvenida |
| `/login` | `Login` | Sin layout | Inicio de sesión |
| `/app` | `Dashboard` (index) | `Layout` | Panel principal del usuario |
| `/app/appointments` | `Appointments` | `Layout` | Lista de citas del usuario |
| `/app/book-appointment` | `BookAppointment` | `Layout` | Formulario para agendar cita |
| `/app/confirmation` | `Confirmation` | `Layout` | Confirmación de cita agendada |
| `/app/prescriptions` | `Prescriptions` | `Layout` | Lista de recetas médicas |
| `/app/profile` | `Profile` | `Layout` | Perfil e información médica |
| `/offline` | `Offline` | Sin layout | Pantalla sin conexión |

### Estructura del router

```
/                    → Welcome
/login               → Login
/app                 → Layout (header + nav inferior)
  index              → Dashboard
  appointments       → Appointments
  book-appointment   → BookAppointment
  confirmation       → Confirmation
  prescriptions      → Prescriptions
  profile            → Profile
/offline             → Offline
```

> **Nota de seguridad:** No existe protección de rutas (Route Guards). Cualquier usuario puede acceder a `/app` sin estar autenticado.

---

## 5. Pantallas

### 5.1 Welcome (`pages/Welcome.tsx`)

**Función:** Pantalla de presentación de la aplicación. Muestra el logo, una grilla de 4 características y un botón de acceso.

**Componentes utilizados:** `Button`, `Card`, imágenes de assets (`logo`, `consulta`, `agenda`, `receta`, `cuidado`)

**Navegación de salida:**
- Botón "Comenzar" → `/login`

---

### 5.2 Login (`pages/Login.tsx`)

**Función:** Formulario de inicio de sesión. Captura email y contraseña. Actualmente no realiza validación real ni llama a ningún backend.

**Componentes utilizados:** `Button`, `Card`, `Input`, logo, iconos `Eye`/`EyeOff` de Lucide

**Estado local:** `showPassword` (boolean), `formData` ({ email, password })

**Navegación de salida:**
- `handleSubmit` → `/app` (sin validación de credenciales)
- Enlace "¿Olvidaste tu contraseña?" → sin funcionalidad
- Botón "Registrarse" → sin funcionalidad

---

### 5.3 Dashboard (`pages/Dashboard.tsx`)

**Función:** Panel principal. Muestra acciones rápidas y lista de próximas citas con datos estáticos (hardcoded).

**Componentes utilizados:** `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, iconos Lucide

**Datos:** Arreglo hardcoded `upcomingAppointments` con 2 citas de ejemplo.

**Navegación de salida:**
- "Agendar Cita" → `/app/book-appointment`
- "Mis Recetas" → `/app/prescriptions`
- "Mis Citas" → `/app/appointments`
- "Ver todas" → `/app/appointments`
- "Ver mis recetas" → `/app/prescriptions`

---

### 5.4 Appointments (`pages/Appointments.tsx`)

**Función:** Lista de citas con pestañas "Próximas" y "Completadas". Permite cancelar citas (solo en estado local).

**Componentes utilizados:** `Button`, `Card`, iconos Lucide

**Estado local:** `appointments` (arreglo), `activeTab` ("upcoming" | "completed")

**Datos:** 3 citas hardcoded (2 próximas, 1 completada).

**Lógica:** `handleCancel` filtra el arreglo local con `confirm()` nativo del navegador.

**Navegación de salida:** Ninguna (es destino final desde el nav).

---

### 5.5 BookAppointment (`pages/BookAppointment.tsx`)

**Función:** Formulario de 3 pasos para agendar cita: selección de médico, calendario personalizado y selección de hora.

**Componentes utilizados:** `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, iconos Lucide

**Estado local:** `selectedDate`, `selectedTime`, `selectedDoctor`, `currentMonth`

**Datos:** 3 médicos hardcoded, 6 horarios fijos disponibles.

**Lógica notable:** Calendario construido manualmente (sin librería), navegación por mes, días pasados deshabilitados.

**Navegación de salida:**
- Botón "Confirmar Cita" → `/app/confirmation` con `location.state` ({ doctor, date, time })

---

### 5.6 Confirmation (`pages/Confirmation.tsx`)

**Función:** Muestra el resumen de la cita agendada. Recibe datos vía `location.state`. Si no hay datos, redirige al inicio.

**Componentes utilizados:** `Button`, `Card`, iconos Lucide

**Navegación de salida:**
- "Ir al Inicio" → `/app`
- "Agendar Otra" → `/app/book-appointment`

---

### 5.7 Prescriptions (`pages/Prescriptions.tsx`)

**Función:** Muestra recetas activas y anteriores. Botón de descarga presente pero sin funcionalidad real.

**Componentes utilizados:** `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, iconos Lucide

**Datos:** 3 recetas hardcoded (2 activas, 1 inactiva).

**Navegación de salida:** Ninguna (es destino final).

---

### 5.8 Profile (`pages/Profile.tsx`)

**Función:** Muestra información personal del usuario, datos médicos (tipo de sangre, alergias), dirección, contacto de emergencia y sección de configuración.

**Componentes utilizados:** `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, iconos Lucide

**Datos:** Todos hardcoded. Botón "Editar" sin funcionalidad.

**Configuración:** 3 opciones (Notificaciones, Privacidad, Ayuda) sin funcionalidad real.

**Navegación de salida:** Ninguna (es destino final).

---

### 5.9 Offline (`pages/Offline.tsx`)

**Función:** Pantalla de error cuando no hay conexión. Muestra pasos para solucionar el problema y un número de teléfono de emergencia.

**Componentes utilizados:** `Button`, `Card`, iconos Lucide

**Lógica:** `handleRetry` verifica `navigator.onLine` antes de navegar.

**Navegación de salida:**
- Botón "Intentar de Nuevo" → `/app` (si hay conexión)

---

## 6. Componentes Reutilizables

### 6.1 `Button` (`components/Button.tsx`)

**Propósito:** Botón accesible y estilizado, base de todas las interacciones de la UI.

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost"` | `"primary"` | Estilo visual del botón |
| `size` | `"default" \| "large" \| "xl"` | `"large"` | Tamaño y padding (mín. 56/64/72px de alto) |
| `className` | `string` | — | Clases adicionales |
| `...props` | `ButtonHTMLAttributes` | — | Todos los atributos nativos de `<button>` |

**Implementación:** `forwardRef`, merge de clases con `cn()`.

**Utilizado en:** Welcome, Login, Dashboard, Appointments, BookAppointment, Confirmation, Prescriptions, Profile, Offline, Layout.

---

### 6.2 `Card` (`components/Card.tsx`)

**Propósito:** Contenedor visual con borde, sombra y bordes redondeados. Cuatro subcomponentes.

| Componente | Propósito |
|---|---|
| `Card` | Contenedor principal. Prop `interactive` activa efecto hover/click |
| `CardHeader` | Espaciado superior interno (mb-4) |
| `CardTitle` | Encabezado semántico `<h3>` de la tarjeta |
| `CardContent` | Cuerpo de contenido de la tarjeta |

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `interactive` | `boolean` | `false` | Activa hover shadow, cursor pointer y scale al hacer clic |
| `className` | `string` | — | Clases adicionales |

**Utilizado en:** Todas las páginas.

---

### 6.3 `Input` (`components/Input.tsx`)

**Propósito:** Campo de texto accesible con label integrado y manejo de errores.

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Texto del label (genera `id` automáticamente) |
| `error` | `string` | — | Mensaje de error que colorea el borde de rojo |
| `className` | `string` | — | Clases adicionales |
| `...props` | `InputHTMLAttributes` | — | Todos los atributos nativos de `<input>` |

**Implementación:** `forwardRef`, `id` auto-generado desde `label` si no se provee.

**Utilizado en:** Login.

---

### 6.4 `Layout` (`components/Layout.tsx`)

**Propósito:** Shell de la aplicación autenticada. Contiene header fijo, área de contenido principal y barra de navegación inferior fija.

**Estructura:**
```
<div> (min-h-screen)
  <header>  ← Logo + botón "Salir" (logout mock)
  <main>    ← <Outlet /> (renderiza la página activa)
  <nav>     ← Barra inferior con 4 íconos de navegación
```

**Navegación incluida:**

| Ítem | Ícono | Ruta |
|---|---|---|
| Inicio | `Home` | `/app` |
| Citas | `Calendar` | `/app/appointments` |
| Recetas | `FileText` | `/app/prescriptions` |
| Perfil | `User` | `/app/profile` |

**Logout:** Navega a `/login` (sin invalidar sesión real).

**Utilizado en:** Como wrapper de todas las rutas bajo `/app`.

---

### 6.5 `ImageWithFallback` (`components/figma/ImageWithFallback.tsx`)

**Propósito:** Imagen con fallback visual (ícono SVG gris) cuando la imagen original falla al cargar.

| Prop | Tipo | Descripción |
|---|---|---|
| `src` | `string` | URL de la imagen |
| `alt` | `string` | Texto alternativo |
| `...props` | `ImgHTMLAttributes` | Atributos nativos de `<img>` |

**Estado local:** `didError` (boolean).

**Utilizado en:** Disponible pero no utilizado activamente en las páginas actuales.

---

### 6.6 Componentes `ui/` (shadcn/ui)

Componentes de bajo nivel basados en Radix UI, generados por shadcn. Actualmente **instalados pero mayormente sin usar** en las páginas personalizadas.

| Archivo | Componente Radix base | Estado |
|---|---|---|
| `accordion.tsx` | `@radix-ui/react-accordion` | Instalado, no usado |
| `alert-dialog.tsx` | `@radix-ui/react-alert-dialog` | Instalado, no usado |
| `avatar.tsx` | `@radix-ui/react-avatar` | Instalado, no usado |
| `button.tsx` | `@radix-ui/react-slot` | Instalado (duplica `Button.tsx`) |
| `calendar.tsx` | `react-day-picker` | Instalado, no usado (Dashboard usa calendario propio) |
| `dialog.tsx` | `@radix-ui/react-dialog` | Instalado, no usado |
| `dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` | Instalado, no usado |
| `form.tsx` | `react-hook-form` | Instalado, no usado |
| `input.tsx` | Nativo | Instalado (duplica `Input.tsx`) |
| `select.tsx` | `@radix-ui/react-select` | Instalado, no usado |
| `sidebar.tsx` | Composición propia | Instalado, no usado |
| `sonner.tsx` | `sonner` | Instalado, no usado |
| `tabs.tsx` | `@radix-ui/react-tabs` | Instalado, no usado |
| `use-mobile.ts` | — | Hook de detección de móvil |
| `utils.ts` | — | Duplica `lib/utils.ts` |

> Hay **46 archivos** en `ui/`. La mayoría son instalaciones preventivas de shadcn que no están integradas en las páginas actuales.

---

## 7. Assets

Ubicación: `src/app/components/assets/`

| Archivo | Descripción | Utilizado en |
|---|---|---|
| `logo.png` | Logo principal de TeleSalud | `Welcome.tsx`, `Login.tsx` |
| `consulta.png` | Ícono de "Consultas en línea" | `Welcome.tsx` (feature card) |
| `agenda.png` | Ícono de "Agenda fácil" | `Welcome.tsx` (feature card) |
| `receta.png` | Ícono de "Recetas digitales" | `Welcome.tsx` (feature card) |
| `cuidado.png` | Ícono de "Cuidado personalizado" | `Welcome.tsx` (feature card) |

> No existen iconos SVG propios; los iconos de interfaz son provistos por **Lucide React**.

---

## 8. Navegación

### Flujo completo del usuario

```
/  (Welcome)
 └──[Comenzar]──▶  /login  (Login)
                     └──[Ingresar]──▶  /app  (Dashboard)
                                         ├──[Agendar Cita]────────▶  /app/book-appointment
                                         │                              └──[Confirmar]──▶  /app/confirmation
                                         │                                                   ├──[Ir al Inicio]──▶  /app
                                         │                                                   └──[Agendar Otra]──▶  /app/book-appointment
                                         ├──[Mis Recetas / Ver mis recetas]──▶  /app/prescriptions
                                         ├──[Mis Citas / Ver todas]──────────▶  /app/appointments
                                         └──[Nav: Perfil]──────────────────────▶  /app/profile

/offline  (Offline)  ← acceso manual / futuro service worker
  └──[Intentar de Nuevo]──▶  /app (si navigator.onLine === true)
```

### Barra de navegación inferior (Layout)

Siempre visible en todas las rutas bajo `/app`. Resalta el ítem activo comparando `location.pathname`.

```
[ Inicio ] [ Citas ] [ Recetas ] [ Perfil ]
   /app    /app/app…  /app/pre…  /app/pro…
```

### Logout

El botón "Salir" en el header navega a `/login`. No existe invalidación de token ni limpieza de estado.

---

## 9. Estado del Proyecto

### Funcionalidades implementadas

| Funcionalidad | Estado | Notas |
|---|---|---|
| ✅ Pantalla de bienvenida | Completa | Visual, con features y logo |
| ✅ Pantalla de login | Completa (visual) | Sin autenticación real |
| ✅ Dashboard | Completa (visual) | Datos hardcoded |
| ✅ Agendamiento de cita | Completa (visual) | Flujo de 3 pasos funcional en UI |
| ✅ Confirmación de cita | Completa (visual) | Recibe datos via `location.state` |
| ✅ Lista de citas | Completa (visual) | Cancelación solo en estado local |
| ✅ Recetas médicas | Completa (visual) | Descarga sin implementar |
| ✅ Perfil de usuario | Completa (visual) | Edición sin implementar |
| ✅ Pantalla offline | Completa (visual) | Verifica `navigator.onLine` |
| ✅ Layout con navegación | Completo | Header + nav inferior con rutas activas |
| ✅ Sistema de diseño accesible | Completo | Tipografía 18px, botones grandes, focus rings |
| ✅ Tema claro / variables CSS | Completo | Variables en `theme.css` |
| ⚠️ Tema oscuro | Parcial | Variables `.dark` definidas, sin toggle |
| ⚠️ Componentes shadcn/ui | Instalados | 46 componentes instalados, ~5 en uso |

---

## 10. Funcionalidades Pendientes

| Categoría | Funcionalidad | Prioridad |
|---|---|---|
| **Autenticación** | Login real con validación de credenciales | Alta |
| **Autenticación** | Registro de nuevo usuario | Alta |
| **Autenticación** | Recuperación de contraseña | Media |
| **Autenticación** | Protección de rutas (Route Guards) | Alta |
| **Autenticación** | Gestión de sesión / tokens (JWT, cookies) | Alta |
| **Backend** | API REST o GraphQL para todas las entidades | Alta |
| **Base de datos** | Persistencia de usuarios, citas y recetas | Alta |
| **Citas** | Cancelación persistente en servidor | Alta |
| **Citas** | Videollamada real (WebRTC / Jitsi / Zoom SDK) | Alta |
| **Recetas** | Descarga real de PDF | Media |
| **Perfil** | Formulario de edición funcional | Media |
| **Perfil** | Upload de foto de perfil | Baja |
| **Notificaciones** | Recordatorios de citas (push / email) | Media |
| **PWA** | `manifest.json` | Alta |
| **PWA** | Service Worker (caché offline) | Alta |
| **PWA** | Íconos de instalación (192x192, 512x512) | Alta |
| **PWA** | Estrategia de caché (Workbox) | Media |
| **PWA** | Redireccionamiento automático a `/offline` | Media |
| **UI** | Toggle de tema oscuro funcional | Baja |
| **UI** | Integración real de componentes shadcn/ui | Media |
| **Testing** | Unit tests (Vitest / Jest) | Alta |
| **Testing** | Tests de componentes (React Testing Library) | Alta |
| **Testing** | Tests E2E (Playwright / Cypress) | Media |
| **CI/CD** | GitHub Actions (lint, test, build) | Media |
| **CI/CD** | Deploy automático (Vercel / Netlify / GitHub Pages) | Media |
| **Accesibilidad** | Auditoría con herramienta automática (axe, Lighthouse) | Media |
| **Internacionalización** | i18n si se requiere más de un idioma | Baja |

---

## 11. Dependencias

### Dependencias de producción

| Paquete | Versión | Propósito |
|---|---|---|
| `react` | 18.3.1 | Librería principal de UI (peer dep) |
| `react-dom` | 18.3.1 | Renderizado en el DOM (peer dep) |
| `react-router` | 7.13.0 | Routing y navegación SPA |
| **UI Base** | | |
| `@radix-ui/react-*` | varias | Primitivos de UI accesibles (base de shadcn) |
| `@mui/material` | 7.3.5 | Componentes Material UI (instalado, no integrado activamente) |
| `@mui/icons-material` | 7.3.5 | Iconos MUI |
| `@emotion/react` | 11.14.0 | CSS-in-JS requerido por MUI |
| `@emotion/styled` | 11.14.1 | Styled components de MUI |
| `lucide-react` | 0.487.0 | Iconos SVG utilizados en toda la app |
| **Estilos y utilidades** | | |
| `class-variance-authority` | 0.7.1 | Variantes de clases CSS (shadcn) |
| `clsx` | 2.1.1 | Composición condicional de clases CSS |
| `tailwind-merge` | 3.2.0 | Merge inteligente de clases Tailwind |
| `tw-animate-css` | 1.3.8 | Animaciones CSS para Tailwind |
| `next-themes` | 0.4.6 | Gestión de tema claro/oscuro |
| **Formularios y validación** | | |
| `react-hook-form` | 7.55.0 | Gestión de formularios (instalado, no usado en páginas) |
| `input-otp` | 1.4.2 | Input de código OTP (instalado, no usado) |
| **Fechas y calendario** | | |
| `date-fns` | 3.6.0 | Manipulación de fechas |
| `react-day-picker` | 8.10.1 | Calendario accesible (instalado; app usa calendario propio) |
| **Animaciones** | | |
| `motion` | 12.23.24 | Animaciones declarativas (Framer Motion) |
| `canvas-confetti` | 1.9.4 | Efecto de confeti (instalado, no usado) |
| **Componentes específicos** | | |
| `sonner` | 2.0.3 | Notificaciones toast |
| `cmdk` | 1.1.1 | Paleta de comandos (Command Menu) |
| `vaul` | 1.1.2 | Drawer / Sheet inferior |
| `embla-carousel-react` | 8.6.0 | Carrusel accesible |
| `react-slick` | 0.31.0 | Carrusel (alternativa a Embla) |
| `react-resizable-panels` | 2.1.7 | Paneles redimensionables |
| `react-responsive-masonry` | 2.7.1 | Layout de mosaico responsive |
| `react-dnd` | 16.0.1 | Drag and Drop |
| `react-dnd-html5-backend` | 16.0.1 | Backend HTML5 para react-dnd |
| `recharts` | 2.15.2 | Gráficas y visualización de datos |
| `@popperjs/core` | 2.11.8 | Posicionamiento de tooltips/popovers |
| `react-popper` | 2.3.0 | Wrapper React para Popper.js |

### Dependencias de desarrollo

| Paquete | Versión | Propósito |
|---|---|---|
| `vite` | 6.3.5 | Bundler y servidor de desarrollo |
| `@vitejs/plugin-react` | 4.7.0 | Soporte de React (Fast Refresh, JSX) en Vite |
| `tailwindcss` | 4.1.12 | Framework de utilidades CSS |
| `@tailwindcss/vite` | 4.1.12 | Plugin de Tailwind para Vite v4 |

> **Observación:** No hay dependencias de testing (Vitest, Jest, Testing Library, Playwright, Cypress) ni de TypeScript standalone (se resuelve vía Vite).

---

## 12. Sistema de Diseño

### Variables de tema (`theme.css`)

| Token | Valor (claro) | Uso |
|---|---|---|
| `--font-size` | 18px | Tamaño base de fuente (accesibilidad) |
| `--primary` | `#3b82f6` (azul) | Botones primarios, nav activo, énfasis |
| `--secondary` | `#10b981` (verde) | Confirmaciones, éxito, recetas |
| `--destructive` | `#ef4444` (rojo) | Errores, datos médicos críticos |
| `--accent` | `#e0f2fe` (azul claro) | Fondos de tarjetas de aviso |
| `--muted` | `#f3f4f6` | Fondos secundarios |
| `--border` | `#e5e7eb` | Bordes de tarjetas e inputs |
| `--radius` | `0.75rem` | Radio base de bordes |

### Tipografía

| Elemento | Tamaño | Peso |
|---|---|---|
| `h1` | 1.75rem (31.5px) | 600 |
| `h2` | 1.5rem (27px) | 600 |
| `h3` | 1.25rem (22.5px) | 600 |
| `h4`, `label`, `button` | 1.125rem (20.25px) | 600 |
| `input`, `p` | 1.125rem (20.25px) | 400 |

> La escala tipográfica está intencionalmente aumentada para mejorar la legibilidad en adultos mayores.

### Tamaños mínimos de toque

| Componente | Alto mínimo |
|---|---|
| `Button` size `default` | 56px |
| `Button` size `large` | 64px |
| `Button` size `xl` | 72px |
| `Input` | 56px |
| Nav items | 72px |
| Celdas del calendario | 56px |

> Cumple con las recomendaciones de WCAG 2.5.5 (Tamaño del objetivo: mínimo 44×44px).

---

## 13. Recomendaciones Técnicas

### Arquitectura

1. **Agregar protección de rutas.** Crear un componente `<ProtectedRoute>` que verifique si hay sesión activa antes de renderizar cualquier ruta bajo `/app`. Sin esto, cualquier usuario puede acceder directamente a `/app` sin iniciar sesión.

2. **Centralizar el estado de autenticación.** Implementar un `AuthContext` o una store liviana (Zustand) que gestione el token de sesión, el perfil del usuario y el estado de carga. Actualmente el estado está completamente disperso en `useState` locales.

3. **Extraer los datos hardcoded a mocks separados.** Los arreglos de citas, recetas y médicos deberían vivir en archivos `src/app/data/` o en una capa de servicios, no dentro de los componentes. Facilitará su reemplazo por llamadas a API.

4. **Crear una capa de servicios.** Agregar `src/app/services/` con módulos como `appointmentsService.ts`, `prescriptionsService.ts`, etc. Esto desacopla la lógica de negocio de los componentes y simplifica la migración a un backend real.

5. **Eliminar la duplicación de `utils.ts`.** El archivo `src/app/components/ui/utils.ts` es idéntico a `src/app/lib/utils.ts`. Consolidar en uno solo.

6. **Eliminar la duplicación de componentes UI.** Existe `components/Button.tsx` y `components/ui/button.tsx`, e igual con `Input`. Decidir cuál usar como estándar y eliminar el otro.

### Rendimiento

7. **Lazy loading de rutas.** Usar `React.lazy()` + `<Suspense>` para cargar las páginas bajo demanda. Actualmente todas se importan de forma síncrona en `routes.tsx`, lo que aumenta el bundle inicial.

8. **Optimizar imágenes.** Los 5 archivos PNG en `assets/` no tienen formato moderno (WebP/AVIF). Considerar convertirlos o usar `vite-plugin-imagemin`.

9. **Auditar dependencias no utilizadas.** Hay muchas dependencias instaladas (MUI completo, react-dnd, recharts, embla, react-slick, canvas-confetti, etc.) que no se usan en ninguna página. Esto infla el `node_modules` y potencialmente el bundle si Vite no hace tree-shaking completo.

### Mantenibilidad

10. **Agregar TypeScript estricto.** No hay `tsconfig.json` visible en la raíz. Configurar `strict: true` para evitar errores silenciosos.

11. **Agregar ESLint y Prettier.** No hay configuración de linter ni formateador. Agregar `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, y Prettier con `eslint-config-prettier`.

12. **Estandarizar el manejo del calendario.** `BookAppointment` implementa un calendario desde cero (manual). Ya está instalado `react-day-picker`. Reemplazar el calendario propio por `react-day-picker` reduce código y mejora accesibilidad.

13. **Reemplazar `confirm()` nativo por el componente `AlertDialog`** de Radix UI ya instalado (`ui/alert-dialog.tsx`) para la cancelación de citas. El `confirm()` nativo no es estilizable ni accesible.

---

## 14. Preparación para Fase 2

### Progressive Web App (PWA)

Para convertir la aplicación en una PWA instalable, se necesita:

| Elemento | Estado actual | Acción requerida |
|---|---|---|
| `manifest.json` | ❌ Ausente | Crear `public/manifest.json` con `name`, `short_name`, `start_url`, `display: "standalone"`, `theme_color`, `background_color` e iconos |
| Íconos PWA | ❌ Ausentes | Generar iconos en tamaños 192×192 y 512×512 (mínimo) desde el logo actual |
| Service Worker | ❌ Ausente | Registrar un SW en `src/main.tsx` |
| Estrategia de caché | ❌ Ausente | Implementar con Workbox (recomendado: `vite-plugin-pwa`) |
| Link en `index.html` | ❌ Ausente | Agregar `<link rel="manifest" href="/manifest.json">` y `<meta name="theme-color">` |
| Redirección offline | ⚠️ Parcial | Existe `Offline.tsx`; conectar con el SW para redirigir automáticamente |

**Solución recomendada:** Instalar `vite-plugin-pwa` (basado en Workbox). Configuración mínima:

```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TeleSalud',
        short_name: 'TeleSalud',
        start_url: '/',
        display: 'standalone',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ]
      },
      workbox: {
        navigateFallback: '/offline',
        runtimeCaching: [/* configurar según rutas de API */]
      }
    })
  ]
}
```

---

### Service Workers

| Funcionalidad | Descripción |
|---|---|
| Precaché de assets | Cachear el shell de la app (HTML, CSS, JS) para carga offline |
| Caché de imágenes | Estrategia `CacheFirst` para PNGs de assets |
| Caché de API | Estrategia `NetworkFirst` o `StaleWhileRevalidate` para endpoints |
| Push notifications | Requerirá permisos del usuario y un servidor de notificaciones |

---

### Base de Datos

| Opción | Caso de uso |
|---|---|
| **PostgreSQL + Prisma** | Backend propio con ORM tipado (recomendado) |
| **Supabase** | Backend as a Service con auth, DB y storage integrados (más rápido para MVP) |
| **Firebase Firestore** | NoSQL en tiempo real (útil si se requieren notificaciones en tiempo real) |
| **IndexedDB** (cliente) | Persistencia local para funcionalidad offline (lectura de recetas sin conexión) |

---

### Backend / API

La arquitectura sugerida para Fase 2:

```
Frontend (React/Vite)
    │
    ├─ Auth: JWT o sesión cookie
    ├─ /api/auth/login
    ├─ /api/auth/register
    ├─ /api/appointments (GET, POST, DELETE)
    ├─ /api/prescriptions (GET)
    ├─ /api/profile (GET, PUT)
    └─ /api/doctors (GET)
```

**Opciones de implementación:**
- **Node.js + Express / Fastify** (JavaScript nativo)
- **Next.js API Routes** (si se migra a Next.js)
- **Supabase** (sin código de servidor propio)

---

### Testing

| Tipo | Herramienta recomendada | Instalación |
|---|---|---|
| Unit tests | Vitest | `pnpm add -D vitest` |
| Tests de componentes | React Testing Library | `pnpm add -D @testing-library/react @testing-library/user-event` |
| Tests E2E | Playwright | `pnpm add -D @playwright/test` |
| Accesibilidad | axe-core + @axe-core/react | `pnpm add -D @axe-core/react` |
| Cobertura | c8 (incluido con Vitest) | Configurar en `vitest.config.ts` |

---

### GitHub Actions / CI-CD

Pipeline sugerido (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint          # ESLint
      - run: pnpm run type-check    # tsc --noEmit
      - run: pnpm run test          # Vitest
      - run: pnpm run build         # Vite build
```

Pipeline de deploy sugerido:
- **Vercel:** Push a `main` → deploy automático (configuración cero)
- **GitHub Pages:** Acción `peaceiris/actions-gh-pages` con el directorio `dist/`
- **Netlify:** Conectar repo y configurar `pnpm build` + `dist/`

---

## Resumen Ejecutivo

El proyecto TeleSalud tiene una **base visual sólida y bien estructurada** para una aplicación de telemedicina orientada a adultos mayores. El sistema de diseño es accesible (tipografía grande, botones amplios, alto contraste, `aria-label` en elementos interactivos) y el flujo de usuario principal (Bienvenida → Login → Dashboard → Agendar Cita → Confirmación) está completamente implementado en la capa visual.

Las principales brechas para producción son:
1. **Sin autenticación real** — el login navega directo sin verificación
2. **Sin persistencia** — todos los datos son hardcoded en los componentes
3. **Sin protección de rutas** — cualquier URL es accesible sin sesión
4. **Sin PWA** — no hay manifest ni service worker
5. **Sin tests** — no hay ninguna cobertura de pruebas

La Fase 2 debe priorizar: autenticación → API + base de datos → PWA → CI/CD → testing.

---

*Documentación generada automáticamente el 26 de junio de 2026 a partir del análisis estático del código fuente.*
