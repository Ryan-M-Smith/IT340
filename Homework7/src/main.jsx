/**
 * Filename: main.jsx
 * Description: The main React app entrypoint | IT-340 Homework #7
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App/>
	</StrictMode>,
);
