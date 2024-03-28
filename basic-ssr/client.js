import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/page";

hydrateRoot(document.getElementById("root"), <App />);
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);