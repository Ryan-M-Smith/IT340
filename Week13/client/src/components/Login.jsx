import { useState } from "react";

export default function Login({ onAuthenticated }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const submit = async (event) => {
		event.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Unable to log in.");
			onAuthenticated(data);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form onSubmit={submit} className="auth-form">
			<h2>Log in</h2>
			<input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
			<input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
			<button type="submit">Log in</button>
			{error && <p className="error" role="alert">{error}</p>}
		</form>
	);
}
