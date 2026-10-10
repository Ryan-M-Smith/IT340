import PlantCard from "./PlantCard";

const plants = [
	{
		name: "Cardinal Flower",
		scientificName: "Lobelia cardinalis",
		description: "Slender spikes of bright red, irregularly shaped flowers draw our attention along stream banks and around the edges of wetlands. The cardinal flower likes to grow in clumps and because of its shape is pollinated by hummingbirds.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/dbf849b6/cardinal%20flower28944M4.jpg?v=638254494360000000",
		height: 2,
		bloomSeason: "Summer",
		sun: "Full Sun",
		color: "Red"
	},
	{
		name: "Scarlet Beebalm",
		scientificName: "Monarda didyma",
		description: "A moisture-loving perennial with vivid crimson blooms and highly aromatic mint-scented foliage. It forms dense colonies in moist thickets and stream edges, serving as a prime nectar source for hummingbirds and swallowtail butterflies.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/b2f4f27d/DSC07099.JPG?v=637779673790000000",
		height: 3,
		bloomSeason: "Summer",
		sun: "Partial Shade",
		color: "Red"
	},
	{
		name: "Eastern Red Columbine",
		scientificName: "Aquilegia canadensis",
		description: "A woodland perennial featuring distinctive nodding red and yellow bell-like blossoms with backward-projecting spurs. It thrives in well-drained rocky woods, slopes, and cliffs across Pennsylvania.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/e9469617/20200502_175215.jpg?v=638236206790000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "Red"
	},
	{
		name: "Wild Bergamot",
		scientificName: "Monarda fistulosa",
		description: "An aromatic herbaceous perennial with lavender to purple tubular flowers arranged in ragged crown-like terminal heads. Commonly found in sunny meadows, roadsides, and woodland borders, it is deer-resistant and loved by pollinators.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/47fd09fc/20180714_195058.jpg?v=637503457090000000",
		height: 4,
		bloomSeason: "Summer",
		sun: "Full Sun",
		color: "Purple"
	},
	{
		name: "Spotted Joe-Pye-Weed",
		scientificName: "Eutrochium maculatum",
		description: "This wildflower is distinguished from other similar species by its deep purple or purple-spotted stem. The leaves of this species are about 8 inches long, thick and toothed and arise in whorls of four to five from a stem with a solid interior. These leaves taper at both ends and have short stalks.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/ff80bf15/48fdd4ca/joe%20pye%20weed63850M2.jpg?v=638025776370000000",
		height: 6,
		bloomSeason: "Summer",
		sun: "Full Sun",
		color: "Purple"
	},
	{
		name: "Bullhead Pondlilly",
		scientificName: "Nuphar variegata",
		description: "A common water plant in the north-eastern part of Pennsylvania, yellow pondlily is usually found in waters up to 2m deep in eutrophic lakes with soft bottom sediments. The leaves usually float on surface of the water but may occasionally be elevated above the surface.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/86821bf7/IMG_4044a.jpg?v=638253856950000000",
		height: 1,
		bloomSeason: "Summer",
		sun: "Full Sun",
		color: "Yellow"
	},
	{
		name: "Mountain Laurel",
		scientificName: "Kalmia latifolia",
		description: "Pennsylvania's state flower, this evergreen shrub displays flat-topped clusters of intricate white-to-pink hexagonal blossoms adorned with delicate rose spots and spring-loaded stamens, flourishing in acidic, rocky woodlands.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/1996d147/20170614_205043.jpg?v=637503448700000000",
		height: 15,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "White"
	},
	{
		name: "Marsh Marigold",
		scientificName: "Caltha palustris",
		description: "A glabrous, semi-succulent perennial of wet woods, swamps, and stream edges. Produces glossy round or heart-shaped basal leaves topped by bright yellow buttercup-like flowers with glistening petal-like sepals.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/67497232/20230513_164404.jpg?v=638794195170000000",
		height: 2,
		bloomSeason: "Spring",
		sun: "Full Sun",
		color: "Yellow"
	},
	{
		name: "Northern Spicebush",
		scientificName: "Lindera benzoin",
		description: "A native deciduous understory shrub of moist woods and floodplains. Clusters of tiny fragrant greenish-yellow flowers appear along bare stems in early spring before the aromatic oval leaves unfold, followed by glossy red fall drupes.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/f4194ab2/4bee0def/pn.jpg?v=638794284550000000",
		height: 10,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "Yellow"
	},
	{
		name: "Dutchman's Breeches",
		scientificName: "Dicentra cucullaria",
		description: "A graceful woodland spring ephemeral with finely divided, feathery foliage and racemes of unique white, nodding flowers with two flared spurs that resemble a pair of pantaloons hung upside down to dry.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/5de43d71/P1000351.JPG?v=637564673750000000",
		height: 1,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "White"
	},
	{
		name: "Flowering Dogwood",
		scientificName: "Cornus florida",
		description: "A classic native understory tree with wide horizontal branches. Small yellowish-green center flowers are framed by four large, petal-like white bracts with notched tips, followed by bright red autumn berries.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/c53187a5/944afad3/DSC00304.JPG?v=637490254360000000",
		height: 30,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "White"
	},
	{
		name: "American Dog Violet",
		scientificName: "Viola labradorica",
		description: "A low-growing native woodland violet with ovate-to-heart-shaped leaves and delicate spurred blossoms ranging from light blue to pale violet, blooming in early spring along woodland trails and moist clearings.",
		image: "https://azuregpcentralv2.blob.core.windows.net/media/Default/_Profiles/ff80bf15/b31ed4f/violet,%20dog91039.jpg?v=638025155150000000",
		height: 0.67,
		bloomSeason: "Spring",
		sun: "Partial Shade",
		color: "Blue"
	}
];

export default function PlantList() {
	return (
		<section>
			<h2>Plants</h2>
			<div className="plant-list">
				{plants.map((plant) => (
					<PlantCard
						key={plant.name}
						name={plant.name}
						scientificName={plant.scientificName}
						description={plant.description}
						image={plant.image}
						height={plant.height}
						bloomSeason={plant.bloomSeason}
						sun={plant.sun}
						color={plant.color}
					/>
				))}
			</div>
		</section>
	);
}