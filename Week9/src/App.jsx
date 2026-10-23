import { useState } from "react"

import "./App.css"

export default function App() {
	const [dogImage, setDogImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getDog = async () => {
		setDogImage(null);
		setLoading(true);
		setError("");

		try {
			const response = await fetch("https://dog.ceo/api/breeds/image/random");
			
			if (!response.ok) {
				throw new Error("Failed to fetch dog image");
			}
			
			const { message: imageUrl } = await response.json();
			setDogImage(imageUrl);
		} catch (error) {
			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="app">
			<div className="dog-card">
				<h1> Random Dog Image </h1>
				<button onClick={getDog}> Random Dog </button>

				{loading && <p className="loading"> Loading dog image... </p>}
				{error && <p className="error"> {error} </p>}

				{/* Display the dog image, if available */}
				{dogImage && !loading && (
					<div>
						<h2> Your Random Dog </h2>
						<img className="dog-image" src={dogImage} alt="Random Dog"/>
					</div>
				)}
			</div>
		</main>
	);
}
