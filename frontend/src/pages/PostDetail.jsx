import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllPostsRequest } from "../api/postService";
import {
  getCommentsByPostRequest,
  createCommentRequest,
  deleteCommentRequest,
} from "../api/commentService";
import { useAuth } from "../context/useAuth";

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const postsRes = await getAllPostsRequest();
      const foundPost = postsRes.data.find((p) => p._id === id);
      setPost(foundPost);

      const commentsRes = await getCommentsByPostRequest(id);
      setComments(commentsRes.data);
    };

    loadData();
  }, [id]);

  const handleCreateComment = async (e) => {
    e.preventDefault();

    try {
      const res = await createCommentRequest({
        content: newComment,
        postId: id,
      });

      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentRequest(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5">

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small className="text-muted">
            Autor: {post.author?.username}
          </small>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5>Comentarios</h5>

          <form onSubmit={handleCreateComment} className="mb-3">
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />

            <button className="btn btn-dark btn-sm">
              Comentar
            </button>
          </form>

          {comments.map((comment) => (
            <div key={comment._id} className="border rounded p-2 mb-2">
              <p className="mb-1">{comment.content}</p>
              <small className="text-muted">
                {comment.author?.username}
              </small>

              {user && comment.author?._id === user._id && (
  <>
    <button
      className="btn btn-outline-primary btn-sm ms-2"
      onClick={() => navigate(`/comments/edit/${comment._id}`)}
    >
      Editar
    </button>

    <button
      className="btn btn-outline-danger btn-sm ms-2"
      onClick={() => handleDeleteComment(comment._id)}
    >
      Eliminar
    </button>
  </>
)}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default PostDetail;