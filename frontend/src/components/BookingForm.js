import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

export default function BookingForm({ userId, vehicleId, onBookingCreated }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const vehiclePricePerDay = 100; 

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = e.getTime() - s.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
  };

  const handleBook = async () => {
    if (!startDate || !endDate) {
      alert("Please select dates");
      return;
    }
    const days = calculateDays();
    if (days <= 0) {
      alert("End date must be after start date");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/bookings/add', {
        userId,
        vehicleId,
        startDate,
        endDate
      });
      const totalCost = days * vehiclePricePerDay;
      onBookingCreated(response.data.bookingId, totalCost);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color="#212121">
        Select Rental Period
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
              Start Date
            </Typography>
            <TextField
              required
              id="startDate"
              name="startDate"
              type="date"
              fullWidth
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                   padding: '12.5px 14px',
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
              End Date
            </Typography>
            <TextField
              required
              id="endDate"
              name="endDate"
              type="date"
              fullWidth
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                   padding: '12.5px 14px',
                }
              }}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: '#f5f5f5', 
            borderRadius: 2, 
            border: '1px solid #e0e0e0', 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1
          }}>
            <Typography variant="subtitle1" fontWeight="600">
              Total Duration: {calculateDays()} day(s)
            </Typography>
            <Typography variant="h6" color="#1976d2" fontWeight="800">
              Total: ${calculateDays() * vehiclePricePerDay}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleBook}
            disabled={loading}
            sx={{ 
              mt: 2, 
              borderRadius: '25px', 
              textTransform: 'none',
              fontWeight: 'bold',
              height: '50px'
            }}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
