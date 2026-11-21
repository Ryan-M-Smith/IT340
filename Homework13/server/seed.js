import dotenv from "dotenv";
import mongoose from "mongoose";

import Employee from "./models/employee.js";

dotenv.config();

const employees = [
	{
		name: "Avery Johnson",
		jobTitle: "Operations Manager",
		department: "Operations",
		email: "avery.johnson@example.com",
		phone: "(555) 101-2020",
		startDate: "2021-04-12",
		location: "Harrisburg, PA"
	},
	{
		name: "Jordan Lee",
		jobTitle: "Software Engineer",
		department: "Engineering",
		email: "jordan.lee@example.com",
		phone: "(555) 202-3030",
		startDate: "2022-08-15",
		location: "Philadelphia, PA"
	},
	{
		name: "Morgan Patel",
		jobTitle: "Marketing Specialist",
		department: "Marketing",
		email: "morgan.patel@example.com",
		phone: "(555) 303-4040",
		startDate: "2023-01-09",
		location: "Remote"
	},
	{
		name: "Casey Williams",
		jobTitle: "Human Resources Coordinator",
		department: "Human Resources",
		email: "casey.williams@example.com",
		phone: "(555) 404-5050",
		startDate: "2020-11-02",
		location: "Baltimore, MD"
	},
	{
		name: "Taylor Garcia",
		jobTitle: "Financial Analyst",
		department: "Finance",
		email: "taylor.garcia@example.com",
		phone: "(555) 505-6060",
		startDate: "2024-02-20",
		location: "Harrisburg, PA"
	},
	{
		name: "Riley Chen",
		jobTitle: "Customer Support Lead",
		department: "Support",
		email: "riley.chen@example.com",
		phone: "(555) 606-7070",
		startDate: "2021-09-13",
		location: "Remote"
	}
];

try {
	const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/EmployeeDatabase";
	await mongoose.connect(mongoUri);
	await Employee.deleteMany({});
	await Employee.insertMany(employees);
	console.log("Employee database seeded successfully.");
} catch (error) {
	console.error("Error seeding database:", error);
	process.exitCode = 1;
} finally {
	await mongoose.disconnect();
}
