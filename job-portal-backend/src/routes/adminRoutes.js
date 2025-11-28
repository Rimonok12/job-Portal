import express from 'express';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// -------------------------------------------
// GET Pending Employers (role = employer, isApproved = false)
// -------------------------------------------
router.get(
  '/pending-employers',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const pending = await User.find({
        role: 'employer',
        isApproved: false,
      });

      res.json(pending);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// APPROVE Employer
// -------------------------------------------
router.put(
  '/approve/:userId',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.userId,
        { isApproved: true },
        { new: true }
      );

      res.json({ message: 'Employer approved', user: updated });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// BLOCK User
// -------------------------------------------
router.put(
  '/block/:userId',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.userId,
        { isBlocked: true },
        { new: true }
      );

      res.json({ message: 'User blocked', user: updated });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// UNBLOCK User
// -------------------------------------------
router.put(
  '/unblock/:userId',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.userId,
        { isBlocked: false },
        { new: true }
      );

      res.json({ message: 'User unblocked', user: updated });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// VIEW ALL JOBS
// -------------------------------------------
router.get(
  '/jobs',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const jobs = await Job.find().populate('employer', 'name email');
      res.json(jobs);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// VIEW ALL APPLICATIONS
// -------------------------------------------
router.get(
  '/applications',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const apps = await Application.find()
        .populate('job')
        .populate('applicant', 'name email skills');

      res.json(apps);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);
// -------------------------------------------
// approve employee
// -------------------------------------------
router.get(
  '/employers',
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const employers = await User.find({ role: 'employer' });
      res.json(employers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
