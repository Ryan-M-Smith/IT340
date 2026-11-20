import dotenv from "dotenv";
import mongoose from "mongoose";

import Plant from "./models/plant.js";

dotenv.config();

const plants = [
	{
		name: "Eastern Red Columbine",
		scientificName: "Aquilegia canadensis",
		description: "A woodland perennial with red and yellow flowers that attracts hummingbirds.",
		sunlight: "Partial Shade",
		soil: "Well-drained",
		height: 3,
		bloomSeason: "Spring"
	},

	{
		name: "Butterfly Milkweed",
		scientificName: "Asclepias tuberosa",
		description: "A drought-tolerant native perennial with bright orange flowers for pollinator gardens.",
		sunlight: "Full Sun",
		soil: "Average to dry",
		height: 2,
		bloomSeason: "Summer"
	},

	{
		name: "Black-eyed Susan",
		scientificName: "Rudbeckia hirta",
		description: "A resilient flowering plant with golden petals that supports bees and butterflies.",
		sunlight: "Full Sun",
		soil: "Well-drained",
		height: 3,
		bloomSeason: "Summer to Fall"
	},

	{
		name: "Wild Bergamot",
		scientificName: "Monarda fistulosa",
		description: "A fragrant native perennial with lavender flowers that attracts bees, butterflies, and hummingbirds.",
		sunlight: "Full Sun",
		soil: "Well-drained",
		height: 4,
		bloomSeason: "Summer"
	},

	{
		name: "New England Aster",
		scientificName: "Symphyotrichum novae-angliae",
		description: "A tall late-season perennial with purple flowers that provides important nectar for pollinators.",
		sunlight: "Full Sun",
		soil: "Moist",
		height: 5,
		bloomSeason: "Late Summer to Fall"
	},
	
	{
		name: "Purple Coneflower",
		scientificName: "Echinacea purpurea",
		description: "A hardy prairie perennial with purple petals and a prominent center that attracts butterflies and birds.",
		sunlight: "Full Sun",
		soil: "Average to dry",
		height: 4,
		bloomSeason: "Summer"
	}
];

try {
	const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/NativePlantDatabase";
	await mongoose.connect(mongoUri);
	await Plant.deleteMany({});
	await Plant.insertMany(plants);
	console.log("Native plant database seeded successfully.");
} catch (error) {
	console.error("Error seeding database:", error);
	process.exitCode = 1;
} finally {
	await mongoose.disconnect();
}
