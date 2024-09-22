import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentInformation } from "../../Redux/Customers/Payment/Action";
import { fetchOrderById } from "../../Redux/Customers/Order/Action";
import OrderTraker from "../../Components/orders/OrderTraker";
import AddressCard from "../../Components/Address/AdreessCard";

const PaymentSuccess = () => {
  const [open, setOpen] = useState(false);
  const { orderId } = useParams();
  const { order, loading } = useSelector((store) => store.order);
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, order?.orderStatus]);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePaymentInformation(data));
    }
  }, [dispatch, orderId, paymentId, paymentStatus]);

  const handleRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box px={2} lg={36} pt={10}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Alert variant="filled" severity="success" sx={{ mb: 6, width: "fit-content" }}>
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations! Your order has been placed.
        </Alert>
      </Box>

      {!loading && (
        <Box px={{ xs: 2, md:20 }} pb={5}>
          <Grid container  sx={{ boxShadow: 3, borderRadius: 2, mb: 5 }} className="px-10 py-5">
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Delivery Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddressCard address={order?.shippingAddress} />
            </Grid>
          </Grid>

          <Grid container  sx={{ boxShadow: 3, borderRadius: 2}} className="flex justify-between items-center">
            <Grid item xs={12} md={7} className="p-3 pt-6">
              <OrderTraker
                activeStep={
                  order?.orderStatus === "PLACED"
                    ? 1
                    : order?.orderStatus === "SHIPPED"
                    ? 2
                    : order?.orderStatus === "DELIVERED"
                    ? 3
                    : 0
                }
                orderId={order?.id}
              />
            </Grid>
            <Grid item xs={12} md={2} className="text-center">
              {order?.orderStatus === "DELIVERED" ? (
                <Button color="error" variant="text" onClick={handleRequest}>
                  Return
                </Button>
              ) : (
                <Button sx={{ color: deepPurple[500] }} variant="text" onClick={handleRequest}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container  mt={3}>
            {order?.orderItems.map((item) => (
              <Grid
                container
                item
                key={item.id}
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid>
                  <Box display="flex" alignItems="center">
                    <img
                      className="w-[6rem] h-[6rem] object-contain"
                      src={item?.variant?.images[0]}
                      alt="product"
                    />
                    <Box ml={2}>
                      <Typography variant="body1">{item?.product?.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item?.variant?.variantName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ₹{item?.price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} aria-labelledby="request-dialog-title">
        <DialogTitle id="request-dialog-title">Request Cancellation/Return</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: "16px" }}>
            Dial <a href="tel:9999999999"><strong>9999999999</strong></a> to request cancellation or return.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Our customer service team is available 24/7 to assist you with your request.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentSuccess;
