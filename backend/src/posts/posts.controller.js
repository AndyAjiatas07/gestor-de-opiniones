import Post from "./posts.model.js";

// Crear publicación
export const createPost = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const post = await Post.create({
      title,
      category,
      content,
      author: req.user.uid,
    });

    res.status(201).json({ message: "Publicación creada", post });
  } catch (error) {
    res.status(500).json({ message: "Error al crear publicación", error });
  }
};

// Editar publicación (solo autor)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "No encontrada" });
    if (post.author.toString() !== req.user.uid)
      return res.status(403).json({ message: "No autorizado" });

    await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Publicación actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

// Eliminar publicación (solo autor)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "No encontrada" });
    if (post.author.toString() !== req.user.uid)
      return res.status(403).json({ message: "No autorizado" });

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};
// ==============================
// LISTAR TODAS LAS PUBLICACIONES
// ==============================
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones", error });
  }
};

// ==============================
// PUBLICACIONES POR USUARIO
// ==============================
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones", error });
  }
};

// ==============================
// PUBLICACIONES PROPIAS
// ==============================
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.uid }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener tus publicaciones", error });
  }
};
