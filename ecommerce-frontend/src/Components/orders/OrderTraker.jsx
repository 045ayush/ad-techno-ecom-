import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const steps = [
  'Placed',
  'Shipped',
  'Delivered'
];

export default function OrderTraker({ activeStep, orderId }) {

  const handleProceedToPayment = () => {
    window.location.href = `/checkout?step=3&order_id=${orderId}`;
  };

  if (activeStep === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'row', sm: 'row' }, 
          alignItems: 'center', 
          justifyContent: { xs: 'space-around', sm: 'flex-start' }, 
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography 
          sx={{ 
            marginX: { xs: 1, sm: '10px' }, 
            color: '#ff3d00',
            marginBottom: { xs: 0, sm: 0 },
          }}
        >
          Your payment is pending
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            marginX: { xs: 1, sm: '30px' }, 
            marginTop: { xs: 0, sm: 0 },

          }}
          color="primary" 
          onClick={handleProceedToPayment}
        >
          Pay Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel 
              sx={{ 
                color: '#9155FD', 
                fontSize: { xs: '14px', sm: '16px', md: '18px' } 
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
