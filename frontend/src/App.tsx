import './App.css'
import FooterTemplate from './components/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider} from './components/context/AuthContext';
import ProductForm from './components/ProductForm';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import Products from './components/Products';
import ProtectedRoute from './components/context/ProtectedRoute';
import { ProductCard } from './components/ProductCard';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/productsForm' element={<ProtectedRoute element={<ProductForm onSave={() => {}} isEditMode={false}/>}/>} />
            <Route path='/productCard' element={<ProtectedRoute element={<ProductCard />}/>} />
            <Route path="*" element={<Login />} /> {/* Ruta comodín para redirigir a auth/login */}
            <Route path='/products' element={<ProtectedRoute element={<Products />} />} /> {/* Cambiar a ProductForm */}
            {/* Other routes */}
          </Routes>
          <FooterTemplate />
        </Router>
      </AuthProvider>
    </>
  );
}


export default App
