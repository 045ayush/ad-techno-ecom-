import React, { useState } from 'react';
import axios from 'axios';

const SearchProducts = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/search/products?name=${query}`,{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to search products', error);
    }
  };

  return (
    <div>
      <h3>Search Products</h3>
      <input
        type="text"
        placeholder="Enter product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;
