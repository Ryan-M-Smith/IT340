import dotenv from "dotenv";
import mongoose from "mongoose";

import Dog from "./models/dog.js";

dotenv.config();

const dogs = [
	{ name: "Max", breed: "Golden Retriever", age: 4, color: "tan", weight: 65, size: "Large" },
	{ name: "Bella", breed: "Labrador Retriever", age: 3, color: "black", weight: 60, size: "Large" },
	{ name: "Charlie", breed: "Beagle", age: 5, color: "brown", weight: 24, size: "Medium" },
	{ name: "Luna", breed: "German Shepherd", age: 2, color: "tan", weight: 70, size: "Large" },
	{ name: "Cooper", breed: "Bulldog", age: 6, color: "white", weight: 50, size: "Medium" },
	{ name: "Daisy", breed: "Poodle", age: 4, color: "white", weight: 15, size: "Small" },
	{ name: "Rocky", breed: "Rottweiler", age: 7, color: "black", weight: 95, size: "Large" },
	{ name: "Lucy", breed: "Dachshund", age: 1, color: "brown", weight: 12, size: "Small" },
	{ name: "Milo", breed: "Shih Tzu", age: 3, color: "white", weight: 13, size: "Small" },
	{ name: "Sadie", breed: "Boxer", age: 5, color: "tan", weight: 60, size: "Large" },
	{ name: "Tucker", breed: "Border Collie", age: 2, color: "black", weight: 40, size: "Medium" },
	{ name: "Molly", breed: "Cocker Spaniel", age: 8, color: "brown", weight: 27, size: "Medium" },
	{ name: "Bear", breed: "Siberian Husky", age: 4, color: "gray", weight: 55, size: "Large" },
	{ name: "Maggie", breed: "Australian Shepherd", age: 6, color: "brown", weight: 50, size: "Large" },
	{ name: "Duke", breed: "Great Dane", age: 3, color: "gray", weight: 140, size: "Large" },
	{ name: "Sophie", breed: "Chihuahua", age: 2, color: "tan", weight: 6, size: "Small" },
	{ name: "Oliver", breed: "Pomeranian", age: 5, color: "brown", weight: 8, size: "Small" },
	{ name: "Ruby", breed: "French Bulldog", age: 4, color: "brown", weight: 24, size: "Medium" },
	{ name: "Finn", breed: "Jack Russell Terrier", age: 1, color: "white", weight: 15, size: "Small" },
	{ name: "Willow", breed: "Mixed Breed", age: 7, color: "brown", weight: 45, size: "Medium" }
];

try {
	const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/DogDatabase";
	await mongoose.connect(mongoUri);
	await Dog.deleteMany({});
	await Dog.insertMany(dogs);
	console.log(`Database seeded successfully with ${dogs.length} dogs.`);
} catch (error) {
	console.error("Error seeding database:", error);
	process.exitCode = 1;
} finally {
	await mongoose.disconnect();
}
