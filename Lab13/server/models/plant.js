import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minLength: 2,
		maxLength: 80
	},

	scientificName: {
		type: String,
		trim: true,
		required: true,
		minLength: 2,
		maxLength: 120
	},

	description: {
		type: String,
		trim: true,
		required: true
	},

	sunlight: {
		type: String,
		trim: true,
		required: true,
		maxLength: 40
	},

	soil: {
		type: String,
		trim: true,
		required: true,
		maxLength: 80
	},

	height: {
		type: Number,
		required: true,
		min: 0,
		max: 1000
	},
	
	bloomSeason: {
		type: String,
		trim: true,
		required: true,
		enum: [
			"Spring",
			"Spring to Summer",
			"Summer",
			"Summer to Fall",
			"Late Summer to Fall",
			"Fall",
			"Year-round"
		],
		maxLength: 40
	}
}, {
	timestamps: true
});

export default mongoose.model("Plant", plantSchema);
