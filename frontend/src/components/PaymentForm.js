import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress, FormControl, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import axios from 'axios';

export default function PaymentForm({ bookingId, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('STRIPE');

  const handlePay = async () => {
    setLoading(true);
    try {
      // Simulate backend processing
      await axios.post(`http://localhost:8080/api/payments/confirm/${bookingId}`, {
        status: 'SUCCESS',
        method: method
      });
      
      // Delay slightly for visual effect
      setTimeout(() => {
        onPaymentSuccess();
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Server error while confirming payment.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom color="#212121" fontWeight="500">
        Select Payment Method
      </Typography>
      
      <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
            <FormControlLabel 
              value="STRIPE" 
              control={<Radio color="primary" />} 
              label="Stripe (Credit / Debit Card)" 
              sx={{ width: '100%', m: 0, p: 1 }}
            />
          </Paper>
          <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
            <FormControlLabel 
              value="RAZORPAY" 
              control={<Radio color="primary" />} 
              label="Razorpay" 
              sx={{ width: '100%', m: 0, p: 1 }}
            />
          </Paper>
          <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
            <FormControlLabel 
              value="PAYPAL" 
              control={<Radio color="primary" />} 
              label="PayPal" 
              sx={{ width: '100%', m: 0, p: 1 }}
            />
          </Paper>
          <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
            <FormControlLabel 
              value="COD" 
              control={<Radio color="primary" />} 
              label="Cash on Delivery" 
              sx={{ width: '100%', m: 0, p: 1 }}
            />
          </Paper>
        </RadioGroup>
      </FormControl>

      <Button
        onClick={handlePay}
        disabled={loading}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ 
          borderRadius: '25px', 
          height: '50px',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: 2
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : `Pay with ${method}`}
      </Button>
    </Box>
  );
}
