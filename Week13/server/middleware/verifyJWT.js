import jwt from "jsonwebtoken";

export default function verifyJWT(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Authorization required." });
	}

	try {
		req.user = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
		next();
	} catch {
		res.status(403).json({ message: "Invalid or expired token." });
	}
}
