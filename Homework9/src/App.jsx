import { useState } from "react"

import "./App.css"

export default function App() {
	const [quote, setQuote] = useState(null);
	const [author, setAuthor] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchQuote = async () => {
		setQuote(null);
		setAuthor(null);
		setLoading(true);
		setError("");

		try {
			const response = await fetch("https://dummyjson.com/quotes/random");

			if (!response.ok) {
				throw new Error(`Response: ${response.status}`);
			}
			
			const { quote, author } = await response.json();
			setQuote(quote);
			setAuthor(author);
		} catch (error) {
			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<div>
				<h1> Random Quote Generator </h1>
				<button className="fetch-quote" onClick={fetchQuote}> Random Quote </button>
			</div>

			{/* Loading message */}
			{loading && (
				<div className="loading">
					<h2> Loading quote... </h2>
				</div>
			)}
			
			{/* Error card */}
			{error && (
				<div className="error-card">
					<h2> Failed to Load Your Quote </h2>
					<p> <b>Reason:</b> {error} </p>
					<p> Please refresh the page and try again. </p>
				</div>
			)}

			{/* Display the quote, if available */}
			{quote && author && !loading && (
				<div className="quote-card">
					<h2> Your Random Quote </h2>
					<p className="quote"> &ldquo;{quote}&rdquo; </p>
					<p className="author"> &mdash; {author} </p>
				</div>
			)}
		</main>
	);
}
