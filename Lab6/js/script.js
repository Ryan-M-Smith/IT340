const plants = [
	{
		name: "Cardinal Flower",
		sun: "Full Sun",
		bloomSeason: "Summer",
		height: 4
	},

	{
		name: "Scarlet Beebalm",
		bloomSeason: "Summer",
		sun: "Partial Shade",
		height: 3
	},

	{
		name: "Eastern Red Columbine",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 2
	},

	{
		name: "Wild Bergamot",
		bloomSeason: "Summer",
		sun: "Full Sun",
		height: 4
	},

	{
		name: "Spotted Joe-Pye-Weed",
		bloomSeason: "Summer",
		sun: "Full Sun",
		height: 7
	},

	{
		name: "Bullhead Pondlilly",
		bloomSeason: "Summer",
		sun: "Full Sun",
		height: 3
	},

	{
		name: "Mountain Laurel",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 12
	},

	{
		name: "Marsh Marigold",
		bloomSeason: "Spring",
		sun: "Full Sun",
		height: 2
	},

	{
		name: "Northern Spicebush",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 12
	},

	{
		name: "Dutchman's Breeches",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 1
	},

	{
		name: "Flowering Dogwood",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 25
	},

	{
		name: "American Dog Violet",
		bloomSeason: "Spring",
		sun: "Partial Shade",
		height: 1
	},

	{
		name: "Trumpetweed",
		bloomSeason: "Fall",
		sun: "Full Sun",
		height: 6
	},

	{
		name: "Blue Vervain",
		bloomSeason: "Summer",
		sun: "Full Sun",
		height: 5
	},

	{
		name: "Jack-in-the-Pulpit",
		bloomSeason: "Spring",
		sun: "Full Shade",
		height: 3
	}
];

function displayPlants(plants) {
	const plantList = document.getElementById("plant-list");
	plantList.innerHTML = plants.map(({ name, bloomSeason, sun, height }) => `
		<div class="plant">
			<h2>${name}</h2>
			<p>Bloom Season: ${bloomSeason}</p>
			<p>Sunlight Requirement: ${sun}</p>
			<p>Height: ${height} ft.</p>
		</div>
	`).join("");
}

function allPlants() {
	displayPlants(plants);
}

function sortAZ() {
	const sorted = [...plants].sort((a, b) => a.name.localeCompare(b.name));
	displayPlants(sorted);
}

function findPlant() {
	const plantName = prompt("Enter a plant name to search for:");

	if (!plantName) {
		alert("No plant name entered. Please try again.");
		return;
	}

	const plant = plants.find((plant) => plant.name.toLowerCase() === plantName.toLowerCase());

	if (!plant) {
		alert("No plant name entered. Please try again.");
		return;
	}

	return displayPlants([plant]);
}

function filterBySunlight() {
	const sun = prompt("Enter a sunlight requirement to filter by (e.g., Full Sun, Partial Shade, Full Shade):");
	
	if (!sun) {
		alert("No sunlight requirement entered. Please try again.");
		return;
	}
	
	const filtered = plants.filter((plant) => plant.sun.toLowerCase() === sun.toLowerCase());
	displayPlants(filtered);
}

function filterByBloom() {
	const bloomSeason = prompt("Enter a bloom season to filter by (e.g., Spring, Summer, Fall):");

	if (!bloomSeason) {
		alert("No bloom season entered. Please try again.");
		return;
	}

	const filtered = plants.filter((plant) => plant.bloomSeason.toLowerCase() === bloomSeason.toLowerCase());
	displayPlants(filtered);
}

function filterByHeight() {
	const height = Number(prompt("Enter a height in feet to filter by (e.g., 3):"));

	if (!height) {
		alert("No height entered. Please try again.");
		return;
	}

	const filtered = plants.filter((plant) => plant.height === height);
	displayPlants(filtered);
}

function showPlantStats() {
	const averageHeight = plants.reduce((sum, plant) => sum + plant.height, 0) / plants.length;

	const stats = document.getElementById("stats");
	stats.innerHTML = `
		<h2>Plant Stats</h2>
		<p>Total plants: ${plants.length}</p>
		<p>Average height: ${averageHeight.toFixed(2)} ft.</p>
	`;
}

window.addEventListener("load", () => allPlants());