import express from "express";

import Dog from "../models/dog.js";

const router = express.Router();

router.get("/", async (_, res) => {
	try {
		const dogs = await Dog.find().sort({ name: 1 });
		res.json(dogs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const dog = await Dog.findById(req.params.id);
		if (!dog) {
			return res.status(404).json({ message: "Dog not found" });
		}
		res.json(dog);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const dog = await Dog.create(req.body);
		res.status(201).json(dog);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const dog = await Dog.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!dog) {
			return res.status(404).json({ message: "Dog not found" });
		}
		res.json(dog);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const dog = await Dog.findByIdAndDelete(req.params.id);
		if (!dog) {
			return res.status(404).json({ message: "Dog not found" });
		}
		res.json({ message: "Dog deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
