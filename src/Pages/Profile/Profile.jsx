import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { AccountInfo } from '../../Components/Conta/ContaInfo';
import { AccountDetailsForm } from '../../Components/Conta/ContaInfoForm';



export default function Profile() {
  return (
    <Grid container spacing={3}>
  <Grid item lg={4} md={6} xs={12}>
    <AccountInfo />
  </Grid>
  <Grid item lg={8} md={6} xs={12}>
    <AccountDetailsForm />
  </Grid>
</Grid>
  );
}