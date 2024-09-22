import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    userCount:0,
    productCount:0,
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/analytics',{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics data', error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>User Count: {analytics.userCount}</h3>
        <h3>Product Count: {analytics.productCount}</h3>
        <h3>Total Orders: {analytics.totalOrders}</h3>
        <h3>Total Revenue: ${analytics.totalRevenue}</h3>
      </div>
      <div>
        <h3>Orders by Status:</h3>
        <ul>
          {analytics.ordersByStatus.map((status) => (
            <li key={status.status}>
              {status.status}: {status._count.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
