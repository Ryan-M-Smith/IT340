import MovieCard from "./MovieCard";

export default function MovieList() {
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

	return (
		<section>
			<h2> Movies </h2>
			<div className="movie-list">
				{movies.map(({ title, year, genre }, i) => (
					<MovieCard
						key={i}
						title={title}
						releaseYear={year}
						genre={genre}
					/>
				))}
			</div>
		</section>
	);
}