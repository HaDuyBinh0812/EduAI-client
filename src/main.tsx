import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./router/index.tsx";
import "./style/Global.scss";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
