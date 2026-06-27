import { createBrowserRouter } from "react-router";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { BookAppointment } from "./pages/BookAppointment";
import { Appointments } from "./pages/Appointments";
import { Prescriptions } from "./pages/Prescriptions";
import { Profile } from "./pages/Profile";
import { Confirmation } from "./pages/Confirmation";
import { Offline } from "./pages/Offline";
import { Layout } from "./components/Layout";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/register",
  element: <Register />,
},
{
  path: "/forgot-password",
  element: <ForgotPassword />,
},
{
  path: "/reset-password",
  element: <ResetPassword />,
},
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "book-appointment", element: <BookAppointment /> },
      { path: "appointments", element: <Appointments /> },
      { path: "prescriptions", element: <Prescriptions /> },
      { path: "profile", element: <Profile /> },
      { path: "confirmation", element: <Confirmation /> },
    ],
  },
  {
    path: "/offline",
    element: <Offline />,
  },
]);
