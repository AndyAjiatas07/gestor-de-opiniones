import User from "./users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "secret_key";

// Registro
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: encryptedPassword
        });

        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar", error });
    }
};

// Login (correo o username)
export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "2h" });

        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en login", error });
    }
};

// Editar perfil
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (newPassword) {
            const valid = await bcrypt.compare(oldPassword, user.password);
            if (!valid) return res.status(401).json({ message: "Contraseña actual incorrecta" });

            user.password = await bcrypt.hash(newPassword, 10);
        }

        if (username) user.username = username;

        await user.save();

        res.json({ message: "Perfil actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar perfil", error });
    }
};