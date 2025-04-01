import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";

export function AccountInfo() {
  const api = useApi();
  const auth = useAuth();
  const [user, setUser] = useState({
    username: "",
    profileImage: "", // Manter o profileImage no estado
  });

  // Use a flag para garantir que os dados do usuário não sejam carregados repetidamente
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.user?.id && !userLoaded) {
        try {
          const response = await api.get(`user/${auth.user.id}`);
          console.log("Dados do usuário:", response.data.user.profileImage);
          if (response.data?.user) {
            setUser(response.data.user); // Atualizar o usuário com a resposta da API
            setUserLoaded(true); // Definir que os dados foram carregados
          }
        } catch (error) {
          console.error("Erro ao carregar os dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [auth.user?.id, api, userLoaded]);  // Agora depende de userLoaded para evitar chamadas repetidas

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post("/uploadProfileImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.user.profileImage, // Atualizar a imagem no estado
      }));

      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      alert("Erro ao atualizar a imagem.");
    }
  };
  const baseUrl = "http://localhost:8000"; // Ou a URL do seu servidor
  const profileImagePath = baseUrl + user.profileImage;
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            {/* Usando o caminho da imagem retornado pela API */}
            <Avatar
  src={`http://localhost:8000${user.profileImage}`}  // Concatenando a URL base com o caminho da imagem
  sx={{ height: "80px", width: "80px" }}
/>
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user?.username || "Usuário"}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-avatar"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-avatar" style={{ width: "100%" }}>
          <Button fullWidth variant="text" component="span">
            Carregar imagem
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}
