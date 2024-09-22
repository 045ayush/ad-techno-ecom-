import { Box, Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  // Function to determine the status icon and text
  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return { icon: <AdjustIcon sx={{ color: "orange" , marginTop:"1px"}} />, text: "Pending" };
      case "PLACED":
        return { icon: <AdjustIcon sx={{ color: "green" , marginTop:"1px" }} />, text: "Placed" };
      case "SHIPPED":
        return { icon: <LocalShippingIcon sx={{ color: "darkblue"  , marginTop:"1px"}} />, text: "On The Way" };
      case "DELIVERED":
        return { icon: <CheckCircleIcon sx={{ color: "green" , marginTop:"1px" }} />, text: "Delivered" };
      case "CANCELLED":
        return { icon: <CancelIcon sx={{ color: "red" , marginTop:"1px" }} />, text: "Cancelled" };
      default:
        return { icon: <FiberManualRecordIcon />, text: "Unknown Status" };
    }
  };

  const statusInfo = getStatusInfo(order?.orderStatus);

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border">
      <Grid spacing={2} container sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer items-center"
          >
            <img
              className="w-[6rem] h-[6rem] object-contain"
              src={item?.variant?.images[0]}
              alt="image"
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product?.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>{item?.variant?.variantName}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{item?.price}</p>
        </Grid>

        <Grid item xs={4}>
          <p className="space-y-2 font-semibold flex items-center">
            {statusInfo.icon}
            <div className="ml-2 pb-2">{statusInfo.text}</div>
          </p>
          {/* <p className="text-xs">Your Item Has Been Delivered</p> */}
          {false && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
