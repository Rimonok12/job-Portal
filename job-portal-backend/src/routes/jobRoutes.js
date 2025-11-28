import express from 'express';
import Job from '../models/Job.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// -------------------------------------------
// CREATE JOB (Employer Only)
// -------------------------------------------
router.post(
  '/create',
  authMiddleware,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      const { title, company, location, jobType, salaryRange, description } =
        req.body;

      const job = await Job.create({
        title,
        company,
        location,
        jobType,
        salaryRange,
        description,
        employer: req.user._id,
      });

      res.json({ message: 'Job created successfully', job });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// -------------------------------------------
// UPDATE JOB (Employer Only)
// -------------------------------------------
router.put(
  '/update/:jobId',
  authMiddleware,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      const job = await Job.findOne({
        _id: req.params.jobId,
        employer: req.user._id, // employer can edit only their jobs
      });

      if (!job)
        return res.status(404).json({ message: 'Job not found or not yours' });

      Object.assign(job, req.body);
      await job.save();

      res.json({ message: 'Job updated', job });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// -------------------------------------------
// DELETE JOB (Employer Only)
// -------------------------------------------
router.delete(
  '/delete/:jobId',
  authMiddleware,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      const job = await Job.findOneAndDelete({
        _id: req.params.jobId,
        employer: req.user._id,
      });

      if (!job)
        return res.status(404).json({ message: 'Job not found or not yours' });

      res.json({ message: 'Job deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// -------------------------------------------
// PUBLIC — GET ALL JOBS
// -------------------------------------------
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// router.get('/', async (req, res) => {
//   const jobs = await Job.find();
//   res.json(jobs);
// });

export default router;
