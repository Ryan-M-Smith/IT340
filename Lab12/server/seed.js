import dotenv from "dotenv";
import mongoose from "mongoose";

import Plant from "./models/plant.js";

dotenv.config();

const plants = [
	{
		name: "Cardinal Flower",
		scientificName: "Lobelia cardinalis",
		description: "Slender spikes of bright red, irregularly shaped flowers draw our attention along stream banks and around the edges of wetlands. The cardinal flower likes to grow in clumps and because of its shape is pollinated by hummingbirds.",
		sunlight: "Full Sun",
		soil: "Moist",
		height: 2,
		bloomSeason: "Summer"
	},

	{
		name: "Scarlet Beebalm",
		scientificName: "Monarda didyma",
		description: "A moisture-loving perennial with vivid crimson blooms and highly aromatic mint-scented foliage. It forms dense colonies in moist thickets and stream edges, serving as a prime nectar source for hummingbirds and swallowtail butterflies.",
		sunlight: "Partial Shade",
		soil: "Moist",
		height: 3,
		bloomSeason: "Summer"
	},

	{
		name: "Eastern Red Columbine",
		scientificName: "Aquilegia canadensis",
		description: "A woodland perennial featuring distinctive nodding red and yellow bell-like blossoms with backward-projecting spurs. It thrives in well-drained rocky woods, slopes, and cliffs across Pennsylvania.",
		sunlight: "Partial Shade",
		soil: "Well-drained",
		height: 2,
		bloomSeason: "Spring"
	},

	{
		name: "Wild Bergamot",
		scientificName: "Monarda fistulosa",
		description: "An aromatic herbaceous perennial with lavender to purple tubular flowers arranged in ragged crown-like terminal heads. Commonly found in sunny meadows, roadsides, and woodland borders, it is deer-resistant and loved by pollinators.",
		sunlight: "Full Sun",
		soil: "Average to dry",
		height: 4,
		bloomSeason: "Summer"
	},
	
	{
		name: "Spotted Joe-Pye-Weed",
		scientificName: "Eutrochium maculatum",
		description: "This wildflower is distinguished from other similar species by its deep purple or purple-spotted stem. The leaves of this species are about 8 inches long, thick and toothed and arise in whorls of four to five from a stem with a solid interior.",
		sunlight: "Full Sun",
		soil: "Moist",
		height: 6,
		bloomSeason: "Summer"
	}
];

try {
	const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/PlantDatabase";
	await mongoose.connect(mongoUri);
	
	const count = await Plant.countDocuments();

	if (count > 0) {
		console.log("Reseeding database...");
		await Plant.deleteMany({});
	}
	
	await Plant.insertMany(plants);
	console.log("Database seeded successfully.");
} catch (error) {
	console.error("Error seeding database:", error);
	process.exitCode = 1;
} finally {
	await mongoose.disconnect();
}
