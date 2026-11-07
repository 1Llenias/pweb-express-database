import { Router } from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);       // id dikirim lewat body
router.put('/:id', updateProduct);    // id dikirim lewat URL
router.delete('/:id', deleteProduct);

export default router;