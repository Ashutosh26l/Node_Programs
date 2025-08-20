import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addOrder, getMyOrders } from '../controllers/orderController.js';
import { orderSchema } from '../validators/orderValidator.js';
import validator from '../utils/validator.js';

const router = express.Router();

router.route('/')
  .post(protect, validator(orderSchema), addOrder)
  .get(protect, getMyOrders);

export default router;
