export default function MovieCard({ title, releaseYear, genre }) {
	return (
		<article className="movie-card">
			<h2> {title} </h2>
			<p> Release Year: {releaseYear} </p>
			<p> Genre: {genre} </p>
		</article>
	);
}