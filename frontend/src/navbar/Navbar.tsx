import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductsNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logOff = async () => {
    console.log("Out");
    logout();
    navigate('login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-full z-10">
    <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Product Manager</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={logOff}>Log Out</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/home" className={isActive('/home') ? 'active' : ''}>Home</Link>
        <Link to="/productsForm" className={isActive('/productsForm') ? 'active' : ''}>Create product</Link>
        <Link to="/products" className={isActive('/products') ? 'active' : ''}>List of products</Link>
        <Link to="/productCard" className={isActive('/productCard') ? 'active' : ''}>Catalog</Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default ProductsNavbar;