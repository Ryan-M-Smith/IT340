import express from "express";

const app = express();
const port = 3000;
const validSun = ["Full Sun", "Partial Shade", "Full Shade"];
const validColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "White"];

let plants = [
	{ id: 1, 	name: "Cardinal Flower", 		height: 2, 		sun: "Full Sun", 		olor: "Red" },
	{ id: 2, 	name: "Scarlet Beebalm", 		height: 3, 		sun: "Partial Shade", 	color: "Red" },
	{ id: 3, 	name: "Eastern Red Columbine", 	height: 2, 		sun: "Partial Shade", 	color: "Red" },
	{ id: 4, 	name: "Wild Bergamot", 			height: 4, 		sun: "Full Sun", 		color: "Purple" },
	{ id: 5, 	name: "Spotted Joe-Pye-Weed", 	height: 6, 		sun: "Full Sun", 		color: "Purple" },
	{ id: 6, 	name: "Bullhead Pondlilly", 	height: 1, 		sun: "Full Sun", 		color: "Yellow" },
	{ id: 7, 	name: "Mountain Laurel", 		height: 15, 	sun: "Partial Shade", 	color: "White" },
	{ id: 8, 	name: "Marsh Marigold", 		height: 2, 		sun: "Full Sun", 		color: "Yellow" },
	{ id: 9, 	name: "Northern Spicebush", 	height: 10, 	sun: "Partial Shade", 	color: "Yellow" },
	{ id: 10,	name: "Dutchman's Breeches", 	height: 1, 		sun: "Partial Shade", 	color: "White" },
	{ id: 11, 	name: "Flowering Dogwood", 		height: 30,		sun: "Partial Shade", 	color: "White" },
	{ id: 12, 	name: "American Dog Violet", 	height: 0.67, 	sun: "Partial Shade", 	color: "Blue" }
];

app.use(express.json());

function validateResponse(body) {
	const { name, height, sun, color } = body;

	if (typeof name !== "string" || !name.trim()) {
		return { valid: false, error: "Name is required" };
	}

	if (typeof height !== "number" || !Number.isFinite(height) || height <= 0) {
		return { valid: false, error: "Height must be a positive number" };
	}

	if (!validSun.includes(sun)) {
		return { valid: false, error: "Invalid sun exposure" };
	}

	if (!validColors.includes(color)) {
		return { valid: false, error: "Invalid flower color" };
	}

	return { valid: true, error: null };
}

//
// API endpoints
//

app.get("/plants", (_, res) => {
	res.status(200).json(plants);
});

app.get("/plants/:id", (req, res) => {
	const plantId = parseInt(req.params.id, 10);
	const plant = plants.find(({ id }) => id === plantId);

	if (!plant) {
		return res.status(404).json({ error: "Plant not found" });
	}

	res.status(200).json(plant);
});

app.post("/plants", (req, res) => {
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const { name, height, sun, color } = body;
	const newPlant = {
		id: plants.at(-1)?.id + 1,
		name,
		height,
		sun,
		color,
	};

	plants.push(newPlant);
	return res.status(201).json(newPlant);
});

app.put("/plants/:id", (req, res) => {
	const plantId = parseInt(req.params.id, 10);
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const plantIndex = plants.findIndex(({ id }) => id === plantId);

	if (plantIndex === -1) {
		return res.status(404).json({ error: "Plant not found" });
	}

	const { name, height, sun, color } = body;
	const updatedPlant = {
		...plants[plantIndex],
		name,
		height,
		sun,
		color,
	};

	plants[plantIndex] = updatedPlant;
	return res.status(200).json(updatedPlant);
});

app.delete("/plants/:id", (req, res) => {
	const plantId = parseInt(req.params.id, 10);
	const plantIndex = plants.findIndex(({ id }) => id === plantId);

	if (plantIndex === -1) {
		return res.status(404).json({ error: "Plant not found" });
	}

	plants = plants.filter(({ id }) => id !== plantId);
	return res.status(204).send();
});

// Launch the server
app.listen(port, () => {
	console.log(`Native Plant API is running at http://localhost:${port}`);
});