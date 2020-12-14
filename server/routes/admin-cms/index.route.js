import express from 'express';
import adminRoutes from './admin.route';
import authRoutes from './auth.route';
import modelRoutes from './model.route';
import roleRoutes from './role.route';
import productRoutes from './product.route';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/model', modelRoutes);
router.use('/role', roleRoutes);
router.use('/product', productRoutes);

export default router;
