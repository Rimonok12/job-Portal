import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['jobseeker', 'employer', 'admin'],
      default: 'jobseeker',
    },

    skills: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      default: '',
    },

    resumeUrl: {
      type: String,
      default: '',
    },

    isApproved: {
      type: Boolean,
      default: false, // employer must be approved by admin
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
