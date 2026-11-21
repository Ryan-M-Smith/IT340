import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const userResponse = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email
});

export async function register({ body }, res) {
	const { name, email, password } = body;

	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Name, email, and password are required."
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			message: "Password must be at least 8 characters."
		});
	}

	try {
		const normalizedEmail = email.trim().toLowerCase();
		const existingUser = await User.findOne({ email: normalizedEmail });
		
		if (existingUser) {
			return res.status(409).json({
				message: "An account with that email already exists."
			});
		}

		const user = await User.create({
			name: name.trim(),
			email: normalizedEmail,
			password: await bcrypt.hash(password, 10)
		});

		res.status(201).json({
			message: "User registered successfully.",
			user: userResponse(user)
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function login({ body }, res) {
	const { email, password } = body;

	if (!email || !password) {
		return res.status(400).json({
			message: "Email and password are required."
		});
	}

	try {
		const user = await User.findOne({ email: email.trim().toLowerCase() });
		const validCreds = user? await bcrypt.compare(password, user.password) : false;
		
		if (!user || !validCreds) {
			return res.status(401).json({
				message: "Invalid credentials."
			});
		}

		const token = jwt.sign(
			{ userId: user._id.toString() },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({
			message: "Login successful.",
			token,
			user: userResponse(user)
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
