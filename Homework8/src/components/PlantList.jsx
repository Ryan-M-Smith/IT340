import PlantCard from "./PlantCard";

export default function PlantList({ plants }) {
	return (
		<section>
			<div className="plant-list">
				{plants && plants.length > 0? (
					plants.map((plant) => (
						<PlantCard
							key={plant.name}
							name={plant.name}
							scientificName={plant.scientificName}
							description={plant.description}
							image={plant.image}
							height={plant.height}
							bloomSeason={plant.bloomSeason}
							sun={plant.sun}
							soil={plant.soil}
							color={plant.color}
						/>
					))
				) : (
					<p> No plants found. </p>
				)}
			</div>
		</section>
	);
}