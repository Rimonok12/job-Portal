// src/routes/authRoutes.js  (or wherever your login route is)
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // if password or compareHash function is different, adjust accordingly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // 🔐 Blocked user
    if (user.isBlocked) {
      return res
        .status(403)
        .json({ message: 'Your account is blocked. Contact support.' });
    }

    // 🔐 Employer not yet approved
    if (user.role === 'employer' && !user.isApproved) {
      return res.status(403).json({
        message: 'Your employer account is pending admin approval.',
      });
    }

    // ✅ admin / jobseeker / approved employer: OK
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error logging in.' });
  }
});

export default router;
