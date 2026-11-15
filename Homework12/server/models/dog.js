import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	breed: {
		type: String,
		trim: true,
		required: true
	},
	age: {
		type: Number,
		required: true,
		min: 0
	},
	color: {
		type: String,
		trim: true,
		required: true
	},
	weight: {
		type: Number,
		required: true,
		min: 0
	},
	size: {
		type: String,
		enum: ["Small", "Medium", "Large"],
		required: true
	}
}, {
	timestamps: true
});

export default mongoose.model("Dog", schema);
