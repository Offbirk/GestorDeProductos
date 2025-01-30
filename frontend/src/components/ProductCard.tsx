import { Card } from "flowbite-react";
import ProductsNavbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import image from "../assets/defaultImage.jpg";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiClient.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching data: ", error))
  }, []);

  return (
    <>
      <ProductsNavbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-10">
      {products.map((product: any) => (
        <Card
          className="max-w-sm"
          imgAlt="Default image can be exchange according to requeriments"
          imgSrc={image}
          key={product._id}
        >
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </a>
          <div className="mb-5 mt-2.5 flex items-center">
            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
              {product.description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
            <a
              href="#"
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Add to cart
            </a>
          </div>
        </Card>
      ))}
      </div>
    </>
  );
}

export default ProductCard;