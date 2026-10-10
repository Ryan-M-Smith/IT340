/**
 * Filename: PlantCard.jsx
 * Description: A plant card | IT-340 Homework #7
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

export default function PlantCard({
	name,
	scientificName,
	description,
	image,
	height,
	bloomSeason,
	sun,
	color
}) {
	return (
		<div className="plant-card">
			<div className="title">
				<h2> {name} </h2>
				<span className="scientific"> {scientificName} </span>
			</div>

			<p className="description"> {description} </p>
			
			<div className="body">
				<div className="content">
					<span> <strong> Height: </strong> {height} </span>
					<span> <strong> Bloom Season: </strong> {bloomSeason} </span>
					<span> <strong> Sun: </strong> {sun} </span>
					<span> <strong> Color: </strong> {color} </span>
				</div>
				
				<img src={image} alt={name}/>
			</div>
		</div>
	);
}