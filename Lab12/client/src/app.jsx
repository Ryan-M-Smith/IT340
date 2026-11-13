import { useEffect, useState, useMemo } from "react";

export default function App() {
	const emptyForm = {
		name: "",
		scientificName: "",
		description: "",
		sunlight: "",
		soil: "",
		height: "",
		bloomSeason: ""
	};
	
	const [plants, setPlants] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	// Memoize the editing state so we can check against a boolean value instead of null.
	const isEditing = useMemo(() => editingId !== null, [editingId]);

	const fetchPlants = async (query = search) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/plants?search=${encodeURIComponent(query)}`);
			if (!response.ok) {
				throw new Error(`Error fetching plants: ${response.statusText}`);
			}

			setPlants(await response.json());
		} catch (fetchError) {
			setError(fetchError.message || "Failed to load plants.");
		} finally {
			setLoading(false);
		}
	};

	// On mount, load all the plants currently in the database.
	useEffect(() => {
		fetchPlants();
	}, [search]);

	const onChange = (event) => {
		const { name, value } = event.target;
		setFormData((previous) => ({ ...previous, [name]: value }));
	};

	const resetForm = () => {
		setFormData(emptyForm);
		setEditingId(null);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		setMessage("");
		
		const method = editingId? "PUT" : "POST";
		const url = editingId? `/api/plants/${editingId}` : "/api/plants";
		const body = { ...formData, height: Number(formData.height) };

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				throw new Error(`Error saving plant: ${response.statusText}`);
			}

			resetForm();
			setMessage(`Plant ${editingId ? "updated" : "created"} successfully.`);
			
			await fetchPlants();
		} catch (submitError) {
			setError(submitError.message || "Failed to save plant.");
		} finally {
			setLoading(false);
		}
	};

	const editPlant = (plant) => {
		setFormData({ ...emptyForm, ...plant, height: String(plant.height) });
		setEditingId(plant._id);
		setMessage("");
	};

	const deletePlant = async (id) => {
		if (!window.confirm("Are you sure you want to delete this plant?")) return;
		setLoading(true);
		setError("");
		try {
			const response = await fetch(`/api/plants/${id}`, { method: "DELETE" });
			if (!response.ok) throw new Error(`Error deleting plant: ${response.statusText}`);
			if (editingId === id) resetForm();
			setMessage("Plant deleted successfully.");
			await fetchPlants();
		} catch (deleteError) {
			setError(deleteError.message || "Failed to delete plant.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="container">
			<header className="hero">
				<p className="hero-text"> Plant Management </p>
				<h1> Plant Database </h1>
				<p>
					<i> Search, create, update, or delete plants from MongoDB. </i>
				</p>
			</header>

			<section className="panel">
				<h2> {isEditing? "Edit Plant" : "Add Plant"} </h2>
				
				<form className="plant-form" onSubmit={onSubmit}>
					<label htmlFor="name">
						Common name
						<input id="name" name="name" value={formData.name} onChange={onChange} required/>
					</label>

					<label htmlFor="scientificName">
						Scientific name
						<input
							id="scientificName"
							name="scientificName"
							value={formData.scientificName}
							onChange={onChange}
							required
						/>
					</label>
					
					<label htmlFor="sunlight">
						Sunlight
						<select id="sunlight" name="sunlight" value={formData.sunlight} onChange={onChange} required>
							<option value=""> Select sunlight </option>
							<option> Full Sun </option>
							<option> Partial Shade </option>
							<option> Full Shade </option>
						</select>
					</label>
					
					<label htmlFor="soil">
						Soil
						<select id="soil" name="soil" value={formData.soil} onChange={onChange} required>
							<option value="">Select soil</option>
							<option>Moist</option>
							<option>Well-drained</option>
							<option>Average to dry</option>
						</select>
					</label>
					
					<label htmlFor="height">
						Height (feet)
						<input
							id="height"
							name="height"
							type="number"
							min={0}
							step={0.01}
							value={formData.height}
							onChange={onChange}
							required
						/>
					</label>

					<label htmlFor="bloomSeason">
						Bloom season
						<input
							id="bloomSeason"
							name="bloomSeason"
							value={formData.bloomSeason}
							onChange={onChange}
							required
						/>
					</label>

					<label className="wide" htmlFor="description">
						Description
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={onChange}
							required
						/>
					</label>
					
					<div className="wide">
						<button type="submit" disabled={loading}>
							{isEditing? "Update" : "Create"}
						</button>

						{isEditing && (
							<button type="button" onClick={resetForm}>
								Cancel
							</button>
						)}
					</div>
				</form>

				{error && (
					<p className="error" role="alert"> {error} </p>
				)}
				
				{message && (
					<p className="message" role="status"> {message} </p>
				)}
			</section>

			<section className="catalog">
				<div className="catalog-header">
					<div>
						<h2>Plant Catalog</h2>
						<p>{plants.length} plants found</p>
					</div>

					<input
						className="search"
						type="search"
						placeholder="Search plants"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>

				{loading && <p>Loading plants...</p>}
				{!loading && plants.length === 0 && <p>No plants found.</p>}
				
				<div className="plant-list">
					{plants.map((plant) => (
						<div className="plant-card" key={plant._id}>
							<h3> {plant.name} </h3>
							<p> <em>{plant.scientificName}</em> </p>
							<p> {plant.description} </p>
							<p> <strong>Sunlight:</strong> {plant.sunlight} </p>
							<p> <strong>Soil:</strong> {plant.soil} </p>
							<p> <strong>Height:</strong> {plant.height} feet </p>
							<p> <strong>Bloom:</strong> {plant.bloomSeason} </p>
							
							<div className="card-actions">
								<button onClick={() => editPlant(plant)}>Edit</button>
								<button onClick={() => deletePlant(plant._id)}>Delete</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
