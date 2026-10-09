import PlantCard from "./PlantCard";

export default function PlantList() {
	const plants = [
		{
			name: "Cardinal Flower",
			height: 2,
			bloomSeason: "Summer",
			sun: "Full Sun",
			color: "Red"
		},

		{
			name: "Scarlet Beebalm",
			height: 3,
			bloomSeason: "Summer",
			sun: "Partial Shade",
			color: "Red"
		},

		{
			name: "Eastern Red Columbine",
			height: 2,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "Red"
		},

		{
			name: "Wild Bergamot",
			height: 4,
			bloomSeason: "Summer",
			sun: "Full Sun",
			color: "Purple"
		},

		{
			name: "Spotted Joe-Pye-Weed",
			height: 6,
			bloomSeason: "Summer",
			sun: "Full Sun",
			color: "Purple"
		},

		{
			name: "Bullhead Pondlilly",
			height: 1,
			bloomSeason: "Summer",
			sun: "Full Sun",
			color: "Yellow"
		},

		{
			name: "Mountain Laurel",
			height: 15,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "White"
		},

		{
			name: "Marsh Marigold",
			height: 2,
			bloomSeason: "Spring",
			sun: "Full Sun",
			color: "Yellow"
		},

		{
			name: "Northern Spicebush",
			height: 10,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "Yellow"
		},

		{
			name: "Dutchman's Breeches",
			height: 1,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "White"
		},

		{
			name: "Flowering Dogwood",
			height: 30,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "White"
		},

		{
			name: "American Dog Violet",
			height: 0.67,
			bloomSeason: "Spring",
			sun: "Partial Shade",
			color: "Blue"
		},
	];

	return (
		<section>
			<h2> Plants </h2>
			<div className="plant-list">
				{plants.map(({ name, height, bloomSeason, sun, color }) => (
					<PlantCard
						key={name}
						name={name}
						height={height}
						bloomSeason={bloomSeason}
						sun={sun}
						color={color}
					/>
				))}
			</div>
		</section>
	);
}