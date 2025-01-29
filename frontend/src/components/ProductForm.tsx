import { useEffect, useState } from "react";
import { TextInput, Label, Button, Modal } from "flowbite-react";
import apiClient from "../api/apiClient";
import ProductsNavbar from "./navbar/Navbar";
import AlertCustom from "./alert/AlertCustom";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
}

interface ProductFormProps {
    product?: Product;
    onSave: (product: Product) => void;
    isEditMode: boolean;
    isSaveDisabled?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({product, onSave, isEditMode, isSaveDisabled}) => {
    const [values, setValues] = useState<Product>(product || {
        _id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });
    const [openModal, setOpenModal] = useState(true);
    const [alert, setAlert] = useState<{ message: string;
        type: "success" | "failure" | null}>({ message: "", type: null});

    useEffect(() => {
        if(product) {
            setValues(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value,});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(values);
        try {
            await apiClient.post('/api/products', values);
            setOpenModal(true);
            setAlert({message: "Product saved successfully", type: "success"});
        } catch (error) {
            setOpenModal(true);
            setAlert({message: "Sorry, ocurred an unexpected error", type: "failure"});
            console.error("Error response: ", error);
        }
        console.log(values);
    };
    
    return (
        <>
        <ProductsNavbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="font-bold text-2xl">Product Form</h1>            
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Product Name" className="text-orange-500"/>
                    </div>
                    <TextInput name="name" type="text" value={values.name} onChange={handleChange} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" className="text-orange-500"/>
                    </div>
                    <TextInput name="description" type="text" value={values.description} onChange={handleChange} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" className="text-orange-500"/>
                    </div>
                    <TextInput name="price" type="number" min={0} value={values.price} onChange={handleChange} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="category" value="Category" className="text-orange-500"/>
                    </div>
                    <TextInput name="category" type="text" value={values.category} onChange={handleChange} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="stock" value="Stock" className="text-orange-500"/>
                    </div>
                    <TextInput name="stock" type="number" min={0} value={values.stock} onChange={handleChange} required={true} />
                </div>
                <Button type="submit" disabled={isSaveDisabled} 
                gradientDuoTone="greenToBlue">{isEditMode ? 'Save Changes': 'Create Product'}</Button>                
            </form>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <AlertCustom alert={alert} setAlert={setAlert} />
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
};

export default ProductForm;