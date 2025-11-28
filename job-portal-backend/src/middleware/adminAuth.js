// middleware/adminAuth.js

export default function adminAuth(req, res, next) {
  try {
    // Check if user exists in request (added by authMiddleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
