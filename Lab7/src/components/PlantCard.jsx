export default function PlantCard({ name, height, bloomSeason, sun, color }) {
	return (
		<article className="plant-card">
			<h2> {name} </h2>
			<p> Height: {height} feet </p>
			<p> Bloom Season: {bloomSeason} </p>
			<p> Sun: {sun} </p>
			<p> Color: {color} </p>
		</article>
	);
}