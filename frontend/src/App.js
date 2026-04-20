import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingCheckout from './components/BookingCheckout';
import BookingDashboard from './components/BookingDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root to book the mocked vehicle id 1 */}
        <Route path="/" element={<Navigate to="/book/1" />} />
        
        {/* Booking & Payment Stepper */}
        <Route path="/book/:vehicleId" element={<BookingCheckout />} />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={<BookingDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
