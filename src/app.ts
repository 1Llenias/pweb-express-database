import express from 'express';

import productRouter from './routes/product.routes.js';
import { requestLogger } from './middleware/request-logger.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware untuk mencatat request
app.use(requestLogger);

// Memasang router produk
app.use('/products', productRouter);

// Error handler (harus paling akhir)
app.use(errorHandler);

export default app;