import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./pages/index";

hydrateRoot(document.getElementById("root"), <App />);
