import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductsNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logOff = async () => {
    console.log("Out");
    logout();
    navigate('login');
  };

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
        <Link to="#">Home</Link>
        <Link to="/productsForm">Create</Link>
        <Link to="/products">Get</Link>
        <Link to="/productCard">Update</Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default ProductsNavbar;