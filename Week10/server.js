import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

// In-memory array to store API data
let books = [
	{
		id: 1,
		title: "The Hobbit",
		author: "J.R.R. Tolkien",
		year: 1937,
		genre: "Fantasy",
		available: true,
	},

	{
		id: 2,
		title: "1984",
		author: "George Orwell",
		year: 1949,
		genre: "Dystopian",
		available: true,
	},

	{
		id: 3,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		year: 1960,
		genre: "Fiction",
		available: true,
	},

	{
		id: 4,
		title: "Pride and Prejudice",
		author: "Jane Austen",
		year: 1813,
		genre: "Romance",
		available: true,
	},

	{
		id: 5,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		year: 1925,
		genre: "Fiction",
		available: true,
	},

	{
		id: 6,
		title: "Moby Dick",
		author: "Herman Melville",
		year: 1851,
		genre: "Adventure",
		available: true,
	},

	{
		id: 7,
		title: "War and Peace",
		author: "Leo Tolstoy",
		year: 1869,
		genre: "Historical Fiction",
		available: true,
	},

	{
		id: 8,
		title: "The Catcher in the Rye",
		author: "J.D. Salinger",
		year: 1951,
		genre: "Fiction",
		available: true,
	},

	{
		id: 9,
		title: "The Lord of the Rings",
		author: "J.R.R. Tolkien",
		year: 1954,
		genre: "Fantasy",
		available: true,
	},

	{
		id: 10,
		title: "The Chronicles of Narnia",
		author: "C.S. Lewis",
		year: 1950,
		genre: "Fantasy",
		available: true,
	}
];

function validateResponse(body) {
	const { title, author, year, genre } = body;

	if (typeof title !== "string" || !title.trim()) {
		return { valid: false, error: "Title is required" };
	}

	if (typeof author !== "string" || !author.trim()) {
		return { valid: false, error: "Author is required" };
	}

	if (!Number.isInteger(year) || year < 0) {
		return { valid: false, error: "Year must be a positive number" };
	}

	if (typeof genre !== "string" || !genre.trim()) {
		return { valid: false, error: "Genre is required" };
	}

	return { valid: true, error: null };
}

//
// Landing page
//

app.get("/", (_, res) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" type="text/css" href="/css/style.css">
				<title>Library API</title>
			</head>
			<body>
				<h1>Welcome to the Library API</h1>
				<p>Use the following endpoints to interact with the API:</p>
				<ul>
					<li>GET /books - Retrieve all books</li>
					<li>GET /books/:id - Retrieve a specific book by ID</li>
					<li>POST /books - Add a new book</li>
					<li>PUT /books/:id - Update an existing book by ID</li>
					<li>DELETE /books/:id - Delete a book by ID</li>
				</ul>
			</body>
		</html>
	`)
});

//
// API endpoints
//

app.get("/books", (_, res) => {
	res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
	const bookId = parseInt(req.params.id, 10);
	const book = books.find(({ id }) => id === bookId);

	if (!book) {
		return res.status(404).json({ error: "Book not found" });
	}

	res.status(200).json(book);
});

app.post("/books", (req, res) => {
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const { title, author, year, genre } = body;
	const newBook = {
		id: books.at(-1)?.id + 1,
		title,
		author,
		year,
		genre,
		available: true,
	};

	books.push(newBook);
	return res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
	const bookId = parseInt(req.params.id, 10);
	const { body } = req;
	const { valid, error } = validateResponse(body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const index = books.findIndex(({ id }) => id === bookId);

	if (index === -1) {
		return res.status(404).json({ error: "Book not found" });
	}

	const { title, author, year, genre } = body;
	const updatedBook = {
		...books[index],
		title,
		author,
		year,
		genre,
	};

	books[index] = updatedBook;
	return res.status(200).json(updatedBook);
});

app.delete("/books/:id", (req, res) => {
	const bookId = parseInt(req.params.id, 10);
	const index = books.findIndex(({ id }) => id === bookId);

	if (index === -1) {
		return res.status(404).json({ error: "Book not found" });
	}

	const [ removed ] = books.splice(index, 1);
	return res.status(200).json({
		message: "Book deleted successfully",
		book: removed
	});
});

// Launch the server
app.listen(port, () => {
	console.log(`Library API is running at http://localhost:${port}`);
});