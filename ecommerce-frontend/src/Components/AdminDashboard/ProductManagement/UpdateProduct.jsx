import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product, onProductUpdated }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/admin/product/${product.id}`, { name, description, price: parseFloat(price) }, {headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      onProductUpdated(response.data);  // Update product list on success
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
