import express, { Application} from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

export default app;