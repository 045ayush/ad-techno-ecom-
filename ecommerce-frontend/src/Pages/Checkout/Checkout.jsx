import * as React from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import AddDeliveryAddressForm from "./AddAddress";
import OrderSummary from "./OrderSummary";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = queryParams.get('step');
  const navigate = useNavigate();

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step - 1}`);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePayment = () => {
    console.log("handle payment");
  };

  return (
    <Box className="py-10 px-5 lg:px-32" sx={{ width: "100%" }}>
      <Stepper activeStep={step}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};          
          return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )})}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step == 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>

          <div className="my-5">
            {step == 2 ? (
              <AddDeliveryAddressForm handleNext={handleNext} />
            ) : (
              <OrderSummary />
            )}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
