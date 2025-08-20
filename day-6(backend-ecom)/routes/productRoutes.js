import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import * as pc from '../controllers/productController.js';
import { productSchema } from '../validators/productValidator.js';
import validator from '../utils/validator.js';

const router = express.Router();

router.route('/')
  .get(pc.getProducts)
  .post(protect, admin, validator(productSchema), pc.createProduct);

router.route('/:id')
  .get(pc.getProductById)
  .put(protect, admin, validator(productSchema), pc.updateProduct)
  .delete(protect, admin, pc.deleteProduct);

export default router;
