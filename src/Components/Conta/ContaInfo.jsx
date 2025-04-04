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
    profileImage: "", 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.user?.id) {
        try {
          const response = await api.get(`user/${auth.user.id}`);
          if (response.data?.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Erro ao carregar os dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [auth.user?.id, api]);

  const handleImageUpload = async (event) => {
   const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file); // Nome deve ser "file"


    try {
      let response;
      if (!user.profileImage) {
        // Se o usuário não tem imagem, faz upload inicial
        response = await api.post("/uploadProfileImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Se já tem imagem, faz atualização
        response = await api.put(`/updateUser/${auth.user.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log('dados da imagem : ', response)
      }

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.user.profileImage,
      }));

      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      alert("Erro ao atualizar a imagem.");
    }
  };

  const baseUrl = "http://localhost:8000";
  const profileImagePath = user.profileImage ? baseUrl + user.profileImage : "";

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Avatar src={profileImagePath} sx={{ height: "80px", width: "80px" }} />
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
            {user.profileImage ? "Atualizar imagem" : "Carregar imagem"}
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}
