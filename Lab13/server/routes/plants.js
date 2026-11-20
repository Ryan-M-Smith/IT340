import express from "express";

import verifyJwt from "../middleware/verify-jwt.js";
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
			return res.status(404).json({ message: "Plant not found." });
		}
		res.json(plant);
	} catch (error) {
		res.status(400).json({ message: "Invalid plant id." });
	}
});

router.post("/", verifyJwt, async (req, res) => {
	try {
		const plant = await Plant.create(req.body);
		res.status(201).json(plant);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", verifyJwt, async (req, res) => {
	try {
		const plant = await Plant.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!plant) {
			return res.status(404).json({ message: "Plant not found." });
		}

		res.json(plant);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", verifyJwt, async (req, res) => {
	try {
		const plant = await Plant.findByIdAndDelete(req.params.id);

		if (!plant) {
			return res.status(404).json({ message: "Plant not found." });
		}

		res.json({ message: "Plant deleted successfully." });
	} catch (error) {
		res.status(400).json({ message: "Invalid plant id." });
	}
});

export default router;
