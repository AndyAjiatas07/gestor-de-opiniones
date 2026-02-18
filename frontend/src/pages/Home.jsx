import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostsRequest, deletePostRequest } from "../api/postService";
import { useAuth } from "../context/useAuth";

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getAllPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar publicaciones");
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePostRequest(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Publicaciones</h2>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/posts/new")}
        >
          Nueva publicación
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {posts.map((post) => (
        <div
          key={post._id}
          className="card mb-3 shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <div className="card-body">
            <h5>{post.title}</h5>
            <p>{post.content}</p>

            <small className="text-muted d-block mb-2">
              Autor: {post.author?.username}
            </small>

            {user && post.author?._id === user._id && (
  <div className="d-flex gap-2">
    <button
      className="btn btn-outline-primary btn-sm"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/posts/edit/${post._id}`);
      }}
    >
      Editar
    </button>

    <button
      className="btn btn-outline-danger btn-sm"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(post._id);
      }}
    >
      Eliminar
    </button>
  </div>
)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
