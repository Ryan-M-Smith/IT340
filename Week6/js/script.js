const movies = [
	{
		title: "Inception",
		director: "Christopher Nolan",
		genre: "Science Fiction",
		year: 2010,
		rating: 8.8,
	},

	{
		title: "The Matrix",
		director: "The Wachowskis",
		genre: "Action",
		year: 1999,
		rating: 8.7,
	},

	{
		title: "The Godfather",
		director: "Francis Ford Coppola",
		genre: "Crime",
		year: 1972,
		rating: 9.2,
	},

	{
		title: "Toy Story",
		director: "John Lasseter",
		genre: "Animation",
		year: 1995,
		rating: 8.3,
	},

	{
		title: "Pulp Fiction",
		director: "Quentin Tarantino",
		genre: "Crime",
		year: 1994,
		rating: 8.9,
	},

	{
		title: "Finding Nemo",
		director: "Andrew Stanton",
		genre: "Animation",
		year: 2003,
		rating: 8.1,
	},

	{
		title: "M3GAN",
		director: "Gerard Johnstone",
		genre: "Horror",
		year: 2023,
		rating: 6.8,
	}
];

function displayMovies(movies) {
	const movieList = document.getElementById("movie-list");
	movieList.innerHTML = "";

	movies.forEach((movie) => {
		movieList.innerHTML += `
			<div class="movie">
				<h2> ${movie.title} </h2>
				<p> Genre: ${movie.genre} </p>
				<p> Year: ${movie.year} </p>
				<p class="rating"> Rating: ${movie.rating} </p>
			</div>
		`;
	});
}

function allMovies() {
	displayMovies(movies);
}

function sortAZ() {
	const sorted = [...movies].sort((a, b) => a.title.localeCompare(b.title));
	displayMovies(sorted);
}

function filterByGenre() {
	const genre = prompt("Enter a genre to filter by (e.g., Action, Drama, Animation):");
	
	if (!genre) {
		alert("No genre entered. Please try again.");
		return;
	}
	
	const filtered = movies.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
	displayMovies(filtered);
}

function filterByYear() {
	const year = Number(prompt("Enter a year to filter by (e.g., 1994):"));

	if (!year) {
		alert("No year entered. Please try again.");
		return;
	}

	const filtered = movies.filter((movie) => movie.year === year);
	displayMovies(filtered);
}

function filterByRating() {
	displayMovies(movies.filter((movie) => movie.rating >= 8));
}

function findMovie() {
	const title = prompt("Enter the title of the movie to find:");
	const found = movies.find((movie) => movie.title.toLowerCase() === title.toLowerCase());

	if (found) {
		displayMovies([found]);
	} else {
		alert("Movie not found.");
	}
}

function showMovieStats() {
	const averageRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length;

	const stats = document.getElementById("stats");
	stats.innerHTML = `
		<h2>Movie Stats</h2>
		<p>Total movies: ${movies.length}</p>
		<p>Average rating: ${averageRating.toFixed(2)}</p>
	`;
}

window.addEventListener("load", () => allMovies());