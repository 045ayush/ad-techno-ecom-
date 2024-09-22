  import {
    Box,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { deepPurple } from "@mui/material/colors";
  import AddressCard from "../Address/AdreessCard";
  import OrderTraker from "./OrderTraker";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { fetchOrderById } from "../../Redux/Customers/Order/Action";

  const OrderDetails = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { order, loading } = useSelector((store) => store.order);

    useEffect(() => {
      dispatch(fetchOrderById(orderId));
    }, [dispatch, orderId]);

    const navigate = useNavigate();

    const handleRequest = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Box px={2} lg={36} pt={10}>
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

          <Grid container justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: 2}} className="">
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

          <Grid container mt={3}>
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
                  marginTop:2
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

  export default OrderDetails;
