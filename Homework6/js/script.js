/**
 * Filename: script.js
 * Description: Handle dynamic plant and stats rendering | IT-340 Homework #6
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

const plants = [
	{
		name: "Cardinal Flower",
		scientificName: "Lobelia cardinalis",
		description: "Slender spikes of bright red, irregularly shaped flowers draw our attention along stream banks and around the edges of wetlands. The cardinal flower likes to grow in clumps and because of its shape is pollinated by hummingbirds.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/dbf849b6/cardinal%20flower28944M4.jpg?v=638254494360000000",
		height: 2,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Scarlet Beebalm",
		scientificName: "Monarda didyma",
		description: "A moisture-loving perennial with vivid crimson blooms and highly aromatic mint-scented foliage. It forms dense colonies in moist thickets and stream edges, serving as a prime nectar source for hummingbirds and swallowtail butterflies.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/b2f4f27d/DSC07099.JPG?v=637779673790000000",
		height: 3,
		bloomSeason: "Summer",
		sun: "Partial Shade"
	},

	{
		name: "Eastern Red Columbine",
		scientificName: "Aquilegia canadensis",
		description: "A woodland perennial featuring distinctive nodding red and yellow bell-like blossoms with backward-projecting spurs. It thrives in well-drained rocky woods, slopes, and cliffs across Pennsylvania.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/e9469617/20200502_175215.jpg?v=638236206790000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "Wild Bergamot",
		scientificName: "Monarda fistulosa",
		description: "An aromatic herbaceous perennial with lavender to purple tubular flowers arranged in ragged crown-like terminal heads. Commonly found in sunny meadows, roadsides, and woodland borders, it is deer-resistant and loved by pollinators.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/47fd09fc/20180714_195058.jpg?v=637503457090000000",
		height: 4,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Spotted Joe-Pye-Weed",
		scientificName: "Eutrochium maculatum",
		description: "This wildflower is distinguished from other similar species by its deep purple or purple-spotted stem. The leaves of this species are about 8 inches long, thick and toothed and arise in whorls of four to five from a stem with a solid interior. These leaves taper at both ends and have short stalks.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/ff80bf15/48fdd4ca/joe%20pye%20weed63850M2.jpg?v=638025776370000000",
		height: 6,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Bullhead Pondlilly",
		scientificName: "Nuphar variegata",
		description: "A common water plant in the north-eastern part of Pennsylvania, yellow pondlily is usually found in waters up to 2m deep in eutrophic lakes with soft bottom sediments.  The leaves usually float on surface of the water but may occasionally be elevated above the surface.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/86821bf7/IMG_4044a.jpg?v=638253856950000000",
		height: 1,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Mountain Laurel",
		scientificName: "Kalmia latifolia",
		description: "Pennsylvania's state flower, this evergreen shrub displays flat-topped clusters of intricate white-to-pink hexagonal blossoms adorned with delicate rose spots and spring-loaded stamens, flourishing in acidic, rocky woodlands.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/1996d147/20170614_205043.jpg?v=637503448700000000",
		height: 15,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "Marsh Marigold",
		scientificName: "Caltha palustris",
		description: "A glabrous, semi-succulent perennial of wet woods, swamps, and stream edges. Produces glossy round or heart-shaped basal leaves topped by bright yellow buttercup-like flowers with glistening petal-like sepals.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/67497232/20230513_164404.jpg?v=638794195170000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Full Sun"
	},

	{
		name: "Northern Spicebush",
		scientificName: "Lindera benzoin",
		description: "A native deciduous understory shrub of moist woods and floodplains. Clusters of tiny fragrant greenish-yellow flowers appear along bare stems in early spring before the aromatic oval leaves unfold, followed by glossy red fall drupes.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/4bee0def/pn.jpg?v=638794284550000000",
		height: 10,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "Dutchman's Breeches",
		scientificName: "Dicentra cucullaria",
		description: "A graceful woodland spring ephemeral with finely divided, feathery foliage and racemes of unique white, nodding flowers with two flared spurs that resemble a pair of pantaloons hung upside down to dry.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/5de43d71/P1000351.JPG?v=637564673750000000",
		height: 1,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "Flowering Dogwood",
		scientificName: "Cornus florida",
		description: "A classic native understory tree with wide horizontal branches. Small yellowish-green center flowers are framed by four large, petal-like white bracts with notched tips, followed by bright red autumn berries.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/944afad3/DSC00304.JPG?v=637490254360000000",
		height: 30,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "American Dog Violet",
		scientificName: "Viola labradorica",
		description: "A low-growing native woodland violet with ovate-to-heart-shaped leaves and delicate spurred blossoms ranging from light blue to pale violet, blooming in early spring along woodland trails and moist clearings.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/ff80bf15/b31ed4f/violet,%20dog91039.jpg?v=638025155150000000",
		height: 0.67,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "Trumpetweed",
		scientificName: "Eupatorium fistulosum",
		description: "The terminal flower clusters are domed and less flattened than in the spotted Joe-Pye-weed. The cluster, in turn, is made of smaller groups of flowers about 1 inch in diameter. Individual pink to lavender flowers are many and tubular.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/f570f8f0/20240728_192147.jpg?v=638580661820000000",
		height: 6,
		bloomSeason: "Fall",
		sun: "Full Sun"
	},

	{
		name: "Blue Vervain",
		scientificName: "Verbena hastata",
		description: "An upright wet-meadow perennial producing candelabra-like spires of tiny violet to purplish-blue flowers that open gradually from base to apex atop square, grooved reddish-green stems.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/da22f93b/pn1.jpg?v=639194824960000000",
		height: 5,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Jack-in-the-Pulpit",
		scientificName: "Arisaema triphyllum",
		description: "An intriguing woodland plant featuring a striped green and purple-brown hooded spathe ('pulpit') enclosing an erect spadix ('Jack'). In late summer it produces a tight club of bright red berries.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/8e5c73bc/495068043_23967829672823319_7392868479259036372_n.jpg?v=638817201500000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Full Shade"
	},

	{
		name: "Virginia Bluebells",
		scientificName: "Mertensia virginica",
		description: "Virginia bluebells are graceful, herbaceous perennials with lush foliage and upright to slightly arching stems. As a spring ephemeral, they emerge with the warmth of early spring, adorning woodlands and streambanks with their delicate blooms before retreating into dormancy by mid-summer.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/e109e5e0/492489141_23925851923687761_8000658340570647568_n.jpg?v=638811977950000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Partial Shade"
	},

	{
		name: "New England Aster",
		scientificName: "Symphyotrichum novae-angliae",
		description: "One of the most showy asters of the season, sometimes one comes across whole fields of purple blooms.  Numerous entire leaves clasp the hairy stem of this aster.  The Monarch butterfly drinks the nectar of this flower during migration.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/8c829b1f/20200904_165351.jpg?v=638255750310000000",
		height: 4,
		bloomSeason: "Fall",
		sun: "Full Sun"
	},

	{
		name: "Common Milkweed",
		scientificName: "Asclepias syriaca",
		description: "Milkweed flowers, including those of common milkweed, feature a characteristic structure with five reflexed petals and five tubular hoods, each with a horn that arches over the central column. This central column, called the gynostegium, contains both the male (stamens) and female (carpels) reproductive parts. The intricate arrangement of petals, hoods, and horns plays a crucial role in the plant's specialized pollination process.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/c64c0518/4903416068_d2edc7fbdd_o.jpg?v=638256831530000000",
		height: 6,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "Black-Eyed Susan",
		scientificName: "Rudbeckia hirta",
		description: "Each single daisy-like flower of this perennial is borne on a slender, tall, bristly stalk. The leaves are also bristly and hairy. Common in fields, meadows, and along roadsides.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/b7bacc5b/P1000249.JPG?v=638259697670000000",
		height: 3,
		bloomSeason: "Summer",
		sun: "Full Sun"
	},

	{
		name: "King Solomon's Seal",
		scientificName: "Polygonatum biflorum",
		description: "King Solomon's seal is similar to the hairy Solomon's seal but is larger in length and flower size.  The latin epithet 'biflorum' is given after the pairs of flowers that hang down from the leaf axils.  The actual number of flowers per axil can vary from 2 to 10, with 2 being the most often encountered number.  The leaves of this species are glabrous while the undersides of the leaves of hairy Solomon's seal are pubescent on the veins.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/f2317556/499410044_10232627376725815_5616436546363966556_n.jpg?v=638833484590000000",
		height: 3,
		bloomSeason: "Spring",
		sun: "Full Shade"
	},
];

function displayPlants(displayList) {
	const plantContainer = document.getElementById("plant-container");
	plantContainer.innerHTML = "";

	if (displayList.length === 0) {
		plantContainer.innerHTML = "<p>No plants found. Try a different search.</p>";
		return;
	}

	displayList.forEach((plant) => {
		const plantCard = document.createElement("div");
		plantCard.classList.add("plant-card");

		plantCard.innerHTML = `
			<h2>${plant.name}</h2>
			<div class="content">
				<div class="plant-info">
					<p> <strong>Scientific Name:</strong> ${plant.scientificName} </p>
					<p> <strong>Description:</strong> ${plant.description} </p>
					<p> <strong>Height:</strong> ${plant.height} ft. </p>
					<p> <strong>Bloom Season:</strong> ${plant.bloomSeason} </p>
					<p> <strong>Sun Requirements:</strong> ${plant.sun} </p>
				</div>
				
				<img src="${plant.image}" alt="${plant.name}">
			</div>
		`;

		plantContainer.appendChild(plantCard);
	});
}

function displayStats() {
	const statsContainer = document.getElementById("stats-container");
	statsContainer.innerHTML = "";

	// Reduce plants into a sum of heights, then divide by the number of plants
	const avgHeight = plants.reduce((sum, { height }) => sum + height, 0) / plants.length;
	
	// Reduce plants, returning the taller of the previous or current plant. The result is
	// always the tallest plant.
	const tallest = plants.reduce((t, plant) => plant.height > t.height? plant : t, plants[0]);
	
	// Reduce plants, returning the shorter of the previous or current plant. The result is
	// always the shortest plant.
	const shortest = plants.reduce((s, plant) => plant.height < s.height? plant : s, plants[0]);

	// Reduce plants into a simple map of bloom seasons to counts
	const bloomSeasonCounts = plants.reduce((acc, { bloomSeason }) => {
		acc[bloomSeason] = (acc[bloomSeason] || 0) + 1;
		return acc;
	}, {});
	
	// Reduce plants into a simple map of sunlight requirements to counts
	const sunlightCounts = plants.reduce((acc, { sun }) => {
		acc[sun] = (acc[sun] || 0) + 1;
		return acc;
	}, {});

	//
	// Format stat counts as lists
	//

	const bloomStats = Object
		.entries(bloomSeasonCounts)
		.map(([season, count]) => `${season}: ${count}`)
		.join("<br/>");

	const sunStats = Object
		.entries(sunlightCounts)
		.map(([sun, count]) => `${sun}: ${count}`)
		.join("<br/>");

	// Render the stats
	statsContainer.innerHTML = `
		<h2>Plant Statistics</h2>
		<div class="stats">
			<p> <strong>Total Plants</strong> <br/> ${plants.length} </p>
			<p> <strong>Average Plant Height</strong> <br/> ${avgHeight.toFixed(2)} ft. </p>
			<p> <strong>Tallest Plant</strong> <br/> ${tallest.name} (${tallest.height} ft.) </p>
			<p> <strong>Shortest Plant</strong> <br/> ${shortest.name} (${shortest.height} ft.) </p>
			<p> <strong>Number of Plants by Bloom Season</strong> <br/> ${bloomStats} </p>
			<p> <strong>Number of Plants by Sunlight Requirement</strong> <br/> ${sunStats} </p>
		</div>
	`;
}

window.addEventListener("load", () => {
	displayPlants(plants);
	displayStats();
});