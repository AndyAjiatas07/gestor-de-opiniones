import User from "./users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==============================
// REGISTRO DE USUARIO
// ==============================
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    // Verificar duplicados
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        message: "El nombre de usuario ya existe",
      });
    }

    // Encriptar contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    // Excluir password de la respuesta
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      message: "Usuario creado",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};

// ==============================
// LOGIN (correo o username)
// ==============================
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Debe proporcionar usuario/correo y contraseña",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    // Generar JWT seguro
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "4h",
    });

    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en login",
    });
  }
};
// ==============================
// ACTUALIZAR PERFIL
// ==============================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { username, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Actualizar email
    if (email) {
      const exists = await User.findOne({ email });
      if (exists && exists._id.toString() !== userId)
        return res.status(400).json({ message: "El correo ya está en uso" });
      user.email = email;
    }

    // Actualizar contraseña
    if (newPassword) {
      if (!oldPassword)
        return res.status(400).json({ message: "Debe proporcionar la contraseña actual" });
      const valid = await bcrypt.compare(oldPassword, user.password);
      if (!valid) return res.status(401).json({ message: "Contraseña actual incorrecta" });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Actualizar username
    if (username) {
      const exists = await User.findOne({ username });
      if (exists && exists._id.toString() !== userId)
        return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
      user.username = username;
    }

    await user.save();

    // 🔥 DEVOLVER DATOS ACTUALIZADOS
    const { password: _, ...userData } = user.toObject();
    res.json({
      message: "Perfil actualizado correctamente",
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};
// ==============================
// OBTENER MIS DATOS
// ==============================
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid).select(
            "username email role createdAt"
        );

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el perfil"
        });
    }
};

// ==============================
// OBTENER TODOS LOS USUARIOS
// ==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("username email createdAt"); // sin password

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios",
    });
  }
};