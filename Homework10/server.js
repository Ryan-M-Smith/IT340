import express from "express";

const app = express();
const port = 3000;

let dogs = [
	{ id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, isAdopted: true },
	{ id: 2, name: "Luna", breed: "Labrador Retriever", age: 2, isAdopted: false },
	{ id: 3, name: "Max", breed: "German Shepherd", age: 5, isAdopted: true },
	{ id: 4, name: "Bella", breed: "Beagle", age: 1, isAdopted: false },
	{ id: 5, name: "Charlie", breed: "Poodle", age: 4, isAdopted: true },
	{ id: 6, name: "Daisy", breed: "Dachshund", age: 2, isAdopted: false },
	{ id: 7, name: "Rocky", breed: "Boxer", age: 6, isAdopted: true },
	{ id: 8, name: "Milo", breed: "Corgi", age: 3, isAdopted: false },
	{ id: 9, name: "Lucy", breed: "Border Collie", age: 2, isAdopted: true },
	{ id: 10, name: "Cooper", breed: "Bulldog", age: 5, isAdopted: false },
	{ id: 11, name: "Sadie", breed: "Shih Tzu", age: 1, isAdopted: false },
	{ id: 12, name: "Tucker", breed: "Siberian Husky", age: 4, isAdopted: true },
	{ id: 13, name: "Rosie", breed: "Australian Shepherd", age: 3, isAdopted: false },
	{ id: 14, name: "Oliver", breed: "Great Dane", age: 7, isAdopted: true },
	{ id: 15, name: "Molly", breed: "Boston Terrier", age: 2, isAdopted: false },
];

app.use(express.json());

function validateResponse(body) {
	const { name, breed, age } = body;

	if (typeof name !== "string" || !name.trim()) {
		return { valid: false, error: "Name is required" };
	}

	if (typeof breed !== "string" || !breed.trim()) {
		return { valid: false, error: "Breed is required" };
	}

	if (!Number.isInteger(age) || age < 0) {
		return { valid: false, error: "Invalid age" };
	}

	return { valid: true, error: null };
}

//
// API endpoints
//

app.get("/dogs", (_, res) => {
	res.status(200).json(dogs);
});

app.get("/dogs/:id", (req, res) => {
	const dogId = parseInt(req.params.id, 10);
	const dog = dogs.find(({ id }) => id === dogId);

	if (!dog) {
		return res.status(404).json({ error: "Dog not found" });
	}

	res.status(200).json(dog);
});

app.post("/dogs", (req, res) => {
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const { name, breed, age, isAdopted } = body;
	const newDog = {
		id: dogs.at(-1)?.id + 1,
		name,
		breed,
		age,
		isAdopted: isAdopted ?? false, 
	};

	dogs.push(newDog);
	return res.status(201).json(newDog);
});

app.put("/dogs/:id", (req, res) => {
	const dogId = parseInt(req.params.id, 10);
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const index = dogs.findIndex(({ id }) => id === dogId);

	if (index === -1) {
		return res.status(404).json({ error: "Dog not found" });
	}

	const { name, breed, age, isAdopted } = body;
	const updatedDog = {
		...dogs[index],
		name,
		breed,
		age,
		isAdopted: isAdopted ?? dogs[index].isAdopted,
	};

	dogs[index] = updatedDog;
	return res.status(200).json(updatedDog);
});

app.delete("/dogs/:id", (req, res) => {
	const dogId = parseInt(req.params.id, 10);
	const index = dogs.findIndex(({ id }) => id === dogId);

	if (index === -1) {
		return res.status(404).json({ error: "Dog not found" });
	}

	const [removed] = dogs.splice(index, 1);
	return res.status(200).json({
		message: "Dog deleted successfully",
		dog: removed
	});
});

// Launch the server
app.listen(port, () => {
	console.log(`Dog API is running at http://localhost:${port}`);
});