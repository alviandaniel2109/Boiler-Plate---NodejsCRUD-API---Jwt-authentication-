import express from 'express';
import adminCmsRoutes from './admin-cms/index.route';
import appRoutes from './app/index.route';
import memberCmsRoutes from './member-cms/index.route';

const router = express.Router();

// mount admin-cms routes at /admin-cms
router.use('/admin-cms', adminCmsRoutes);

// mount app routes at /app
router.use('/app', appRoutes);

// mount member-cms routes at /member-cms
router.use('/member-cms', memberCmsRoutes);

export default router;
