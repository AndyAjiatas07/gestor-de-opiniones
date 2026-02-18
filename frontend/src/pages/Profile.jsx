import { useAuth } from "../context/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      <p><strong>Nombre:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}

export default Profile;