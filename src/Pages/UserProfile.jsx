import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();

  // Use o username para carregar os dados do usuário ou renderizar conteúdo específico do usuário

  return (
    <div>
      <h1>Perfil do usuário: {username}</h1>
      {/* Outro conteúdo do perfil do usuário */}
    </div>
  );
}

export default UserProfile;
