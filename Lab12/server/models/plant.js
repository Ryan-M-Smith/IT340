import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	scientificName: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	sunlight: {
		type: String,
		trim: true,
		required: true
	},
	soil: {
		type: String,
		trim: true,
		required: true
	},
	height: {
		type: Number,
		required: true,
		min: 0
	},
	bloomSeason: {
		type: String,
		trim: true,
		required: true
	}
}, {
	timestamps: true
});

export default mongoose.model("Plant", schema);