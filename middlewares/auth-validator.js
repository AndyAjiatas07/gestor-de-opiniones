import jwt from "jsonwebtoken";

const SECRET = "secret_key";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Token requerido" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};