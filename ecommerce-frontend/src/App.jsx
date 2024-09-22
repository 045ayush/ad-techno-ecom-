import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './CustomerRoutes';
import { Admin } from './Admin/Admin';

function App() {
  return (
    <div className="">
      
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
