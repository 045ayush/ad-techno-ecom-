import React, { useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import VariantForm from './VariantForm';
import api from '../../../config/api';
import {Alert} from '@mui/material'

function AddProduct() {
  const [productId, setProductId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleProductSubmit = async (productData) => {
    try {
      const response = await api.post('/api/admin/products', productData);
      if (response.data.id) {
        setProductId(response.data.id); // Set the productId for the variant form
        setSuccessMessage(`Product with Id: ${response.data.id} has been added successfully!`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleVariantSubmit = async (variantData) => {
    try {
      const response = await api.post('/api/admin/variants', variantData);
      console.log('Variant added:', response.data);
    } catch (error) {
      console.error('Error adding variant:', error);
    }
  };

  return (
    <div className='mx-10 my-10'>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {!productId?<ProductForm onProductSubmit={handleProductSubmit} />:
      <div>
        <VariantForm productId={productId} onVariantSubmit={handleVariantSubmit} />
      </div>
      }
    </div>
  );
}

export default AddProduct;
