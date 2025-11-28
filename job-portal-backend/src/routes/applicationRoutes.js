import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// -------------------------------------------
// APPLY TO JOB (Jobseeker Only)
// -------------------------------------------
router.post(
  '/apply/:jobId',
  authMiddleware,
  authorizeRoles('jobseeker'),
  async (req, res) => {
    try {
      const jobId = req.params.jobId;

      // check job exists
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: 'Job not found' });

      // prevent duplicate apply
      const existing = await Application.findOne({
        job: jobId,
        applicant: req.user._id,
      });

      if (existing)
        return res.status(400).json({ message: 'Already applied to this job' });

      const application = await Application.create({
        job: jobId,
        applicant: req.user._id,
      });

      res.json({
        message: 'Applied successfully',
        application,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// VIEW APPLIED JOBS (Jobseeker Only)
// -------------------------------------------
router.get(
  '/my-applications',
  authMiddleware,
  authorizeRoles('jobseeker'),
  async (req, res) => {
    try {
      const applications = await Application.find({
        applicant: req.user._id,
      }).populate('job');

      res.json(applications);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// -------------------------------------------
// EMPLOYER: VIEW JOB APPLICANTS
// -------------------------------------------
router.get(
  '/applicants/:jobId',
  authMiddleware,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      const job = await Job.findOne({
        _id: req.params.jobId,
        employer: req.user._id,
      });

      if (!job) return res.status(404).json({ message: 'Job not found' });

      const applicants = await Application.find({
        job: req.params.jobId,
      }).populate('applicant', 'name email skills resumeUrl');

      res.json(applicants);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);
router.get(
  '/:jobId/applicants',
  authMiddleware,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      const applications = await Application.find({
        job: req.params.jobId,
      }).populate('applicant', 'name email skills resumeUrl');

      res.json(applications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
