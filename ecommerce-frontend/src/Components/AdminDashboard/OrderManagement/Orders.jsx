import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/orders',{headers:{
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
        }});
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };
    fetchOrders();
  }, []);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/orders/${orderId}/status`, { status: newStatus },{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/orders/${orderId}`,{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };


  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>User: {order.user.email}</p>
            <button onClick={() => toggleDetails(order.id)}>
              {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedOrderId === order.id && (
              <div>
                <p>Status: {order.status}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <h3>Order Items</h3>
                <ul>
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} - {item.quantity} pcs
                </li>
              ))}
            </ul>
            <button onClick={() => handleUpdateStatus(order.id, 'shipped')}>Mark as Shipped</button>
                <button onClick={() => handleUpdateStatus(order.id, 'completed')}>Mark as Completed</button>
                <button onClick={() => handleDeleteOrder(order.id)}>Delete Order</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
