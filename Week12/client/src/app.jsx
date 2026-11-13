import { useEffect, useState } from "react";

export default function App() {
	const emptyForm = {
		name: "",
		species: "",
		habitat: "",
		rarity: "common",
		description: ""
	};

	const [creatures, setCreatures] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const cancelEdit = () => {
		setFormData(emptyForm);
		setEditingId(null);
		setMessage("");
		setError("");
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setMessage("");

		const method = editingId? "PUT" : "POST";
		const url = editingId? `/api/creatures/${editingId}` : "/api/creatures";

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error(`Error ${editingId? "updating" : "creating"} creature: ${response.statusText}`);
			}

			setFormData(emptyForm);
			setEditingId(null);
			setMessage(`Creature ${editingId? "updated" : "created"} successfully.`);
			await fetchCreatures();
		} catch (error) {
			setError(error?.message || "Failed to submit form.");
		}
	};

	const onEdit = (creature) => {
		setFormData({
			name: creature.name || "",
			species: creature.species || "",
			habitat: creature.habitat || "",
			rarity: creature.rarity || "common",
			description: creature.description || ""
		});
		setEditingId(creature._id);
	};

	const onDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this creature?")) {
			return;
		}

		setLoading(true);
		setError("");
		setMessage("");

		try {
			const response = await fetch(`/api/creatures/${id}`, { method: "DELETE" });

			if (!response.ok) {
				throw new Error(`Error deleting creature: ${response.statusText}`);
			}

			setMessage("Creature deleted successfully.");
			await fetchCreatures();

			if (editingId === id) {
				cancelEdit();
			}
		} catch (error) {
			setError(error?.message || "Failed to delete creature.");
		} finally {
			setLoading(false);
		}
	};

	const onSearch = (e) => {
		const { value } = e.target;
		setSearch(value);
		fetchCreatures();
	};

	const fetchCreatures = async (query = search) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/creatures?search=${encodeURIComponent(query)}`);

			if (!response.ok) {
				throw new Error(`Error fetching creatures: ${response.statusText}`);
			}

			const data = await response.json();
			setCreatures(data);
		} catch (error) {
			setError(error?.message || "Failed to load creatures.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => fetchCreatures())();
	}, []);

	return (
		<main className="container">
			<header className="hero=">
				<p className="hero-text"> Creature Management </p>
				<h1> Creature Database </h1>
				<p> Search, create, update, or delete a collection of mythical creatures. </p>
			</header>

			<section className="panel">
				<h2> {editingId? "Edit Creature" : "Add Creature"} </h2>
				<form onSubmit={onSubmit}>
					<label htmlFor="name"> Name </label>
					<input
						type="text"
						name="name"
						id="name"
						value={formData.name}
						onChange={onChange}
						required
					/>
					
					<label htmlFor="species"> Species </label>
					<input
						type="text"
						name="species"
						id="species"
						value={formData.species}
						onChange={onChange}
						required
					/>
					
					<label htmlFor="habitat"> Habitat </label>
					<input
						type="text"
						name="habitat"
						id="habitat"
						value={formData.habitat}
						onChange={onChange}
						required
					/>

					<label htmlFor="rarity"> Rarity </label>
					<select name="rarity" id="rarity" value={formData.rarity} onChange={onChange} required>
						<option value="common"> Common </option>
						<option value="uncommon"> Uncommon </option>
						<option value="rare"> Rare </option>
					</select>

					<div className="wide">
						<label htmlFor="description"> Description </label>
						<textarea
							name="description"
							id="description"
							value={formData.description}
							onChange={onChange}
							required
						/>
					</div>

					<div className="form-actions wide">
						<button type="submit" disabled={loading}> {editingId? "Update" : "Create"} </button>
						{editingId && <button type="button" onClick={cancelEdit}> Cancel </button>}
					</div>

					{error && <p className="error"> {error} </p>}
					{message && <p className="message"> {message} </p>}
				</form>

				{message && <p className="success" role="status"> {message} </p>}
				{error && <p className="error" role="alert"> {error} </p>}
			</section>

			<section className="catalog">
				<div className="catalog-header">
					<div>
						<h2> Creature Catalog </h2>
						<p> All creatures in the database </p>
					</div>

					<input
						className="search"
						type="text"
						placeholder="Search by name, species, or habitat"
						value={search}
						onChange={onSearch}
					/>
				</div>

				{loading && <p> Loading creatures... </p>}
				{!loading && creatures.length === 0 && <p> No creatures found. </p>}

				<div className="creature-list">
					{creatures.map((creature) => (
						<div key={creature._id} className="creature-card">
							<h3> {creature.name} </h3>
							<p> <strong> Species: </strong> {creature.species} </p>
							<p> <strong> Habitat: </strong> {creature.habitat} </p>
							<p> <strong> Rarity: </strong> {creature.rarity} </p>
							<p className="description"> {creature.description} </p>

							<div className="card-actions">
								<button onClick={() => onEdit(creature)}> Edit </button>
								<button onClick={() => onDelete(creature._id)}> Delete </button>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="footer">
				<p> Created by Ryan </p>
			</section>
		</main>	
	);
}