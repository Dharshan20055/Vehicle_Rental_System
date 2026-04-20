import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Button, Typography, Container, Box, IconButton, Dialog,
    DialogTitle, DialogContent, TextField, DialogActions, Grid, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import vehicleService from '../services/vehicleService';

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState({
        brand: '', model: '', type: 'CAR', fuelType: '', 
        seatingCapacity: 4, pricePerDay: 0, availabilityStatus: 'AVAILABLE',
        imageUrl: '', description: '', insuranceStatus: 'ACTIVE', registrationNumber: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await vehicleService.getAllVehicles();
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles", error);
        }
    };

    const handleOpen = (vehicle = null) => {
        if (vehicle) {
            setCurrentVehicle(vehicle);
            setEditMode(true);
        } else {
            setCurrentVehicle({
                brand: '', model: '', type: 'CAR', fuelType: '', 
                seatingCapacity: 4, pricePerDay: 0, availabilityStatus: 'AVAILABLE',
                imageUrl: '', description: '', insuranceStatus: 'ACTIVE', registrationNumber: ''
            });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setCurrentVehicle({ 
            ...currentVehicle, 
            [name]: type === 'number' ? parseFloat(value) : value 
        });
    };

    const handleSubmit = async () => {
        console.log("Submitting vehicle:", currentVehicle);
        try {
            if (editMode) {
                await vehicleService.updateVehicle(currentVehicle.id, currentVehicle);
                alert("Vehicle updated successfully!");
            } else {
                await vehicleService.addVehicle(currentVehicle);
                alert("Vehicle added successfully!");
            }
            handleClose();
            fetchVehicles();
        } catch (error) {
            console.error("Error saving vehicle", error);
            alert("Error saving vehicle: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await vehicleService.deleteVehicle(id);
                fetchVehicles();
            } catch (error) {
                console.error("Error deleting vehicle", error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Vehicle Inventory Management
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen()}
                >
                    Add Vehicle
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Price/Day</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Registration</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id} hover>
                                <TableCell>{vehicle.id}</TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">{vehicle.brand} {vehicle.model}</Typography>
                                    <Typography variant="caption" color="textSecondary">{vehicle.fuelType}</Typography>
                                </TableCell>
                                <TableCell>{vehicle.type}</TableCell>
                                <TableCell>₹{vehicle.pricePerDay}</TableCell>
                                <TableCell>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            px: 1, py: 0.5, borderRadius: 1, 
                                            bgcolor: vehicle.availabilityStatus === 'AVAILABLE' ? '#e8f5e9' : '#fff3e0',
                                            color: vehicle.availabilityStatus === 'AVAILABLE' ? '#2e7d32' : '#ed6c02',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {vehicle.availabilityStatus}
                                    </Typography>
                                </TableCell>
                                <TableCell>{vehicle.registrationNumber}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpen(vehicle)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(vehicle.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{editMode ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Brand" name="brand" value={currentVehicle.brand} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Model" name="model" value={currentVehicle.model} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField select fullWidth label="Type" name="type" value={currentVehicle.type} onChange={handleChange} margin="dense">
                                <MenuItem value="CAR">Car</MenuItem>
                                <MenuItem value="BIKE">Bike</MenuItem>
                                <MenuItem value="VAN">Van</MenuItem>
                                <MenuItem value="TRUCK">Truck</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Fuel Type" name="fuelType" value={currentVehicle.fuelType} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth type="number" label="Seating Capacity" name="seatingCapacity" value={currentVehicle.seatingCapacity} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth type="number" label="Price Per Day" name="pricePerDay" value={currentVehicle.pricePerDay} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Status" name="availabilityStatus" value={currentVehicle.availabilityStatus} onChange={handleChange} margin="dense">
                                <MenuItem value="AVAILABLE">Available</MenuItem>
                                <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                                <MenuItem value="RENTED">Rented</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Image URL" name="imageUrl" value={currentVehicle.imageUrl} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Registration Number" name="registrationNumber" value={currentVehicle.registrationNumber} onChange={handleChange} margin="dense" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Insurance Status" name="insuranceStatus" value={currentVehicle.insuranceStatus} onChange={handleChange} margin="dense">
                                <MenuItem value="ACTIVE">Active</MenuItem>
                                <MenuItem value="EXPIRED">Expired</MenuItem>
                                <MenuItem value="PENDING">Pending</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={3} label="Description" name="description" value={currentVehicle.description} onChange={handleChange} margin="dense" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {editMode ? "Update Vehicle" : "Add Vehicle"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default VehicleManagement;
