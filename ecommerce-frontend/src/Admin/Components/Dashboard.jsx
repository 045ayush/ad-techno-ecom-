import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid } from '@mui/material';
const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };
  return (
    <Container maxWidth="md" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#f9fafc' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom style={{ color: '#1976d2' }}>
            Welcome to Admin Dashboard!
          </Typography>
          <Typography variant="body1" style={{ color: '#757575' }}>
            Here you can manage orders, products, variants and see customer details, orders and more...
          </Typography> 
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {/* Placeholder boxes for sections */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#009688', color: 'white' }} onClick={() => handleNavigation('/admin/orders')}>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="body2">Overview of orders.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#FFC107 ', color: 'white' }} onClick={() => handleNavigation('/admin/products')} >
              <Typography variant="h6">Products</Typography>
              <Typography variant="body2">Add and view products.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#FF7043 ', color: 'white' }} onClick={() => handleNavigation('/admin/variants')}>
              <Typography variant="h6">Variants</Typography>
              <Typography variant="body2">Overview of all the variants.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#3F51B5 ', color: 'white' }} onClick={() => handleNavigation('/admin/customers')}>
              <Typography variant="h6">Customers</Typography>
              <Typography variant="body2">Veiw customer details.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
