const movies = [
	{
		title: "Inception",
		director: "Christopher Nolan",
		genre: "Science Fiction",
		releaseYear: 2010,
		rating: 8.8,
		runtime: 148,
		description: "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
	},

	{
		title: "The Matrix",
		director: "The Wachowskis",
		genre: "Action",
		releaseYear: 1999,
		rating: 8.7,
		runtime: 136,
		description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
	},

	{
		title: "The Godfather",
		director: "Francis Ford Coppola",
		genre: "Crime",
		releaseYear: 1972,
		rating: 9.2,
		runtime: 175,
		description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
	},

	{
		title: "Toy Story",
		director: "John Lasseter",
		genre: "Animation",
		releaseYear: 1995,
		rating: 8.3,
		runtime: 81,
		description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
	},

	{
		title: "Pulp Fiction",
		director: "Quentin Tarantino",
		genre: "Crime",
		releaseYear: 1994,
		rating: 8.9,
		runtime: 154,
		description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
	},

	{
		title: "Finding Nemo",
		director: "Andrew Stanton",
		genre: "Animation",
		releaseYear: 2003,
		rating: 8.1,
		runtime: 100,
		description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
	}
];

// Fetch filter elements from the DOM
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const yearFilter = document.getElementById("year-filter");
const resetButton = document.getElementById("reset-button");
const movieCount = document.getElementById("movie-count");

function filterMovies() {
	const query = searchInput.value.toLowerCase();
	const genre = genreFilter.value;
	const year = parseInt(yearFilter.value);

	const filtered = movies.filter((movie) => {
		const matchesSearch = movie.title.toLowerCase().includes(query);
		const matchesGenre = genre === "All" || movie.genre === genre;
		let matchesYear = true;

		if (year === 1990) {
			matchesYear = movie.releaseYear < 2000;
		} else if (year === 2000) {
			matchesYear = movie.releaseYear >= 2000;
		}

		return matchesSearch && matchesGenre && matchesYear;
	});

	movieCount.textContent = `Movies Found: ${filtered.length}`;
	displayMovies(filtered);
}

function displayMovies(movies) {
	const container = document.getElementById("movie-container");
	container.innerHTML = "";

	if (movies.length === 0) {
		container.innerHTML = "<p>No movies found. Try a different search.</p>";
		return;
	}

	movies.forEach((movie) => {
		const movieCard = document.createElement("div");
		movieCard.classList.add("movie-card");

		movieCard.innerHTML = `
			<h2> ${movie.title} </h2>
			<p><strong>Director:</strong> ${movie.director}</p>
			<p><strong>Genre:</strong> ${movie.genre}</p>
			<p><strong>Release Year:</strong> ${movie.releaseYear}</p>
			<p><strong>Rating:</strong> ${movie.rating}</p>
			<p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
			<p>${movie.description}</p>
		`;

		container.appendChild(movieCard);
	});
}

// On load, show all movies
window.addEventListener("load", () => displayMovies(movies));

// Add event listeners for filtering
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
yearFilter.addEventListener("change", filterMovies);

// On reset, clear all filters and display all movies
resetButton.addEventListener("click", () => {
	searchInput.value = "";
	genreFilter.value = "All";
	yearFilter.value = "All";
	filterMovies();
});