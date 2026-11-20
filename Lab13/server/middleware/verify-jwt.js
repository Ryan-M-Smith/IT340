import jwt from "jsonwebtoken";

import User from "../models/user.js";

export default async function verifyJwt(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Authorization required." });
	}

	try {
		const tokenUser = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
		const user = await User.findById(tokenUser.userId).select([
			"name",
			"email"
		]);
		
		if (!user) {
			return res.status(403).json({ message: "Administrator access required." });
		}
		
		req.user = user;
		next();
	} catch {
		res.status(403).json({ message: "Invalid or expired token." });
	}
}
