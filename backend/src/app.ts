import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Handle errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: error.message});
});

export default app;