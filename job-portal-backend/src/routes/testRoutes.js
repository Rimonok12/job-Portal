import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/private', authMiddleware, (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

router.get(
  '/admin-only',
  authMiddleware,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: 'Admin route accessed!' });
  }
);

router.get(
  '/employer-only',
  authMiddleware,
  authorizeRoles('employer'),
  (req, res) => {
    res.json({ message: 'Employer route accessed!' });
  }
);

export default router;
