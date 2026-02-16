import Comment from "./comments.model.js";

// Crear comentario
export const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        const comment = await Comment.create({
            content,
            post: postId,
            author: req.user.id
        });

        res.status(201).json({ message: "Comentario creado", comment });
    } catch (error) {
        res.status(500).json({ message: "Error al comentar", error });
    }
};

// Editar comentario (solo autor)
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) return res.status(404).json({ message: "No encontrado" });
        if (comment.author.toString() !== req.user.id)
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
        if (comment.author.toString() !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        await Comment.findByIdAndDelete(req.params.id);

        res.json({ message: "Comentario eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error });
    }
};