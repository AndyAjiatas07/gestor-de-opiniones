import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPostRequest,
  updatePostRequest,
  getAllPostsRequest,
} from "../api/postService";

function PostFormPage() {
  const { id } = useParams(); // si existe → es edición
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const loadPost = async () => {
        const res = await getAllPostsRequest();
        const post = res.data.find((p) => p._id === id);
        if (post) {
          setForm({
            title: post.title,
            category: post.category,
            content: post.content,
          });
        }
      };
      loadPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await updatePostRequest(id, form);
      } else {
        await createPostRequest(form);
      }

      navigate("/"); // 🔥 redirige al terminar
    } catch (error) {
      setError(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        {isEditing ? "Editar publicación" : "Nueva publicación"}
      </h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          className="form-control mb-2"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          className="form-control mb-3"
          rows="3"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark me-2" disabled={loading}>
          {isEditing ? "Actualizar" : "Publicar"}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default PostFormPage;