import { useState } from "react";

import "./App.css"

export default function App() {
	const movies = [
		{
			id: 1,
			title: "Inception",
			director: "Christopher Nolan",
			genre: "Science Fiction",
			year: 2010,
			rating: 8.8,
		},

		{
			id: 2,
			title: "The Matrix",
			director: "The Wachowskis",
			genre: "Action",
			year: 1999,
			rating: 8.7,
		},

		{
			id: 3,
			title: "The Godfather",
			director: "Francis Ford Coppola",
			genre: "Crime",
			year: 1972,
			rating: 9.2,
		},

		{
			id: 4,
			title: "Toy Story",
			director: "John Lasseter",
			genre: "Animation",
			year: 1995,
			rating: 8.3,
		},

		{
			id: 5,
			title: "Pulp Fiction",
			director: "Quentin Tarantino",
			genre: "Crime",
			year: 1994,
			rating: 8.9,
		},

		{
			id: 6,
			title: "Finding Nemo",
			director: "Andrew Stanton",
			genre: "Animation",
			year: 2003,
			rating: 8.1,
		},

		{
			id: 7,
			title: "M3GAN",
			director: "Gerard Johnstone",
			genre: "Horror",
			year: 2023,
			rating: 6.8,
		}
	];

	const [search, setSearch] = useState("");
	const [selectedGenre, setSelectedGenre] = useState("All");
	const [favorites, setFavorites] = useState([]);

	const filtered = movies.filter((movie) => {
		const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
		const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
		return matchesSearch && matchesGenre;
	});

	const toggleFavorite = (id) => {
		if (favorites.includes(id)) {
			// If the movie is already in favorites, remove it from the list
			setFavorites(favorites.filter((movieId) => movieId !== id));
		} else {
			// If the movie is not in favorites, add it to the list
			setFavorites([...favorites, id]);
		}
	};

	return (
		<div className="app">
			<h1> Movie Finder </h1>
			<p> Search for a movie or filter by genre </p>

			<input
				type="text"
				placeholder="Search for a movie..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
				<option value="All">All</option>
				<option value="Science Fiction">Science Fiction</option>
				<option value="Action">Action</option>
				<option value="Crime">Crime</option>
				<option value="Animation">Animation</option>
				<option value="Horror">Horror</option>
			</select>

			<p> Movies found: {filtered.length} </p>
			<p> Favorites: {favorites.length} </p>

			{filtered.length === 0? (
				<p> No movies found. </p>
			) : (
				<div className="movie-list">
					{filtered.map(({ id, title, genre, year }) => (
						<div key={id} className="movie-card">
							<h2> {title} </h2>
							<p> Genre: {genre} </p>
							<p> Year: {year} </p>
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
