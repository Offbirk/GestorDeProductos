import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProductForm from './components/ProductForm';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import Products from './components/Products';
import ProtectedRoute from './context/ProtectedRoute';
import ProductCard from './components/ProductCard';
import FooterTemplate from './footer/Footer';
import Home from './components/Home';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} /> {/* Ruta comodín para redirigir a auth/login */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
            <Route path='/products' element={<ProtectedRoute element={<Products />} />} />
            <Route path='/productsForm' element={<ProtectedRoute element={<ProductForm onSave={() => {}} isEditMode={false}/>}/>} />
            <Route path='/productCard' element={<ProtectedRoute element={<ProductCard />}/>} />
          </Routes>
          <FooterTemplate />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}


export default App
