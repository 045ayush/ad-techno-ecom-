import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPerformance = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductPerformance = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/product-performance',{headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
          }});
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch product performance data', error);
      }
    };
    fetchProductPerformance();
  }, []);

  return (
    <div>
      <h2>Product Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product._sum.quantity}</td>
              <td>${product.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPerformance;
