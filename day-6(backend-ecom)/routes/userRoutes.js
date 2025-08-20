import express from 'express';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import validator from '../utils/validator.js';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', validator(registerSchema), registerUser);
router.post('/login',    validator(loginSchema),    authUser);

export default router;
