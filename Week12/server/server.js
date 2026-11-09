import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes/creatures";

const app = express();
dotenv.config();

app.use(express.json());
app.use(Cors());
app.use("/api/creatures", router);

// 404 handler for undefined routes
app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, _, res, __) => {
	console.error(err.stack);
	
	if (err.name === "ValidationError") {
		return res.status(400).json({ message: err.message });
	}

	res.status(500).json({ message: "Internal Server Error" });
});

app.get("/api/health", (_, res) => {
	res.json({
		status: "ok",
		database: mongoose.connection.readyState === 1?
			"connected" : "disconnected"
	});
});

