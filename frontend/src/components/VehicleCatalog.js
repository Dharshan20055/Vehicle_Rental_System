import React, { useState, useEffect } from 'react';
import { 
    Grid, Card, CardContent, CardMedia, Typography, 
    Button, Box, Container, TextField, MenuItem, 
    FormControl, InputLabel, Select, Chip
} from '@mui/material';
import vehicleService from '../services/vehicleService';

const VehicleCatalog = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filters, setFilters] = useState({ type: '', status: '' });

    useEffect(() => {
        fetchVehicles();
    }, [filters]);

    const fetchVehicles = async () => {
        try {
            const response = await vehicleService.getAllVehicles(filters);
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Explore Our Vehicle Catalog
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={filters.type}
                        label="Type"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="CAR">Car</MenuItem>
                        <MenuItem value="BIKE">Bike</MenuItem>
                        <MenuItem value="VAN">Van</MenuItem>
                        <MenuItem value="TRUCK">Truck</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Availability</InputLabel>
                    <Select
                        name="status"
                        value={filters.status}
                        label="Availability"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">Any Status</MenuItem>
                        <MenuItem value="AVAILABLE">Available</MenuItem>
                        <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                        <MenuItem value="RENTED">Rented</MenuItem>
                    </Select>
                </FormControl>
                
                <Button variant="outlined" onClick={() => setFilters({ type: '', status: '' })}>
                    Reset Filters
                </Button>
            </Box>

            <Grid container spacing={4}>
                {vehicles.map((vehicle) => (
                    <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={vehicle.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
                                alt={vehicle.brand}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {vehicle.brand} {vehicle.model}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Chip label={vehicle.type} size="small" color="primary" variant="outlined" />
                                    <Chip 
                                        label={vehicle.availabilityStatus} 
                                        size="small" 
                                        color={vehicle.availabilityStatus === 'AVAILABLE' ? 'success' : 'warning'} 
                                    />
                                </Box>
                                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                                    {vehicle.fuelType} • {vehicle.seatingCapacity} Seats
                                </Typography>
                                <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
                                    ₹{vehicle.pricePerDay} / Day
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button fullWidth variant="contained" color="primary" disabled={vehicle.availabilityStatus !== 'AVAILABLE'}>
                                    Book Now
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {vehicles.length === 0 && (
                <Typography align="center" sx={{ mt: 4 }}>No vehicles found matching your criteria.</Typography>
            )}
        </Container>
    );
};

export default VehicleCatalog;
