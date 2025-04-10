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
    let isMounted = true; // Para evitar atualizações no estado após o componente ser desmontado
  
    const fetchUserData = async () => {
      if (auth.user?.id) {
        try {
          const response = await api.get(`user/${auth.user.id}`);
         
          if (response.data?.user && isMounted) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Erro ao carregar os dados do usuário:", error);
        }
      }
    };
  
    fetchUserData();
  
    return () => {
      isMounted = false; // Limpa o efeito ao desmontar o componente
    };
  }, [auth.user?.id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file); // Nome deve ser "file"
  
    try {
      let response;
  
      // Decide entre upload inicial ou atualização
      const endpoint = user.profileImage
        ? `/updateUser/${auth.user.id}`
        : "/uploadProfileImage";
  
      const method = user.profileImage ? "put" : "post";
  
      response = await api[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     
  
      
  
      // Atualiza o estado do usuário com base na estrutura correta da resposta
      if (response.data?.user?.profileImage) {
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: response.data.user.profileImage, // Atualiza com o caminho correto
        }));

        alert("Imagem atualizada com sucesso!");
      } else {
        console.error("A resposta da API não contém os dados esperados:", response.data);
        alert("Erro ao atualizar a imagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      alert("Erro ao atualizar a imagem. Verifique sua conexão ou tente novamente.");
    }
  };

  const baseUrl = "https://my-fist-project-production.up.railway.app";
  const profileImagePath = user.profileImage ? baseUrl + user.profileImage : "";
  console.log("Caminho da imagem:", profileImagePath);
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
