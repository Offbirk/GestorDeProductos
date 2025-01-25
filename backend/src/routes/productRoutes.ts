import { Router } from "express";
import { getAllProducts, addProduct, deleteProduct, updateProduct } from "../controllers/productController";

const router = Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;