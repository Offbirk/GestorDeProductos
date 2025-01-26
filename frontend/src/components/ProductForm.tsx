import { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";

const ProductForm = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
    };
    
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1>Product Form</h1>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Product Name" />
                    </div>
                    <TextInput type="text" value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <TextInput type="text" value={values.description} onChange={(e) => setValues({...values, description: e.target.value})} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput type="number" value={values.price} onChange={(e) => setValues({...values, price: e.target.value})} required={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="stock" value="Stock" />
                    </div>
                    <TextInput type="number" value={values.stock} onChange={(e) => setValues({...values, stock: e.target.value})} required={true} />
                </div>
                <Button type="submit" gradientDuoTone="greenToBlue">Save</Button>                
            </form>
        </div>
    );
};

export default ProductForm;