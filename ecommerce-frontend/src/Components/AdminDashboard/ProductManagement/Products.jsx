import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/admin/products',{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setEditingProduct(null);  // Close edit form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/product/${id}`,{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div>
      <AddProduct onProductCreated={handleProductCreated} />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            {editingProduct && editingProduct.id === product.id && (
              <UpdateProduct product={editingProduct} onProductUpdated={handleProductUpdated} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
