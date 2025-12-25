import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export default async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.adminToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}
