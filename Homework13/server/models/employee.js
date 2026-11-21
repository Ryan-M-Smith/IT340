import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minLength: 2,
		maxLength: 80
	},
	jobTitle: {
		type: String,
		trim: true,
		required: true,
		minLength: 2,
		maxLength: 80
	},
	department: {
		type: String,
		trim: true,
		required: true,
		enum: [
			"Administration",
			"Engineering",
			"Finance",
			"Human Resources",
			"Marketing",
			"Operations",
			"Sales",
			"Support"
		]
	},
	email: {
		type: String,
		trim: true,
		required: true,
		lowercase: true,
		maxLength: 120
	},
	phone: {
		type: String,
		trim: true,
		required: true,
		maxLength: 30
	},
	startDate: {
		type: String,
		trim: true,
		required: true
	},
	location: {
		type: String,
		trim: true,
		required: true,
		minLength: 2,
		maxLength: 120
	}
}, {
	timestamps: true
});

export default mongoose.model("Employee", employeeSchema);
