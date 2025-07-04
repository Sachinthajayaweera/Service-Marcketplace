import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddService from './pages/AddService';
import MyServices from './pages/MyServices';
import EditService from './pages/EditService';
import AllServices from './pages/AllServices';
import ServiceDetail from './pages/ServiceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to SkillHub</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="add-service" element={<ProtectedRoute><AddService/></ProtectedRoute>}/>
        <Route path="my-services" element={<ProtectedRoute><MyServices/></ProtectedRoute>}/>
        <Route path="edit-service/:id" element={<ProtectedRoute><EditService/></ProtectedRoute>}/>
        <Route path="/marketplace" element={<AllServices/>}/>
        <Route path="/services/:id" element={<ServiceDetail/>}/>
         <Route path="/dashboard/services" element={<MyServices />} />
        {/* Add Register, Dashboard, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
