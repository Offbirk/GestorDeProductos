import { useEffect, useState } from "react";
import ProductsNavbar from "./navbar/Navbar";
import apiClient from "../api/apiClient";
import { Button, Drawer, Modal, Table } from "flowbite-react";
import ProductForm from "./ProductForm";
import AlertCustom from "./alert/AlertCustom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}

const Products = () => {    
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(true);
  const [alert, setAlert] = useState<{ message: string; 
    type: "success" | "failure" | null}>({message: "", type: null});

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    apiClient.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleSaveChanges = async (updatedProduct: Product) => {
      try {
        await apiClient.put(`/api/products/${updatedProduct._id}`, updatedProduct);
        setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        setOpenModal(true);
        setAlert({ message: "Changes saved successfully", type: "success" });
        handleClose();
      } catch (error) {
        setOpenModal(true);
        setAlert({ message: "Sorry, an unexpected error occurred", type: "failure"});
        console.error("Error saving changes:", error);      
      }    
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/api/products/${id}`);
      setOpenModal(true);
      setAlert({ message: "Product deleted successfully", type: "success" });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      setOpenModal(true);
      setAlert({ message: "Sorry, an unexpected error occurred", type: "failure"});
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <ProductsNavbar />
      <div className="container w-full mx-auto px-4 py-8 mt-16">
        <h1 className="font-bold text-2xl mb-2">Product catalog</h1>
        <div className="overflow-x-auto">
          <Table hoverable className="w-full">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Stock</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product: any) => (
                <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.name}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.stock}</Table.Cell>
                  <Table.Cell className="flex items-center space-x-2">
                    <Button outline gradientDuoTone="purpleToBlue" size="xs" 
                    onClick={() => handleEdit(product)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Edit</Button>
                    <Button outline gradientDuoTone="pinkToOrange" size="xs" 
                    onClick={() => handleDelete(product._id)} 
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="EDIT PRODUCT"/>
        {selectedProduct && <ProductForm product={selectedProduct} onSave={handleSaveChanges}
        isEditMode={true} isSaveDisabled={false}/>}
      </Drawer>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
          <Modal.Body>
            <AlertCustom alert={alert} setAlert={setAlert} />
          </Modal.Body>
      </Modal>
    </div>
  );
}

export default Products;