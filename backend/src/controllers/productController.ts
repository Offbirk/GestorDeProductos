import { Request, Response } from "express";
import Product from "../models/Product";

//CRUD
export const getAllProducts = async(_req:Request, res: Response):
Promise <void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true},
        );
        if(!updateProduct) {
            res.status(404).json({error: "Product not found"});
        } else {
            res.status(200).json({
                message: "Product updated successfully",
                product: updateProduct,
            });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if(!deletedProduct) {
        res.status(404).json({error: "Product not found"});
      } else {
        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });
      } 
    } catch(error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
}