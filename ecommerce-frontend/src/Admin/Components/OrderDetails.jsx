import {
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../../Components/Address/AdreessCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderById } from "../../Redux/Customers/Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, loading } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  return (
    <Box px={2} lg={36} pt={10}>
      {!loading && (
        <Box px={{ xs: 2, md: 20 }} pb={5}>
          {/* User and Order Info */}
          <Grid container sx={{ boxShadow: 3, borderRadius: 2, mb: 5 }} className="px-10 py-5">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight="bold">Customer Details</Typography>
              <Typography variant="body1">{order?.user?.firstName} {order?.user?.lastName}</Typography>
              <Typography variant="body2">{order?.user?.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight="bold">Order Details</Typography>
              <Typography variant="body2">Order Date & Time: {new Date(order?.orderDate).toLocaleString() }</Typography>
              
              <Typography variant="body2">Order Status: {order?.orderStatus}</Typography>
              <Typography variant="body2">Payment Status: {order?.paymentDetails?.update.status}</Typography>
            </Grid>
          </Grid>

          {/* Delivery Address */}
          <Grid container sx={{ boxShadow: 3, borderRadius: 2, mb: 5 }} className="px-10 py-5">
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">Delivery Address</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddressCard address={order?.shippingAddress} />
            </Grid>
          </Grid>

          {/* Order Items */}
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
                  marginTop: 2,
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

          {/* Order Summary */}
          <Grid container mt={3} sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">Order Summary</Typography>
              <Typography variant="body2">Total Price: ₹{order?.totalPrice}</Typography>
              <Typography variant="body2">Discount: ₹{order?.discount}</Typography>
              <Typography variant="body2">Total Discounted Price: ₹{order?.totalDiscountedPrice}</Typography>
              <Typography variant="body2">Total Items: {order?.totalItem}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetails;
