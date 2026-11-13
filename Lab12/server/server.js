import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes/plants.js";

dotenv.config();

const app = express();
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/PlantDatabase";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());
app.use("/api/plants", router);

app.get("/", (_, res) => {
	res.json({
		message: "Plant API is running",
		endpoints: [
			"/api/health",
			"/api/plants"
		]
	});
});

app.get("/api/health", (_, res) => {
	res.json({
		status: "ok",
		database: mongoose.connection.readyState === 1?
			"connected" : "disconnected"
	});
});

// Global error handler
app.use((err, _, res, __) => {
	console.error(err.stack);
	
	if (err.name === "ValidationError") {
		return res.status(400).json({ message: err.message });
	}

	res.status(500).json({ message: "Internal Server Error" });
});

// 404 handler for undefined routes
app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

try {
	await mongoose.connect(mongoUri);
	console.log("Connected to MongoDB");
	
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
} catch (error) {
	console.error("Error connecting to MongoDB:", error);
	process.exit(1);
}
