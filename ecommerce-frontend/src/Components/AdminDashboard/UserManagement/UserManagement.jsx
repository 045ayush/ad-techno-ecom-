import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/users',{headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
          }});
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/users/${userId}/role`, { role: newRole },{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`,{headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzg4MTAyMH0.-y4S5xPXG4BH0lKkx0fXaQ6FKmmYvOELSZBJF4KqNr4"
      }});
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUpdateRole(user.id, 'admin')}>Make Admin</button>
                <button onClick={() => handleUpdateRole(user.id, 'user')}>Make User</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
