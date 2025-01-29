import { Button, Navbar } from "flowbite-react";

const ProductsNavbar = () => {    
  return (
    <div className="fixed top-0 left-0 w-full z-10">
    <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Product Manager</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Log Out</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>Home</Navbar.Link>
        <Navbar.Link href="/productForm">Create</Navbar.Link>
        <Navbar.Link href="/products">Get</Navbar.Link>
        <Navbar.Link href="/productCard">Update</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default ProductsNavbar;