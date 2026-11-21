import { useState } from "react";

export default function Register({ onRegistered }) {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const submit = async (event) => {
		event.preventDefault();
		setError("");
		setMessage("");

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form)
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Unable to register.");
			setMessage("Account created. You can now log in.");
			setForm({ name: "", email: "", password: "" });
			onRegistered?.();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form onSubmit={submit} className="auth-form">
			<h2> Create administrator account </h2>
			
			<input
				type="text"
				placeholder="Name"
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>
			
			<input
				type="email"
				placeholder="Email"
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			
			<input
				type="password"
				placeholder="Password"
				value={form.password}
				onChange={(e) => setForm({ ...form, password: e.target.value })}
				minLength="8"
			/>
			
			<button type="submit"> Register </button>
			
			{message && (
				<p className="message" role="status"> {message} </p>
			)}
			
			{error && (
				<p className="error" role="alert"> {error} </p>
			)}
		</form>
	);
}
