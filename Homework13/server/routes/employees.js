import express from "express";

import verifyJwt from "../middleware/verify-jwt.js";
import Employee from "../models/employee.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const search = req.query.search?.trim();
		const filter = search
			? {
				$or: [
					{ name: { $regex: search, $options: "i" } },
					{ jobTitle: { $regex: search, $options: "i" } },
					{ department: { $regex: search, $options: "i" } },
					{ email: { $regex: search, $options: "i" } },
					{ phone: { $regex: search, $options: "i" } },
					{ startDate: { $regex: search, $options: "i" } },
					{ location: { $regex: search, $options: "i" } }
				]
			}
			: {};
		const employees = await Employee.find(filter).sort({ name: 1 });
		res.json(employees);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found." });
		}
		res.json(employee);
	} catch (error) {
		res.status(400).json({ message: "Invalid employee id." });
	}
});

router.post("/", verifyJwt, async (req, res) => {
	try {
		const employee = await Employee.create(req.body);
		res.status(201).json(employee);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", verifyJwt, async (req, res) => {
	try {
		const employee = await Employee.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!employee) {
			return res.status(404).json({ message: "Employee not found." });
		}

		res.json(employee);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", verifyJwt, async (req, res) => {
	try {
		const employee = await Employee.findByIdAndDelete(req.params.id);

		if (!employee) {
			return res.status(404).json({ message: "Employee not found." });
		}

		res.json({ message: "Employee deleted successfully." });
	} catch (error) {
		res.status(400).json({ message: "Invalid employee id." });
	}
});

export default router;
