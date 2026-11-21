import { useEffect, useMemo, useState } from "react";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const emptyForm = {
	name: "",
	jobTitle: "",
	department: "",
	email: "",
	phone: "",
	startDate: "",
	location: ""
};

const getStoredUser = () => {
	try {
		return JSON.parse(localStorage.getItem("user") || "null");
	} catch {
		return null;
	}
};

export default function App() {
	const [employees, setEmployees] = useState([]);
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

	const fetchEmployees = async (query = search) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/employees?search=${encodeURIComponent(query)}`);
			if (!response.ok) {
				throw new Error(`Error fetching employees: ${response.statusText}`);
			}

			setEmployees(await response.json());
		} catch (fetchError) {
			setError(fetchError.message || "Failed to load employees.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEmployees();
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

		const method = isEditing ? "PUT" : "POST";
		const url = isEditing ? `/api/employees/${editingId}` : "/api/employees";

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json", ...authHeaders() },
				body: JSON.stringify(formData)
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || `Error saving employee: ${response.statusText}`);
			}

			resetForm();
			setMessage(`Employee ${isEditing ? "updated" : "created"} successfully.`);
			await fetchEmployees();
		} catch (submitError) {
			setError(submitError.message || "Failed to save employee.");
		} finally {
			setLoading(false);
		}
	};

	const editEmployee = (employee) => {
		setFormData({
			...emptyForm,
			...employee
		});
		setEditingId(employee._id);
		setMessage("");
		setError("");
	};

	const deleteEmployee = async (id) => {
		if (!window.confirm("Are you sure you want to delete this employee?")) {
			return;
		}

		setLoading(true);
		setError("");
		setMessage("");

		try {
			const response = await fetch(`/api/employees/${id}`, {
				method: "DELETE",
				headers: authHeaders()
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || `Error deleting employee: ${response.statusText}`);
			}

			if (editingId === id) {
				resetForm();
			}
			setMessage("Employee deleted successfully.");
			await fetchEmployees();
		} catch (deleteError) {
			setError(deleteError.message || "Failed to delete employee.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="container">
			<header className="hero">
				<p className="hero-text">Employee Administration</p>
				<h1>Employee Database</h1>
				<p>Browse employee records or sign in to manage the directory.</p>
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
					<h2>{isEditing ? "Edit Employee" : "Add Employee"}</h2>
					<form className="plant-form" onSubmit={onSubmit}>
						<label htmlFor="name">
							Name
							<input id="name" name="name" value={formData.name} onChange={onChange} required />
						</label>

						<label htmlFor="jobTitle">
							Job title
							<input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={onChange} required />
						</label>

						<label htmlFor="department">
							Department
							<select id="department" name="department" value={formData.department} onChange={onChange} required>
								<option value="">Select department</option>
								<option>Administration</option>
								<option>Engineering</option>
								<option>Finance</option>
								<option>Human Resources</option>
								<option>Marketing</option>
								<option>Operations</option>
								<option>Sales</option>
								<option>Support</option>
							</select>
						</label>

						<label htmlFor="email">
							Email
							<input id="email" name="email" type="email" value={formData.email} onChange={onChange} required />
						</label>

						<label htmlFor="phone">
							Phone
							<input id="phone" name="phone" type="tel" value={formData.phone} onChange={onChange} required />
						</label>

						<label htmlFor="startDate">
							Start date
							<input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={onChange} required />
						</label>

						<label className="wide" htmlFor="location">
							Location
							<input id="location" name="location" value={formData.location} onChange={onChange} required />
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
						<h2>Employee Directory</h2>
						<p>{employees.length} employees found</p>
					</div>

					<input
						className="search"
						type="search"
						placeholder="Search employees"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>

				{loading && <p>Loading employees...</p>}
				{!loading && employees.length === 0 && <p>No employees found.</p>}

				<div className="plant-list">
					{employees.map(({ _id: id, ...employee }) => (
						<div className="plant-card" key={id}>
							<h3>{employee.name}</h3>
							<p><em>{employee.jobTitle}</em></p>
							<p><strong>Department:</strong> {employee.department}</p>
							<p><strong>Email:</strong> {employee.email}</p>
							<p><strong>Phone:</strong> {employee.phone}</p>
							<p><strong>Start Date:</strong> {employee.startDate}</p>
							<p><strong>Location:</strong> {employee.location}</p>
							{user && (
								<div className="card-actions">
									<button type="button" onClick={() => editEmployee({ _id: id, ...employee })}>Edit</button>
									<button type="button" onClick={() => deleteEmployee(id)}>Delete</button>
								</div>
							)}
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
