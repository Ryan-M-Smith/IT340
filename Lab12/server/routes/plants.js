import express from "express";

import Plant from "../models/plant.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const search = req.query.search?.trim();
		const filter = search
			? {
				$or: [
					{ name: { $regex: search, $options: "i" } },
					{ scientificName: { $regex: search, $options: "i" } },
					{ description: { $regex: search, $options: "i" } },
					{ sunlight: { $regex: search, $options: "i" } },
					{ soil: { $regex: search, $options: "i" } },
					{ bloomSeason: { $regex: search, $options: "i" } }
				]
			}
			: {};
		const plants = await Plant.find(filter).sort({ name: 1 });
		res.json(plants);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const plant = await Plant.findById(req.params.id);
		if (!plant) {
			return res.status(404).json({ message: "Plant not found" });
		}
		res.json(plant);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const plant = new Plant(req.body);
	try {
		const newPlant = await plant.save();
		res.status(201).json(newPlant);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedPlant = await Plant.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!updatedPlant) {
			return res.status(404).json({ message: "Plant not found" });
		}

		res.json(updatedPlant);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
		
		if (!deletedPlant) {
			return res.status(404).json({ message: "Plant not found" });
		}
		
		res.json({ message: "Plant deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;