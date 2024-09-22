import React from 'react';
import Products from './ProductManagement/Products';
import Orders from './OrderManagement/Orders';
import Dashboard from './AnalyticDashboard/Dashboard';
import ProductPerformance from './AnalyticDashboard/ProductPerformance';
import UserManagement from './UserManagement/UserManagement';
import SearchProducts from './Search&Filter/SearchProducts';
import SearchUsers from './Search&Filter/SearchUsers';
import FilterOrders from './Search&Filter/FilterOrders';


const AdminDashboard = () => {
  return (
    <div>
      <div>
        <Dashboard></Dashboard>
      </div>
      <div>
        <ProductPerformance></ProductPerformance>
      </div>
      <div>
        <SearchProducts></SearchProducts>
      </div>
      <div>
        <SearchUsers></SearchUsers>
      </div>
      <div>
        <FilterOrders></FilterOrders>
      </div>
      <div>
        <h2>Manage Users</h2>
        <UserManagement></UserManagement>
      </div>
      <div>
        <h2>Manage Products</h2>
        <Products></Products>
      </div>
      <div>
        <h2>Manage Orders</h2>
        <Orders></Orders>
      </div>
    </div>
  );
};

export default AdminDashboard;
