import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Static routes
router.get('/', getProducts);
router.get('/myproducts', protect, getMyProducts);
router.post('/', protect, createProduct);

// Dynamic routes (MUST BE AT THE END)
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;