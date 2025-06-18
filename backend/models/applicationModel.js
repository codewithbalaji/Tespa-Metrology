import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  resumeUrl: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})

const applicationModel = mongoose.models.application || mongoose.model('application', applicationSchema)

export default applicationModel
