import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider} from './components/context/AuthContext';
import ProductForm from './components/ProductForm';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import ProtectedRoute from './components/context/ProtectedRoute';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path="*" element={<Login />} /> {/* Ruta comodín para redirigir a auth/login */}
            <Route path='/products' element={<ProtectedRoute element={<ProductForm />} />} />
            {/* Other routes */}
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App
