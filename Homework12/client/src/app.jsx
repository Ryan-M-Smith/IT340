import { useEffect, useMemo, useState } from "react";

export default function App() {
	const emptyForm = {
		name: "",
		breed: "",
		age: NaN,
		color: "",
		weight: NaN,
		size: ""
	};
	
	const [dogs, setDogs] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	// Memoize the editing state so we can check against a boolean value instead of null.
	const isEditing = useMemo(() => editingId !== null, [editingId]);

	const fetchDogs = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/dogs");
			if (!response.ok) {
				throw new Error(`Error fetching dogs: ${response.statusText}`);
			}
			setDogs(await response.json());
		} catch (fetchError) {
			setError(fetchError.message || "Failed to load dogs.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDogs();
	}, []);

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
		const method = isEditing ? "PUT" : "POST";
		const url = isEditing ? `/api/dogs/${editingId}` : "/api/dogs";
		const body = {
			...formData,
			age: Number(formData.age),
			weight: Number(formData.weight)
		};

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			if (!response.ok) {
				throw new Error(`Error saving dog: ${response.statusText}`);
			}
			resetForm();
			setMessage(`Dog ${isEditing ? "updated" : "created"} successfully.`);
			await fetchDogs();
		} catch (submitError) {
			setError(submitError.message || "Failed to save dog.");
		} finally {
			setLoading(false);
		}
	};

	const editDog = (dog) => {
		setFormData({
			name: dog.name,
			breed: dog.breed,
			age: String(dog.age),
			color: dog.color,
			weight: String(dog.weight),
			size: dog.size
		});
		setEditingId(dog._id);
		setMessage("");
	};

	const deleteDog = async (id) => {
		if (!window.confirm("Are you sure you want to delete this dog?")) return;
		setLoading(true);
		setError("");
		try {
			const response = await fetch(`/api/dogs/${id}`, { method: "DELETE" });
			if (!response.ok) {
				throw new Error(`Error deleting dog: ${response.statusText}`);
			}
			if (editingId === id) resetForm();
			setMessage("Dog deleted successfully.");
			await fetchDogs();
		} catch (deleteError) {
			setError(deleteError.message || "Failed to delete dog.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="container">
			<header className="hero">
				<p className="hero-text">Dog Management</p>
				<h1>Dog Database</h1>
				<p><i>Create and manage dog records stored in MongoDB.</i></p>
			</header>

			<section className="panel">
				<h2>{isEditing ? "Edit Dog" : "Add Dog"}</h2>
				<form className="dog-form" onSubmit={onSubmit}>
					<label htmlFor="name">
						Name
						<input id="name" name="name" value={formData.name} onChange={onChange} required />
					</label>
					<label htmlFor="breed">
						Breed
						<input id="breed" name="breed" value={formData.breed} onChange={onChange} required />
					</label>
					<label htmlFor="age">
						Age
						<input id="age" name="age" type="number" min="0" value={formData.age} onChange={onChange} required />
					</label>
					<label htmlFor="color">
						Color
						<select id="color" name="color" value={formData.color} onChange={onChange} required>
							<option value="">Select color</option>
							<option>black</option>
							<option>white</option>
							<option>brown</option>
							<option>gray</option>
							<option>tan</option>
						</select>
					</label>
					<label htmlFor="weight">
						Weight
						<input id="weight" name="weight" type="number" min="0" step="0.1" value={formData.weight} onChange={onChange} required />
					</label>
					<label htmlFor="size">
						Size
						<select id="size" name="size" value={formData.size} onChange={onChange} required>
							<option value="">Select size</option>
							<option>Small</option>
							<option>Medium</option>
							<option>Large</option>
						</select>
					</label>
					<div className="wide">
						<button type="submit" disabled={loading}>{isEditing ? "Update" : "Create"}</button>
						{isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
					</div>
				</form>
				{error && <p className="error" role="alert">{error}</p>}
				{message && <p className="message" role="status">{message}</p>}
			</section>

			<section className="catalog">
				<div className="catalog-header">
					<div>
						<h2>Dog Catalog</h2>
						<p>{dogs.length} dogs found</p>
					</div>
				</div>

				{loading && <p>Loading dogs...</p>}
				{!loading && dogs.length === 0 && <p>No dogs found.</p>}
				<div className="dog-list">
					{dogs.map((dog) => (
						<div className="dog-card" key={dog._id}>
							<h3>{dog.name}</h3>
							<p><strong>Breed:</strong> {dog.breed}</p>
							<p><strong>Age:</strong> {dog.age}</p>
							<p><strong>Color:</strong> {dog.color}</p>
							<p><strong>Weight:</strong> {dog.weight} lb</p>
							<p><strong>Size:</strong> {dog.size}</p>
							<div className="card-actions">
								<button onClick={() => editDog(dog)}>Edit</button>
								<button onClick={() => deleteDog(dog._id)}>Delete</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
