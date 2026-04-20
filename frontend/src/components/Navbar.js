import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: '#1976d2', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            CAR RENTAL
          </Typography>

          <Button color="inherit" component={Link} to="/dashboard" sx={{ fontWeight: 'bold' }}>
            My Bookings
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
