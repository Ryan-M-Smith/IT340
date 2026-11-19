import dotenv from "dotenv";
import mongoose from "mongoose";

import Creature from "./models/creature.js";

dotenv.config();

const creatures = [
	{
		name: "Dragon",
		species: "Reptile",
		habitat: "Mountains",
		rarity: "rare",
		description: "A mythical creature that breathes fire."
	},

	{
		name: "Unicorn",
		species: "Mammal",
		habitat: "Forests",
		rarity: "rare",
		description: "A legendary horse-like creature with a single horn."
	},

	{
		name: "Phoenix",
		species: "Bird",
		habitat: "Deserts",
		rarity: "rare",
		description: "A mythical bird that is reborn from its ashes."
	}
];

try {
	const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/CreatureDatabase";
	await mongoose.connect(mongoUri);
	await Creature.deleteMany({});
	await Creature.insertMany(creatures);
	console.log("Database seeded successfully.");
} catch (error) {
	console.error("Error seeding database:", error);
	process.exitCode = 1;
}
