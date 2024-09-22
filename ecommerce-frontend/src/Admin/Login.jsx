import * as React from "react";
import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../Redux/Auth/Action";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const jwt=localStorage.getItem("jwt");
  const { user,auth_Loading,auth_error } = useSelector((store) => store.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(jwt){  
      dispatch(getUser(jwt))
    }
  },[jwt])
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userData={
      email: data.get("email"),
      password: data.get("password"),
     
    }
    dispatch(login(userData));
  };

  if(auth_Loading){
    return <p>Loading..</p>
  }
  if (auth_error) return <p>Error: {auth_error}</p>;


  return (
    <React.Fragment>
      <form className="w-full shadow-lg" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{padding:".8rem 0"}}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
