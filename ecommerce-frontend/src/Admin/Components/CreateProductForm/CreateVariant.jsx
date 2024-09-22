import React, { useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import VariantForm from './VariantForm';
import api from '../../../config/api';
import { useLocation } from 'react-router-dom';

function AddVariant() {
  const location = useLocation();
  const { productId } = location.state || {};

  const handleVariantSubmit = async (variantData) => {
    try {
      const response = await api.post('/api/admin/variants', variantData);
      console.log('Variant added:', response.data);
    } catch (error) {
      console.error('Error adding variant:', error);
    }
  };

  return (
    <div className='mx-10 my-20'>
      <div></div>
      <VariantForm productId={productId} onVariantSubmit={handleVariantSubmit}/>
    </div>
  );
}

export default AddVariant;
