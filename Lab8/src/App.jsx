import { useState } from "react";

import "./App.css";

export default function App() {
	const plants = [
		{
			id: 1,
			name: "Cardinal Flower",
			scientificName: "Lobelia cardinalis",
			bloomSeason: "Summer",
			sun: "Full Sun",
			soil: "Moist"
		},

		{
			id: 2,
			name: "Scarlet Beebalm",
			scientificName: "Monarda didyma",
			bloomSeason: "Summer",
			sun: "Partial Shade",
			soil: "Moist"
		},

		{
			id: 3,
			name: "Eastern Red Columbine",
			scientificName: "Aquilegia canadensis",
			bloomSeason: "Spring",
			sun: "Partial Shade",
			soil: "Well-drained"
		},

		{
			id: 4,
			name: "Wild Bergamot",
			scientificName: "Monarda fistulosa",
			bloomSeason: "Summer",
			sun: "Full Sun",
			soil: "Dry"
		},

		{
			id: 5,
			name: "Mountain Laurel",
			scientificName: "Kalmia latifolia",
			bloomSeason: "Spring",
			sun: "Partial Shade",
			soil: "Acidic"
		},

		{
			id: 6,
			name: "Marsh Marigold",
			scientificName: "Caltha palustris",
			bloomSeason: "Spring",
			sun: "Full Sun",
			soil: "Wet"
		},

		{
			id: 7,
			name: "Flowering Dogwood",
			scientificName: "Cornus florida",
			bloomSeason: "Spring",
			sun: "Partial Shade",
			soil: "Well-drained"
		}
	];

	const [search, setSearch] = useState("");
	const [selectedSun, setSelectedSun] = useState("All");
	const [selectedSoil, setSelectedSoil] = useState("All");
	const [selectedBloomSeason, setSelectedBloomSeason] = useState("All");
	const [favorites, setFavorites] = useState([]);

	const filtered = plants.filter((plant) => {
		const normalizedSearch = search.toLowerCase();
		const matchesSearch = plant.name.toLowerCase().includes(normalizedSearch) || plant.scientificName.toLowerCase().includes(normalizedSearch);
		const matchesSun = selectedSun === "All" || plant.sun === selectedSun;
		const matchesSoil = selectedSoil === "All" || plant.soil === selectedSoil;
		const matchesBloomSeason = selectedBloomSeason === "All" || plant.bloomSeason === selectedBloomSeason;

		return matchesSearch && matchesSun && matchesSoil && matchesBloomSeason;
	});

	const toggleFavorite = (id) => {
		if (favorites.includes(id)) {
			setFavorites(favorites.filter((plantId) => plantId !== id));
		} else {
			setFavorites([...favorites, id]);
		}
	};

	const resetFilters = () => {
		setSearch("");
		setSelectedSun("All");
		setSelectedSoil("All");
		setSelectedBloomSeason("All");
	};

	return (
		<div className="app">
			<h1> Plant Directory </h1>
			<p> Search by plant name or filter by growing conditions </p>
			
			<div className="filters">
				<input
					type="text"
					placeholder="Search by common or scientific name..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select value={selectedSun} onChange={(e) => setSelectedSun(e.target.value)}>
					<option value="All">All sunlight</option>
					<option value="Full Sun">Full Sun</option>
					<option value="Partial Shade">Partial Shade</option>
				</select>

				<select value={selectedSoil} onChange={(e) => setSelectedSoil(e.target.value)}>
					<option value="All">All soil types</option>
					<option value="Moist">Moist</option>
					<option value="Well-drained">Well-drained</option>
					<option value="Dry">Dry</option>
					<option value="Wet">Wet</option>
					<option value="Acidic">Acidic</option>
				</select>

				<select value={selectedBloomSeason} onChange={(e) => setSelectedBloomSeason(e.target.value)}>
					<option value="All">All bloom seasons</option>
					<option value="Spring">Spring</option>
					<option value="Summer">Summer</option>
				</select>

				<button type="button" onClick={resetFilters}> Reset Filters </button>
			</div>

			<p> Plants found: {filtered.length} </p>
			<p> Favorites: {favorites.length} </p>

			{filtered.length === 0? (
				<p> No plants found. </p>
			) : (
				<div className="plant-list">
					{filtered.map(({ id, name, scientificName, bloomSeason, sun, soil }) => (
						<div key={id} className="plant-card">
							<h2> {name} </h2>
							<p className="scientific-name"> {scientificName} </p>
							<p> Bloom season: {bloomSeason} </p>
							<p> Sunlight: {sun} </p>
							<p> Soil: {soil} </p>
							<button onClick={() => toggleFavorite(id)}>
								{favorites.includes(id)? "Remove from Favorites" : "Add to Favorites"}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}