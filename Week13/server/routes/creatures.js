import express from "express";

import verifyJWT from "../middleware/verifyJWT.js";
import Creature from "../models/creature.js";

const router = express.Router();

// GET all creatures
router.get("/", async (req, res) => {
	try {
		const search = req.query.search?.trim();
		const filter = search
			? {
				$or: [
					{ name: { $regex: search, $options: "i" } },
					{ species: { $regex: search, $options: "i" } },
					{ habitat: { $regex: search, $options: "i" } }
				]
			}
			: {};
		const creatures = await Creature.find(filter).sort({ name: 1 });
		res.json(creatures);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET a specific creature by ID
router.get("/:id", async (req, res) => {
	try {
		const creature = await Creature.findById(req.params.id);
		if (!creature) {
			return res.status(404).json({ message: "Creature not found" });
		}
		res.json(creature);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// POST a new creature
router.post("/", verifyJWT, async (req, res) => {
	const creature = new Creature(req.body);
	try {
		const newCreature = await creature.save();
		res.status(201).json(newCreature);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// PUT (update) a specific creature by ID
router.put("/:id", verifyJWT, async (req, res) => {
	try {
		const updatedCreature = await Creature.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!updatedCreature) {
			return res.status(404).json({ message: "Creature not found" });
		}

		res.json(updatedCreature);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE a specific creature by ID
router.delete("/:id", verifyJWT, async (req, res) => {
	try {
		const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
		
		if (!deletedCreature) {
			return res.status(404).json({ message: "Creature not found" });
		}
		
		res.json({ message: "Creature deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;