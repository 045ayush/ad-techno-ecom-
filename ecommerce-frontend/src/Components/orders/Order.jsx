import { Box, Grid, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../Redux/Customers/Order/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Placed", value: "PLACED" },
  { label: "On The Way", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderHistory, loading, error } = useSelector((store) => store.order);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  useEffect(() => {
    dispatch(fetchOrderHistory({ jwt }));
  }, [jwt, dispatch]);

  const handleStatusChange = (event) => {
    const { value, checked } = event.target;
    setSelectedStatuses((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value)
    );
  };

  const filteredOrders = orderHistory?.filter((order) =>
    selectedStatuses.length === 0 || selectedStatuses.includes(order.orderStatus)
  );

  {console.log(filteredOrders,selectedStatuses);
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box className="px-10 py-10">
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              <FormGroup>
                {orderStatus.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        value={option.value}
                        onChange={handleStatusChange}
                        checked={selectedStatuses.includes(option.value)}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5">
            {filteredOrders?.length > 0 ? (
              filteredOrders.map((order) =>
                order?.orderItems?.map((item, index) => (
                  <OrderCard key={index} item={item} order={order} />
                ))
              )
            ) : (
              <p>No orders found for selected filters.</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
