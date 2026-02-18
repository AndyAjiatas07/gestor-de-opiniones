import { useEffect, useState } from "react";
import { getMyPostsRequest, deletePostRequest } from "../api/postService";
import { useNavigate } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMyPosts = async () => {
      try {
        const res = await getMyPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar tus publicaciones");
      }
    };

    loadMyPosts();
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
      <h2 className="mb-4">Mis publicaciones</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {posts.length === 0 && (
        <div className="alert alert-info">
          Aún no tienes publicaciones.
        </div>
      )}

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
        </div>
      ))}
    </div>
  );
}

export default MyPosts;