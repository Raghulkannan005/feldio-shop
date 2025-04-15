import express from 'express';
import { register, login, addAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/admin/create', addAdmin);

export default router;