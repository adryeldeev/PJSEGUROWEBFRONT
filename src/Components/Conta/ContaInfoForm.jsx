'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import useApi from "../../Api/Api";
import { useAuth } from "../../Context/AuthProvider";

export function AccountDetailsForm() {
  const api = useApi();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
const dataLoadedRef = useRef(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user?.id && !dataLoadedRef.current) {
          const response = await api.get(`user/${auth.user.id}`);
          console.log('Dados usuario :' , response.data)
          setFormData({
            username: response.data.user.username || '',
            email: response.data.user.email || ''
          });
        }
        dataLoadedRef.current = true;
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.user?.id, api]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`updateUser/${auth.user.id}`, formData);
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      alert('Erro ao atualizar os dados.');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="As informações podem ser editadas" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="username">Primeiro nome</InputLabel>
                <OutlinedInput
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  label="Primeiro nome"
                  name="username"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  name="email"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Salvar detalhes</Button>
        </CardActions>
      </Card>
    </form>
  );
}
