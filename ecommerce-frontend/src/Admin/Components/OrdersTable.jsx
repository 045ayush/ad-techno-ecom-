import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderstate, setOrderstate] = useState(true);
  const dispatch = useDispatch();
  const { orders, loading, error ,totalPages} = useSelector((store) => store.adminsOrder);
  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {   
    dispatch(getOrders(formData));
  }, [dispatch,orderstate,formData]);

  // useEffect(()=>{
  //   dispatch(getOrders({jwt}))
  // },[])

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name,value);
    

    setFormData({ ...formData, [name]: value,page:1 });
  };
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
    setFormData({ ...formData, page: value });
  }

  const handleCancelledOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(cancelOrder(orderId));
    setOrderstate(!orderstate);
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderstate(!orderstate);
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderstate(!orderstate);
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderstate(!orderstate);
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
    setOrderstate(!orderstate);
  };

  const handleDetail=(orderId)=>{
    navigate(`/admin/order/${orderId}`)
  }

  return (
    <Box>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
              name="status"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"SHIPPED"}>SHIPPED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
              name="sort"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.sort}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>

                <TableCell>Price</TableCell>
                <TableCell>Id</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>DETAILS</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((item, index) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell sx={{}}>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          alt={item.title}
                          src={orderItem.variant?.images[0]}
                        />
                      ))}
                    </AvatarGroup>{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item?.orderItems.map((order) => (
                          <span className=""> {order.product?.title},</span>
                        ))}
                      </Typography>
                      <Typography variant="caption">
                        {item?.orderItems.map((order) => (
                          <span className="opacity-60">
                            {" "}
                            {order.product?.brand},
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{item?.totalPrice}</TableCell>
                  <TableCell>{item?.id}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center justify-center">
                    <Chip
                      sx={{
                        color: "white !important",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      label={item?.orderStatus}
                      size="small"
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          :item?.orderStatus==="CANCELLED"
                          ?"info"
                          : item?.orderStatus === "DELIVERED"
                          ? "success"
                          : "secondary"
                      }
                      className="text-white"
                    />
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDetail(item.id)}
                      variant="text"
                    >
                      details
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    {/* <Button>{item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED"}</Button> */}
                    
                    <div>
                      <Button
                        id={`basic-button-${item?.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item?.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item?.id, index)}
                          disabled={
                            item.orderStatus === "DELEVERED" ||
                            item.orderStatus === "SHIPPED" ||
                            item.orderStatus === "CONFIRMED"
                          }
                        >
                          CONFIRMED 
                        </MenuItem>
                        <MenuItem
                          disabled={
                            item.orderStatus === "DELIVERED" ||
                            item.orderStatus === "SHIPPED"
                          }
                          onClick={() => handleShippedOrder(item.id, index)}
                        >
                          SHIPPED 
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeliveredOrder(item.id)}
                        >
                          DELIVERED 
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCancelledOrder(item.id)}
                        >
                          CANCELLED 
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDeleteOrder(item.id)}
                      variant="text"
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={totalPages}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;
