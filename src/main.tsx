import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./app/App.tsx";
import "./styles/index.css";

// Registrar automáticamente el Service Worker
registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")!).render(<App />);
  