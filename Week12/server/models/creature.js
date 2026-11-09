import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	species: {
		type: String,
		trim: true
	},
	habitat: {
		type: String,
		trim: true
	},
	rarity: {
		type: String,
		enum: ["common", "uncommon", "rare"],
		required: true
	},
	description: {
		type: String,
		trim: true,
		default: "No description availab;e."
	},
	timestamps: true
});

export default mongoose.model("Creature", schema);