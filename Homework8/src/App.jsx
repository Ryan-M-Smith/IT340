/**
 * Filename: App.jsx
 * Description: The main App component | IT-340 Homework #8
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

import { useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import PlantList from "./components/PlantList";

import plants from "../lib/plants";

export default function App() {
	const [query, setQuery] = useState("");
	const [bloomSeason, setBloomSeason] = useState("all");
	const [sun, setSun] = useState("all");
	const [soil, setSoil] = useState("all");
	
	const filtered = plants.filter((plant) => {
		const matchesQuery = plant.name.toLowerCase().includes(query) || plant.scientificName.toLowerCase().includes(query);
		const matchesBloomSeason = bloomSeason === "all" || plant.bloomSeason.toLowerCase() === bloomSeason;
		const matchesSun = sun === "all" || plant.sun.toLowerCase() === sun;
		const matchesSoil = soil === "all" || plant.soil.toLowerCase() === soil;

		return matchesQuery && matchesBloomSeason && matchesSun && matchesSoil;
	});

	const onReset = (event) => {
		event.preventDefault();
		setQuery("");
		setBloomSeason("all");
		setSun("all");
		setSoil("all");
	}

	return (
		<div className="app">
			<Header/>

			<main>
				<form className="filters" onReset={onReset}>
					<input
						id="search"
						type="text"
						placeholder="Search by common or scientific name"
						value={query}
						onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
					/>

					<select
						id="bloom-filter"
						value={bloomSeason}
						onChange={(e) => setBloomSeason(e.target.value)}
					>
						<option value="all"> All seasons </option>
						<option value="spring"> Spring </option>
						<option value="summer"> Summer </option>
					</select>

					<select
						id="sun-filter"
						value={sun}
						onChange={(e) => setSun(e.target.value)}
					>
						<option value="all"> All sunlight </option>
						<option value="full sun"> Full Sun </option>
						<option value="partial shade"> Partial Shade </option>
					</select>

					<select
						id="soil-filter"
						value={soil}
						onChange={(e) => setSoil(e.target.value)}
					>
						<option value="all"> All soil types </option>
						<option value="moist"> Moist </option>
						<option value="well-drained"> Well-drained </option>
						<option value="dry"> Dry </option>
						<option value="wet"> Wet </option>
						<option value="acidic"> Acidic </option>
					</select>

					<button id="reset" type="reset"> Reset </button>
				</form>

				<PlantList plants={filtered}/>
			</main>

			<Footer/>
		</div>
	);
}
