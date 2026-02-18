import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token no proporcionado o formato inválido",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardar datos del usuario
    req.user = decoded; // { uid: ... }

    next(); // continuar
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};
