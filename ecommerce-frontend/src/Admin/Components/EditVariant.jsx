import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import api from '../../config/api';

const EditVariant = () => {
  const { variantId } = useParams();
  const navigate = useNavigate();
  const [variantData, setVariantData] = useState({
    variantName: '',
    price: 0,
    discountedPrice: 0,
    discountPercentage: 0,
    quantity: 0,
    specifications: {},
  });

  // Fetch variant details on mount
  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const response = await api.get(`/api/admin/variants/id/${variantId}`);
        setVariantData(response.data);
      } catch (error) {
        console.error('Error fetching variant data:', error);
      }
    };
    fetchVariant();
  }, [variantId]);

  // Handle form changes
  const handleChange = (e) => {
    setVariantData({
      ...variantData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle specification changes
  const handleSpecChange = (key, value) => {
    setVariantData((prevData) => ({
      ...prevData,
      specifications: {
        ...prevData.specifications,
        [key]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const keysToKeep = ["variantName", "price", "discountedPrice", "discountPercentage","quantity"];

    try {
        const reducedData=Object.keys(variantData).reduce((newObj, key) => {
            if (keysToKeep.includes(key)) {
              newObj[key] = variantData[key];
            }
            return newObj;
          }, {});
          reducedData.quantity=Number(reducedData.quantity)
        
      await api.put(`/api/admin/variants/${variantId}`, reducedData);
      alert('Variant updated successfully');
      navigate('/admin/variants'); // Redirect to variants page after successful update
    } catch (error) {
      console.error('Error updating variant:', error);
    }
  };

  return (
    <div className='px-5 py-10'>
        <Box>
      <Typography variant="h4" gutterBottom>
        Edit Variant
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Variant Name"
              name="variantName"
              value={variantData?.variantName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={variantData?.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Discounted Price"
              name="discountedPrice"
              type="number"
              value={variantData?.discountedPrice}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={variantData?.discountPercentage}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={variantData?.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </div>
  );
};

export default EditVariant;
