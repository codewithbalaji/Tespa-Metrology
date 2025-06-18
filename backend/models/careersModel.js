import mongoose from 'mongoose'

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: [{
    type: String,
    required: [true, 'At least one responsibility is required']
  }],
  requirements: [{
    type: String,
    required: [true, 'At least one requirement is required']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const careerModel = mongoose.models.career || mongoose.model('career', careerSchema)

export default careerModel