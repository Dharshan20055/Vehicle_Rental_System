import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import axios from 'axios';

export default function BookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const userId = 1; // mocked user id for testing

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`http://localhost:8080/api/bookings/${id}/cancel`);
        fetchBookings();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container sx={{ pt: 10, pb: 4 }}>
      <Typography variant="h4" color="#1976d2" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dates</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No bookings found.</TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell>#{booking.bookingId}</TableCell>
                  <TableCell>Vehicle #{booking.vehicleId}</TableCell>
                  <TableCell>{booking.startDate} to {booking.endDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      color={
                        booking.status === 'CONFIRMED' ? 'success' : 
                        booking.status === 'CANCELLED' ? 'error' : 'warning'
                      } 
                    />
                  </TableCell>
                  <TableCell>
                    {booking.status !== 'CANCELLED' && (
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small" 
                        onClick={() => handleCancel(booking.bookingId)}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
