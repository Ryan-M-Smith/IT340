import { useState, useEffect } from "react"

import "./App.css"

export default function App() {
	const [plants, setPlants] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		plants.map((plant) => {
			const { name, preferred_common_name, default_photo } = plant;
			const { attribution, url } = default_photo;
			console.log(name, preferred_common_name, attribution, url);
		});
	}, [plants]);

	// Simple helper to convert text to title case, because the API sometimes
	// returns the common names with weird formatting
	const titleCase = (text) => (
		text.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	);

	const fetchPlants = async () => {
		setPlants([]);
		setLoading(true);
		setError("");

		try {
			const response = await fetch("https://api.inaturalist.org/v1/taxa?q=rose&taxon_id=47126&rank=species&per_page=12&locale=en");
			
			if (!response.ok) {
				throw new Error("Failed to fetch dog image");
			}
			
			const { results } = await response.json();
			setPlants(results);
		} catch (error) {
			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<h1> Native Plant API </h1>
			<button onClick={fetchPlants}> Fetch Plants </button>

			{plants && (
				<div className="plant-container">
					{plants.map((plant) => {
						const {
							id,
							name: scientificName,
							preferred_common_name: name,
							default_photo
						} = plant;
						const { attribution, medium_url: src } = default_photo;

						return (
							<div key={id} className="plant-card">
								<h2> {titleCase(name)} </h2>
								<h3 className="scientific"> {scientificName} </h3>
								<img className="plant-image" src={src} alt={name}/>

								{/* Render the attribution with a real copyright symbol */}
								<p className="attribution"> {attribution.replace("(c)", "\u00a9")} </p>
							</div>
						);
					})}
				</div>
			)}

			{loading && <span className="loading"> Loading... </span>}
			{error && <span className="error"> Error: {error} </span>}
		</main>
	);
}
