import { useEffect, useMemo, useState } from "react";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const emptyForm = {
	name: "",
	scientificName: "",
	description: "",
	sunlight: "",
	soil: "",
	height: "",
	bloomSeason: ""
};

const getStoredUser = () => {
	try {
		return JSON.parse(localStorage.getItem("user") || "null");
	} catch {
		return null;
	}
};

export default function App() {
	const [plants, setPlants] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [user, setUser] = useState(getStoredUser);
	const isEditing = useMemo(() => editingId !== null, [editingId]);

	const authHeaders = () => {
		const token = localStorage.getItem("token");
		return token ? { Authorization: `Bearer ${token}` } : {};
	};

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

	useEffect(() => {
		fetchPlants();
	}, [search]);

	const onAuthenticated = ({ token, user: authenticatedUser }) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(authenticatedUser));
		setUser(authenticatedUser);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		resetForm();
	};

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

		const method = isEditing? "PUT" : "POST";
		const url = isEditing? `/api/plants/${editingId}` : "/api/plants";
		const body = { ...formData, height: Number(formData.height) };

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json", ...authHeaders() },
				body: JSON.stringify(body)
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || `Error saving plant: ${response.statusText}`);
			}

			resetForm();
			setMessage(`Plant ${isEditing ? "updated" : "created"} successfully.`);
			await fetchPlants();
		} catch (submitError) {
			setError(submitError.message || "Failed to save plant.");
		} finally {
			setLoading(false);
		}
	};

	const editPlant = (plant) => {
		setFormData({
			...emptyForm,
			...plant,
			height: String(plant.height)
		});
		setEditingId(plant._id);
		setMessage("");
		setError("");
	};

	const deletePlant = async (id) => {
		if (!window.confirm("Are you sure you want to delete this plant?")) {
			return;
		}

		setLoading(true);
		setError("");
		setMessage("");

		try {
			const response = await fetch(`/api/plants/${id}`, {
				method: "DELETE",
				headers: authHeaders()
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || `Error deleting plant: ${response.statusText}`);
			}

			if (editingId === id) {
				resetForm();
			}
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
				<p className="hero-text">Native Plant Administration</p>
				<h1>Native Plant Database</h1>
				<p>Browse native plant records or sign in to manage the catalog.</p>
			</header>

			{user ? (
				<section className="admin-bar" aria-label="Administrator controls">
					<p>Signed in as {user.name}.</p>
					<button type="button" onClick={logout}>Log out</button>
				</section>
			) : (
				<section className="auth-panel" aria-label="Administrator authentication">
					<Login onAuthenticated={onAuthenticated}/>
					<Register/>
				</section>
			)}

			{user && (
				<section className="panel">
					<h2>{isEditing ? "Edit Plant" : "Add Plant"}</h2>
					<form className="plant-form" onSubmit={onSubmit}>
						<label htmlFor="name">
							Common name
							<input id="name" name="name" value={formData.name} onChange={onChange} required />
						</label>

						<label htmlFor="scientificName">
							Scientific name
							<input id="scientificName" name="scientificName" value={formData.scientificName} onChange={onChange} required />
						</label>

						<label htmlFor="sunlight">
							Sunlight
							<select id="sunlight" name="sunlight" value={formData.sunlight} onChange={onChange} required>
								<option value="">Select sunlight</option>
								<option>Full Sun</option>
								<option>Partial Shade</option>
								<option>Full Shade</option>
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
							<input id="height" name="height" type="number" min="0" step="0.01" value={formData.height} onChange={onChange} required />
						</label>

						<label htmlFor="bloomSeason">
							Bloom season
							<select id="bloomSeason" name="bloomSeason" value={formData.bloomSeason} onChange={onChange} required>
								<option value="">Select bloom season</option>
								<option>Spring</option>
								<option>Spring to Summer</option>
								<option>Summer</option>
								<option>Summer to Fall</option>
								<option>Late Summer to Fall</option>
								<option>Fall</option>
								<option>Year-round</option>
							</select>
						</label>

						<label className="wide" htmlFor="description">
							Description
							<textarea id="description" name="description" value={formData.description} onChange={onChange} required />
						</label>

						<div className="wide form-actions">
							<button type="submit" disabled={loading}>{isEditing ? "Update" : "Create"}</button>
							{isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
						</div>
					</form>
				</section>
			)}

			{(error || message) && (
				<p className={error ? "error" : "message"} role={error ? "alert" : "status"}>
					{error || message}
				</p>
			)}

			<section className="catalog">
				<div className="catalog-header">
					<div>
						<h2> Plant Catalog </h2>
						<p> {plants.length} plants found </p>
					</div>
					
					<input
						className="search"
						type="search"
						placeholder="Search plants"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>

				{loading && (
					<p> Loading plants... </p>
				)}
				
				{!loading && plants.length === 0 && (
					<p> No plants found. </p>
				)}

				<div className="plant-list">
					{plants.map(({ _id: id, ...plant }) => (
						<div className="plant-card" key={id}>
							<h3>{plant.name}</h3>
							<p><em>{plant.scientificName}</em></p>
							<p>{plant.description}</p>
							<p><strong>Sunlight:</strong> {plant.sunlight}</p>
							<p><strong>Soil:</strong> {plant.soil}</p>
							<p><strong>Height:</strong> {plant.height} feet</p>
							<p><strong>Bloom:</strong> {plant.bloomSeason}</p>
							{user && (
								<div className="card-actions">
									<button type="button" onClick={() => editPlant(plant)}>Edit</button>
									<button type="button" onClick={() => deletePlant(id)}>Delete</button>
								</div>
							)}
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
