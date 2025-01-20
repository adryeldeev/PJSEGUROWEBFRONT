'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'Nova York' },
  { value: 'san-francisco', label: 'São Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
];

export function AccountDetailsForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="As informações podem ser editadas" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="primeiroNome">Primeiro nome</InputLabel>
                <OutlinedInput id="primeiroNome" defaultValue="Sofia" label="Primeiro nome" name="primeiroNome" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="ultimoNome">Último nome</InputLabel>
                <OutlinedInput id="ultimoNome" defaultValue="Rivers" label="Último nome" name="ultimoNome" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput id="email" defaultValue="sofia@devias.io" label="Email" name="email" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="telefone">Número de telefone</InputLabel>
                <OutlinedInput id="telefone" label="Número de telefone" name="telefone" type="tel" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="estado">Estado</InputLabel>
                <Select id="estado" defaultValue="new-york" label="Estado" name="estado" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="cidade">Cidade</InputLabel>
                <OutlinedInput id="cidade" label="Cidade" name="cidade" />
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
