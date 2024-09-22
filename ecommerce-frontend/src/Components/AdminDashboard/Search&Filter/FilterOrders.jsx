import React, { useState } from 'react';
import axios from 'axios';

const FilterOrders = () => {
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/filter/orders?status=${status}`,{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to filter orders', error);
    }
  };

  return (
    <div>
      <h3>Filter Orders by Status</h3>
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleFilter}>Filter</button>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Status: {order.status}, User: {order.user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterOrders;
