import { Box, Grid, Typography, Divider, Chip } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../../Components/Address/AdreessCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "../../Redux/Auth/Action";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user, auth_Loading } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  return (
    <Box px={2} lg={36} pt={10}>
      {!auth_Loading && (
        <Box px={{ xs: 2, md: 20 }} pb={5}>
          {/* User and Order Info */}
          <Grid
            container
            sx={{ boxShadow: 3, borderRadius: 2, mb: 5 }}
            className="px-10 py-5"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight="bold">
                Customer Details
              </Typography>
              <Typography variant="body1">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2">{user?.email}</Typography>
            </Grid>
          </Grid>

          {/* Delivery Address */}
          <Grid
            container
            sx={{ boxShadow: 3, borderRadius: 2, mb: 5 }}
            className="px-10 py-5"
          >
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Saved Address
              </Typography>
            </Grid>
            {user?.addresses?.map((item) => {
              return (
                <Grid item xs={12} sm={6}>
                  <AddressCard address={item} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;
