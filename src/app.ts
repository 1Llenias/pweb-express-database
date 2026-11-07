import express from 'express';

import productRouter from './routes/product.routes.js';
import { requestLogger } from './middleware/request-logger.js';

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware untuk mencatat request
app.use(requestLogger);

// Memasang router produk
app.use('/products', productRouter);

export default app;
