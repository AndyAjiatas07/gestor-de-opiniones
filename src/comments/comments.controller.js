import Comment from "./comments.model.js";

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user.uid,
    });

    // 🔥 IMPORTANTE: devolverlo populado
    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "username")
      .populate("post", "title");

    res.status(201).json({
      message: "Comentario creado",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al comentar",
      error,
    });
  }
};

// Editar comentario (solo autor)
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "No encontrado" });
    if (comment.author.toString() !== req.user.uid)
      return res.status(403).json({ message: "No autorizado" });

    await Comment.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: "Comentario actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

// Eliminar comentario (solo autor)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "No encontrado" });
    if (comment.author.toString() !== req.user.uid)
      return res.status(403).json({ message: "No autorizado" });

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};
// ==============================
// VER COMENTARIOS DE UNA PUBLICACIÓN
// ==============================
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios", error });
  }
};

// ==============================
// VER MIS COMENTARIOS
// ==============================
export const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.user.uid })
      .populate("post", "title")
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tus comentarios",
      error,
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "post",
      "_id",
    );

    if (!comment) return res.status(404).json({ message: "No encontrado" });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentario" });
  }
};
