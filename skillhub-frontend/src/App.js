import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to SkillHub</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register/>}/>
        {/* Add Register, Dashboard, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
