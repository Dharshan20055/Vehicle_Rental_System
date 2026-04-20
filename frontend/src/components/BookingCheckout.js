import React, { useState } from 'react';
import { Container, Paper, Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


const steps = ['Select Dates & Book', 'Payment Details'];

export default function BookingCheckout() {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [amount, setAmount] = useState(0);
  
  const userId = 1; 
  const { vehicleId } = useParams();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBookingCreated = async (createdBookingId, totalAmount) => {
    setBookingId(createdBookingId);
    setAmount(totalAmount);
    
    try {
      // Initialize internal payment intent (simulated)
      await axios.post('http://localhost:8080/api/payments/create-intent', {
        bookingId: createdBookingId,
        method: 'STRIPE',
        amount: totalAmount
      });
      handleNext();
    } catch (error) {
      console.error("Error creating payment intent", error);
      alert("Failed to initialize payment.");
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4, pt: 12 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: 'none' }}>
        <Typography component="h1" variant="h4" align="center" color="#1976d2" fontWeight="800" sx={{ mb: 2 }}>
          Reserve Vehicle
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>

              <Typography variant="h4" gutterBottom color="#4caf50" fontWeight="bold">
                Booking Completed!
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Your booking ID is <strong>#{bookingId}</strong>.
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                We've processed your payment of ${amount}. An invoice has been generated in the system.
              </Typography>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Typography color="primary" fontWeight="bold">Go to Dashboard →</Typography>
              </Link>
            </Box>
          ) : (
            <React.Fragment>
              {activeStep === 0 && <BookingForm userId={userId} vehicleId={vehicleId || 1} onBookingCreated={handleBookingCreated} />}
              {activeStep === 1 && (
                <PaymentForm bookingId={bookingId} onPaymentSuccess={handleNext} />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}
